import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // Add FormsModule for form handling
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  // Inject AuthService and Router using inject function
  private authService = inject(AuthService);
  private router = inject(Router);

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        const decodedToken = this.decodeToken(response.token);
        if (decodedToken.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/passenger-dashboard']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid credentials.';
      }
    );
  }

  decodeToken(token: string) {
    const payload = atob(token.split('.')[1]);
    return JSON.parse(payload);
  }
}
