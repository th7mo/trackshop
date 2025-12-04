FROM node:24.11.1-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .
RUN npm run build

# ---- RUNTIME STAGE ----
FROM nginxinc/nginx-unprivileged:alpine3.22 AS runner
USER nginx

COPY nginx.conf /etc/nginx/nginx.conf

# Copy Angular build into NGINX
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]
