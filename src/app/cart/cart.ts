import {
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { CustomerService } from '../customer/customer.service';
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
export class Cart implements OnInit {

  customerService = inject(CustomerService);
  customer = this.customerService.customer;

  ngOnInit() {
    this.updateCart();
  }

  updateCart() {
    this.customerService.getCustomer();
  }

  isEmptyCart = computed(() => {
    const cart = this.customer()?.shoppingCart;
    return !cart || cart.items.length === 0;
  });
}
