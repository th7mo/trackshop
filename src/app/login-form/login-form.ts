import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { Router, RouterLink } from '@angular/router';
import { OrDivider } from '../or-divider/or-divider';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, RouterLink, OrDivider],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  username = '';
  password = '';

  customerService = inject(CustomerService);
  router = inject(Router);

  logIn() {
    this.customerService.login(this.username, this.password).subscribe(response => {
      if (this.customerService.isAdmin()) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
