// src/app/components/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { LoginRequest } from '../../models/auth.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  errorMessage: string | null = null;
  isLoading = false;
  showPassword = false;

  form = inject(FormBuilder).nonNullable.group({
    usernameOrEmail: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  get usernameOrEmail() {
    return this.form.get('usernameOrEmail');
  }

  get password() {
    return this.form.get('password');
  }

  get rememberMe() {
    return this.form.get('rememberMe');
  }

  private authService = inject(AuthApiService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onSubmit(): void {
    this.errorMessage = null;
    this.isLoading = true;
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Por favor, corrige los errores antes de continuar.';
      this.isLoading = false;
      return;
    }

    const value = this.form.getRawValue();
    const payload: LoginRequest = {
      usernameOrEmail: value.usernameOrEmail,
      password: value.password
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        this.notificationService.showSuccess('¡Bienvenido! Has iniciado sesión correctamente.');
        
        // Redirigir a returnUrl si existe, sino a una ruta por defecto
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.isLoading = false;
        
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else {
          this.errorMessage = err.error?.message || err.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
        }
        
        this.notificationService.showError(this.errorMessage || 'Error desconocido');
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle(): void {
    this.notificationService.showInfo('Funcionalidad de Google Login próximamente disponible');
  }

  clearError(): void {
    this.errorMessage = null;
  }
}