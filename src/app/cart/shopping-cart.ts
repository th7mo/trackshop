import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
  id: number;
  items: ShoppingCartItem[];
}
