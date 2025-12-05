import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Admin } from './admin/admin';
import { authGuard } from './auth-guard';
import { adminGuard } from './admin-guard';
import { Cart } from './cart/cart';
import { Register } from './register/register';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login page',
    component: Login,
  },
  {
    path: 'register',
    title: 'Register page',
    component: Register
  },
  {
    path: '',
    title: 'Home page',
    component: Home,
  },
  {
    path: 'admin',
    title: 'Admin page',
    component: Admin,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'cart',
    title: 'Cart',
    component: Cart,
  },
];
