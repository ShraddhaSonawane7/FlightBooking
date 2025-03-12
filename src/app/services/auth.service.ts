// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // This makes the service available globally
})
export class AuthService {
  private apiUrl = 'https://localhost:7132/api/auth/';  // Replace with actual backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, { email, password });
  }

  register(user: any): Observable<any> {  // Updated to accept full user object
    return this.http.post<any>(`${this.apiUrl}register`, user);
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
