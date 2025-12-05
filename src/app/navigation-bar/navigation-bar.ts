import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../customer/customer.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.css',
})
export class NavigationBar {
  router = inject(Router);
  customerService = inject(CustomerService);
  customer = this.customerService.customer;

  logIn() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.customerService.logOut();
    this.router.navigate(['/']);
  }

  amountOfItemsInCart = computed(() => {
    const c = this.customer();
    return c?.shoppingCart?.items?.length ?? 0;
  });
}
