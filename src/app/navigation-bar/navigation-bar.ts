import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

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
  username = input<string>('username');
  amountOfItemsInCart = input<number>(0);

  logOut() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }
}
