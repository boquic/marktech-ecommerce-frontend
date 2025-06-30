// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '../services/auth-api.service'; // Ajusta la ruta a tu servicio
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthApiService);
  const router = inject(Router);

  // Usamos isAuthenticated$ que es un BehaviorSubject y siempre tiene un valor.
  // take(1) es importante para que el Observable se complete después de emitir el primer valor,
  // ya que CanActivateFn espera un Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  // y no un stream continuo.
  return authService.isAuthenticated$.pipe(
    take(1), // Tomar solo el valor actual y completar
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true; // Usuario autenticado, permitir acceso a la ruta
      } else {
        // Usuario no autenticado, redirigir a la página de login
        console.log('AuthGuard: Usuario no autenticado, redirigiendo a /login');
        // Guardar la URL a la que intentaba acceder para redirigirlo después del login (opcional)
        // El objeto 'state' tiene state.url
        router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false; // Bloquear acceso a la ruta
      }
    })
  );
};