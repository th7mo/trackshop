import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Customer } from './customer';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private apiUrl = 'https://trackshop.th7mo.com/api';
  private router = inject(Router);

  customerId: WritableSignal<number | null> = signal(null);
  customer: WritableSignal<Customer | undefined> = signal(undefined);

  constructor(private http: HttpClient) {}

  signUp(username: string, password: string): Observable<Customer> {
    const url = `${this.apiUrl}/customers`;
    return this.http.post<Customer>(url, { username, password }).pipe(
      tap(_ => {
        this.login(username, password).subscribe();
      })
    );
  }

  login(username: string, password: string): Observable<string> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(url, { username, password }, { responseType: 'text' })
      .pipe(
        tap(token => {
          localStorage.setItem("jwt", token);
          this.customerId.set(jwtDecode<{ id: number }>(token).id);
          this.getCustomer();
        })
      );
  }

  logOut() {
    localStorage.removeItem("jwt");
    this.customerId.set(null);
    this.customer.set(undefined);
  }

  getCustomer() {
    if (!this.customerId()) {
      if (localStorage.getItem("jwt")) {
        this.setCustomerId();
      } else {
        return;
      }
    }

    const jwt = localStorage.getItem('jwt');
    const headers = {Authorization: `Bearer ${jwt}`};
    const url = `${this.apiUrl}/customers/${this.customerId()}`;

    return this.http.get<Customer>(url, {headers}).subscribe({
      next: customer => this.customer.set(customer),
      error: err => {
        if (err.status === 401) this.logOut();
      }
    });
  }

  setCustomerId() {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const decodedJwt = jwtDecode<{ id: number }>(token);
    this.customerId.set(decodedJwt.id);
  }

  isAdmin(): boolean {
    return this.getRoleFromJwt() === 'ROLE_ADMIN';
  }

  private getRoleFromJwt(): string | null {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return null;
    }

    try {
      const decodedJwt = jwtDecode<{ role: { authority: string }[] }>(jwt);
      return decodedJwt.role?.[0]?.authority ?? null;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("jwt");
  }

  addTrackToCart(trackId: number): Observable<Object> {
    const url = `${this.apiUrl}/customers/${this.customerId()}/cart/items/${trackId}`;
    return this.http.post(url, null, { headers: this.buildHeaders() })
  }

  removeTrackFromCart(trackId: number): Observable<Object> {
    const url = `${this.apiUrl}/customers/${this.customerId()}/cart/items/${trackId}`;
    return this.http.delete(url, { headers: this.buildHeaders() })
  }

  private buildHeaders(): { [key: string]: string } {
    const jwt = localStorage.getItem('jwt');
    return {Authorization: `Bearer ${jwt}`};
  }
}
