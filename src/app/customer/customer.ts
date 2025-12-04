import { ShoppingCart } from '../cart/shopping-cart';

export interface Customer {
  id: number;
  username: string;
  password: string;
  shoppingCart: ShoppingCart;
}
