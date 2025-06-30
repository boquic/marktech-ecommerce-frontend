// src/app/components/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { ActivatedRoute, Router } from '@angular/router';
import { AuthApiService } from '../../services/auth-api.service';
import { LoginRequest } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // Añadir FormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginData: LoginRequest = { usernameOrEmail: '', password: '' };
  errorMessage: string | null = null;

  private authService = inject(AuthApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onSubmit(): void {
    this.errorMessage = null;
    if (!this.loginData.usernameOrEmail || !this.loginData.password) {
      this.errorMessage = 'Por favor, ingresa usuario y contraseña.';
      return;
    }
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        // Redirigir a returnUrl si existe, sino a una ruta por defecto
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
        this.router.navigateByUrl(returnUrl); // Usar navigateByUrl para URLs completas
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.errorMessage = err.error?.message || err.message || 'Credenciales incorrectas o error en el servidor.';
        if (err.status === 401) {
             this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      }
    });
  }
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  

}