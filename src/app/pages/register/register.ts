import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  model = {
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private router: Router,
    private registerService: RegisterService
  ) {}


  onSubmit(){
    if (!this.passwordMatchValidator(this.model.password, this.model.confirmPassword)) {
      alert('Passwords do not match'); 
      return;
    }

    this.registerService.register(this.model.email, this.model.password, this.model.confirmPassword ).subscribe({
      next: () => {
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Registration failed: ' + (err?.error?.message || err.message || 'Unknown error'));
      }
    });
  }
  private passwordMatchValidator(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }
}
