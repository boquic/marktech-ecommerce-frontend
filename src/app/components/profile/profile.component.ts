// src/app/components/profile/profile.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '../../services/auth-api.service';
import { UserProfile } from '../../models/auth.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthApiService);
  userProfile$!: Observable<UserProfile | null>;

  ngOnInit(): void {
    this.userProfile$ = this.authService.currentUser$;
  }

  // Podrías añadir métodos para editar perfil, cambiar contraseña, etc. más adelante
}