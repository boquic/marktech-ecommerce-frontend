import { Routes } from '@angular/router';

// Importa tus componentes. Asegúrate de que las rutas sean correctas.
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component'; 
// import { CartComponent } from './components/cart/cart.component';             // Descomenta cuando lo crees
import { ProfileComponent } from './components/profile/profile.component';
// import { CategoryPageComponent } from './components/category-page/category-page.component'; // Para /categories/:categoryName
// import { SearchResultsComponent } from './components/search-results/search-results.component'; // Para /search-results
// import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'; // Para rutas no encontradas

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar Sesión - Marktech' // Título para el navegador
  },
  {
    path: 'products',
    component: ProductListComponent,
    title: 'Productos - Marktech'
  },
  {
    path: 'products/:id', // Ruta para el detalle de un producto específico
    component: ProductDetailComponent,
    title: 'Detalle del Producto - Marktech' // Podrías hacerlo dinámico con un Route Resolver
  },
  {
    path:'register',
    component: RegisterComponent,
    title: 'Registro - Marktech' // Cambia esto al componente que quieras mostrar
  },
 // {
  //   path: 'categories/:categoryName', // Ruta para mostrar productos de una categoría específica
  //   component: CategoryPageComponent, // Necesitarías un CategoryPageComponent
  //   title: 'Categoría - Marktech'  // Podrías hacerlo dinámico
  // },

  {
    path: 'account/profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Mi Perfil - Marktech'
  },
  // {
  //   path: 'cart',
  //   component: CartComponent,
  //   // canActivate: [AuthGuard], // Usualmente el carrito requiere estar logueado o se maneja en sesión
  //   title: 'Carrito de Compras - Marktech'
  // },

  // Ruta de Búsqueda
  // {
  //   path: 'search-results',
  //   component: SearchResultsComponent,
  //   title: 'Resultados de Búsqueda - Marktech'
  // },


  // Ruta por Defecto (Redirección a la lista de productos)
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full' // Importante para que solo coincida con la ruta vacía exacta
  },

  // Ruta Wildcard para Página No Encontrada (404) - ¡Debe ser la última ruta!
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  //   title: 'Página no Encontrada - Marktech'
  // }
];