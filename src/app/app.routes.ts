import { Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión - Marktech'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro - Marktech'
  },
  {
    path: 'products',
    component: ProductListComponent,
    title: 'Productos - Marktech'
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    title: 'Detalle del Producto - Marktech'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Carrito de Compras - Marktech'
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuard],
    title: 'Checkout - Marktech'
  },
  {
    path: 'orders/my-orders',
    component: OrderHistoryComponent,
    canActivate: [authGuard],
    title: 'Mis Pedidos - Marktech'
  },
  {
    path: 'account/profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Mi Perfil - Marktech'
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];