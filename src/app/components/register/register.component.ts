// src/app/components/register/register.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // FormsModule para ngModel
import { Router, RouterLink } from '@angular/router';    // RouterLink para el enlace a login
import { AuthApiService } from '../../services/auth-api.service';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // Añadir FormsModule y RouterLink
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'] // Puedes crear este archivo para estilos específicos
})
export class RegisterComponent {
  registerData: RegisterRequest = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading = false;

  private authService = inject(AuthApiService);
  private router = inject(Router);

  onSubmit(registerForm: NgForm): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (registerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos requeridos correctamente.';
      // Marcar todos los campos como tocados para mostrar errores de validación individuales si los tienes
      Object.values(registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Registro exitoso:', response);
        this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        // Opcional: redirigir al login después de un breve retraso o mostrar un botón para ir al login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); // Redirigir después de 3 segundos
        registerForm.resetForm(); // Limpiar el formulario
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error en registro:', err);
        if (err.error && typeof err.error === 'object' && err.error.message) {
             this.errorMessage = err.error.message; // Mensaje de error específico del backend
        } else if (err.message) {
            this.errorMessage = err.message;
        } else {
            this.errorMessage = 'Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.';
        }
      }
    });
  }
}