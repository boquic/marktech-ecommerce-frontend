// src/app/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service';
import { map, take } from 'rxjs/operators';
import { UserProfile } from '../models/auth.model'; // Importa tu modelo UserProfile

export const adminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  return authService.currentUser$.pipe( // Usamos currentUser$ para acceder a los roles
    take(1),
    map(user => {
      if (user && user.roles && user.roles.includes('ADMIN')) {
        return true; // Usuario es ADMIN, permitir acceso
      } else if (user) {
        // Usuario autenticado pero no es ADMIN, redirigir a una página de "no autorizado" o a la home
        console.warn('AdminGuard: Usuario no es ADMIN, acceso denegado a:', state.url);
        router.navigate(['/products']); // O a una página de "acceso denegado"
        return false;
      } else {
        // Usuario no autenticado, redirigir a login
        console.log('AdminGuard: Usuario no autenticado, redirigiendo a /login para acceder a:', state.url);
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
  );
};