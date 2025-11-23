// src/app/components/register/register.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { RegisterRequest } from '../../models/auth.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Puedes crear este archivo para estilos específicos
})
export class RegisterComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;
  
  form = inject(FormBuilder).nonNullable.group({
    firstName: [''],
    lastName: [''],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    acceptTerms: [false, [Validators.requiredTrue]]
  });

  private authService = inject(AuthApiService);
  private notificationService = inject(NotificationService);
  private router = inject(Router);

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get acceptTerms() { return this.form.get('acceptTerms'); }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Por favor, corrige los errores antes de continuar.';
      return;
    }

    this.isLoading = true;
    const value = this.form.getRawValue();
    const payload: RegisterRequest = {
      username: value.username,
      email: value.email,
      password: value.password,
      firstName: value.firstName || undefined,
      lastName: value.lastName || undefined
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Registro exitoso:', response);
        this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        this.notificationService.showSuccess('¡Cuenta creada exitosamente! Ya puedes iniciar sesión.');
        
        // Redirigir al login después de un breve retraso
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
        this.form.reset({ acceptTerms: false });
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en registro:', err);
        
        if (err.status === 409) {
          this.errorMessage = 'El email o nombre de usuario ya está en uso.';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión.';
        } else if (err.error && typeof err.error === 'object' && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.message) {
          this.errorMessage = err.message;
        } else {
          this.errorMessage = 'Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.';
        }
        
        this.notificationService.showError(this.errorMessage || 'Error desconocido');
      }
    });
  }
}