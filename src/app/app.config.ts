import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http'; // Importa withInterceptors
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor'; // Importa tu interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi(), // Para interceptores basados en clase (si los tuvieras)
      withInterceptors([authInterceptor]) // Registra tu interceptor funcional
    )
  ]
};