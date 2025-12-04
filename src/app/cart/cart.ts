import { Component, inject, input, OnInit, signal, WritableSignal } from '@angular/core';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { CustomerService } from '../customer/customer.service';
import { Customer } from '../customer/customer';
import { ShoppingCartTrack } from '../shopping-cart-track/shopping-cart-track';

@Component({
  selector: 'app-cart',
  imports: [
    NavigationBar,
    ShoppingCartTrack
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  customerService = inject(CustomerService);
  customer: WritableSignal<Customer> = signal({} as Customer);

  constructor(
  ) {
    this.customerService.getCustomer().subscribe(customer => this.customer.set(customer));
  }

  updateCart() {
    this.customerService.getCustomer().subscribe(customer => this.customer.set(customer));
  }
}
