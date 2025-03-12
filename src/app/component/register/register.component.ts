// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // Add FormsModule here for form handling
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  phoneNumber = '';
  errorMessage = '';

  // Use inject() to inject Router and AuthService
  private authService = inject(AuthService);
  private router = inject(Router);

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const user = {
      fullName: this.fullName,
      email: this.email,
      passwordHash: this.password,
      phoneNumber: this.phoneNumber,
      role: 'Passenger'  // Default role is 'Passenger'
    };

    this.authService.register(user).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMessage = 'Registration failed.';
      }
    );
  }
}
