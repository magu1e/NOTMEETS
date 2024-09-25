import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Permite acceso si está autenticado
  } else {
    // Redirigir a login si no está autenticado
    router.navigate(['']);
    return false; // Denegar acceso
  }
};
