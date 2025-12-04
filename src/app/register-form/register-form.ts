import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { Router, RouterLink } from '@angular/router';
import { OrDivider } from '../or-divider/or-divider';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    OrDivider
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  username = '';
  password = '';

  customerService = inject(CustomerService);
  router = inject(Router);

  register() {
    this.customerService.signUp(this.username, this.password);
    this.router.navigate(['/']);
  }
}
