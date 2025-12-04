import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../customer/customer.service';
import { Router } from '@angular/router';
import { RegisterForm } from '../register-form/register-form';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RegisterForm
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

}
