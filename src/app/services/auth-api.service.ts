// src/app/services/auth-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, UserProfile, RegisterRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = environment.apiUrlUserService; // URL del user-service
  private http = inject(HttpClient);

  // BehaviorSubject para mantener el estado del usuario actual
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(this.getStoredUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  // BehaviorSubject para el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor() { }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
      tap(response => {
        if (response && response.accessToken && response.userProfile) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('currentUser', JSON.stringify(response.userProfile));
          this.currentUserSubject.next(response.userProfile);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }
     register(registerRequest: RegisterRequest): Observable<UserProfile> { // Asumimos que el backend devuelve UserProfile en 201
    return this.http.post<UserProfile>(`${this.apiUrl}/auth/register`, registerRequest);
    
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    // Opcional: llamar a un endpoint de logout en el backend si lo tienes
    // this.http.post(`${this.apiUrl}/auth/logout`, {}).subscribe();
  }

  public get currentUserValue(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  public get accessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getStoredUser(): UserProfile | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // Aquí podrías añadir refreshToken(), registerUser(), etc. más adelante
}