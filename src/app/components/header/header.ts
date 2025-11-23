import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthApiService);
  private router = inject(Router);

  isAuthenticated$ = this.authService.isAuthenticated$;

  // Using Signals directly
  totalItems: Signal<number> = this.cartService.totalItems;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/products']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
