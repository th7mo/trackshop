import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { CustomerService } from './customer/customer.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const customerService = inject(CustomerService);
  return customerService.isAdmin();
};

