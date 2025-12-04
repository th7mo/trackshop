import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CustomerService } from './customer/customer.service';

export const authGuard: CanActivateFn = (route, state) => {
  const customerService = inject(CustomerService);
  const router = inject(Router);

  if (customerService.isLoggedIn()) {
    return true;
  }

  const loginPath = router.parseUrl("/login");
  return new RedirectCommand(loginPath);
};
