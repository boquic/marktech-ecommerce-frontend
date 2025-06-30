// src/app/components/product-list/product-list.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../services/product-api.service';
import { Product } from '../../models/product.model';
import { Observable, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'; // Importar ActivatedRoute
import { CategoryMenuComponent } from '../category-menu/category-menu.component';
import { CategoryApiService } from '../../services/category-api.service'; // Para obtener nombre de categoría
import { Category } from '../../models/category.model';

// Definir una interfaz para la respuesta paginada del backend
interface PaginatedProductResponse {
  content: Product[];
  totalPages: number;
  totalElements: number;
  number: number; // Número de página actual (0-indexed)
  size: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryMenuComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private productApiService = inject(ProductApiService);
  private categoryApiService = inject(CategoryApiService); // Inyectar
  private router = inject(Router);
  private route = inject(ActivatedRoute); // Inyectar ActivatedRoute

  products$!: Observable<PaginatedProductResponse>; // Ahora es una página
  pageTitle = 'Nuestros Productos'; // Título dinámico

  // Para paginación (ejemplo básico)
  currentPage = 0;
  totalPages = 0;
  pageSize = 10; // Coincide con el defaultValue del backend

  ngOnInit(): void {
    this.products$ = this.route.queryParamMap.pipe(
      switchMap(params => {
        const categoryId = params.get('categoryId');
        this.currentPage = params.get('page') ? +params.get('page')! : 0; // Leer página de queryParams

        if (categoryId) {
          // Obtener nombre de categoría para el título
          this.categoryApiService.getCategoryById(categoryId).subscribe(category => {
            this.pageTitle = `Productos en: ${category.name}`;
          });
          return this.productApiService.getProductsByCategoryId(categoryId, this.currentPage, this.pageSize);
        } else {
          this.pageTitle = 'Todos Nuestros Productos';
          return this.productApiService.getAllProducts(this.currentPage, this.pageSize);
        }
      }),
      tap(response => { // Para actualizar totalPages para la paginación
        if (response) {
            this.totalPages = response.totalPages;
        }
      })
    );
  }

  viewDetails(productId: string): void {
    this.router.navigate(['/products', productId]);
  }
  
  onImageError(event: Event): void {
  const target = event.target as HTMLImageElement;
  target.src = 'assets/images/no-image-available.png'; // Cambia la ruta si tienes un placeholder diferente
 }

  // Métodos para paginación (ejemplo)
  // goToPage(page: number): void {
  //   if (page >= 0 && page < this.totalPages) {
  //     this.currentPage = page;
  //     // Re-navegar con el nuevo parámetro de página
  //     this.router.navigate([], {
  //       relativeTo: this.route,
  //       queryParams: { page: this.currentPage },
  //       queryParamsHandling: 'merge'
  //     });
  //     // ngOnInit se reactivará debido al cambio en queryParamMap
  //   }
  // }
}