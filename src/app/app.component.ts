import { Component, OnInit, OnDestroy, inject, HostListener, ElementRef } from '@angular/core'; // Añadido HostListener y ElementRef
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, of, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AuthApiService } from './services/auth-api.service';
import { UserProfile } from './models/auth.model';
// import { CartService } from './services/cart.service'; // Descomenta y ajusta si tienes un CartService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private authService = inject(AuthApiService);
  private router = inject(Router);
  private elementRef = inject(ElementRef); // Para el HostListener
  // private cartService = inject(CartService); // Ejemplo

  isAuthenticated$!: Observable<boolean>;
  currentUser$!: Observable<UserProfile | null>;
  cartItemCount$: Observable<number> = of(0); // Placeholder, inicializado con 0

  isMobileMenuOpen = false;
  isUserDropdownOpen = false;
  currentYear: number = new Date().getFullYear();

  private routerSubscription!: Subscription;
  showMainLayout = true;

  // Cierra los menús si se hace clic fuera de ellos
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Cerrar dropdown de usuario
    if (this.isUserDropdownOpen && !this.elementRef.nativeElement.querySelector('.user-account-item')?.contains(event.target as Node)) {
      this.isUserDropdownOpen = false;
    }
    // Cerrar menú móvil (si el clic es fuera del botón que lo abre y fuera del menú mismo)
    // Esta lógica puede ser más compleja si el botón de menú también está dentro del overlay.
    // Por ahora, asumimos que el clic en el overlay lo cierra (manejado en el template del overlay).
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUser$ = this.authService.currentUser$;
    // this.cartItemCount$ = this.cartService.getCartItemCount(); // Ejemplo

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        const noLayoutRoutes = ['/login', '/register']; // Rutas que ocultan el layout principal
        this.showMainLayout = !noLayoutRoutes.some(route => event.urlAfterRedirects.startsWith(route));

        // Cierra menús al navegar
        this.isMobileMenuOpen = false;
        this.isUserDropdownOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isUserDropdownOpen = false; // Cierra el dropdown de usuario si se abre el menú móvil
    }
  }

  toggleUserDropdown(event: MouseEvent): void {
    event.stopPropagation(); // Prevenir que el HostListener de document:click lo cierre inmediatamente
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    if (this.isUserDropdownOpen) {
      this.isMobileMenuOpen = false; // Cierra el menú móvil si se abre el dropdown de usuario
    }
  }

  closeUserDropdown(): void { // Usado por los enlaces dentro del dropdown
    this.isUserDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.isUserDropdownOpen = false;
    this.isMobileMenuOpen = false;
    this.router.navigate(['/login']);
  }

  logoutAndCloseMenu(): void { // Para el menú móvil
    this.logout();
  }

  logoutAndCloseDropdown(): void { // Para el dropdown de usuario
    this.logout();
  }

  openLocationSelector(): void {
    console.log('Funcionalidad para abrir el selector de ubicación no implementada.');
    if (this.isMobileMenuOpen) this.toggleMobileMenu();
    if (this.isUserDropdownOpen) this.closeUserDropdown();
  }

  performSearch(query: string): void {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      console.log('Realizando búsqueda para:', trimmedQuery);
      this.router.navigate(['/search-results'], { queryParams: { q: trimmedQuery } });
      this.isMobileMenuOpen = false;
      this.isUserDropdownOpen = false;
    } else {
      console.log('Término de búsqueda vacío.');
    }
  }
}