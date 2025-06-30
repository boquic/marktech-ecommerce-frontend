// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApiService } from '../services/auth-api.service';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthApiService);
  const token = authService.accessToken;

  // Verifica si la URL de la petición es a una de tus APIs backend
  const isApiUrl = req.url.startsWith(environment.apiUrlProductService) ||
                   req.url.startsWith(environment.apiUrlCategoryService) ||
                   req.url.startsWith(environment.apiUrlInventoryService) ||
                   (req.url.startsWith(environment.apiUrlUserService) && !req.url.includes('/auth/login') && !req.url.includes('/auth/register'));


  if (token && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};