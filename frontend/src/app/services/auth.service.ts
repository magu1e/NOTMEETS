import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router, private apiService: ApiService) {}

  // Guardar el username y rol en localStorage
  setUser(username: string, role: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('role', role);

  }

  // Obtener el usuario
  getUser(): string | null {
    return localStorage.getItem('username');
  }

  // Verificar si el usuario esta logueado
  isAuthenticated(): boolean {
    return !!this.getUser(); // true si hay usuario guardado
  }

  // Logout
  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.router.navigate(['']);
  }

  redirectToLogin(): void {
    this.router.navigate(['/login']); // Redirigir al usuario al login
  }
}
