import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
