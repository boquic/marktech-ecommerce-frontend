import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Our Products</h2>
      
      <!-- Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div *ngFor="let product of products()" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <div class="h-48 overflow-hidden bg-gray-200 relative">
            <img [src]="product.imageUrl || 'assets/placeholder.png'" [alt]="product.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300">
          </div>
          <div class="p-4 flex-grow flex flex-col">
            <h3 class="text-lg font-semibold mb-2 truncate" [title]="product.name">{{ product.name }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
            <div class="mt-auto flex items-center justify-between">
              <span class="text-xl font-bold text-blue-600">{{ product.price | currency }}</span>
              <button (click)="addToCart(product)" 
                class="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center gap-2">
                <i class="bi bi-cart-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination / Load More -->
      <div class="mt-8 text-center" *ngIf="hasMore()">
        <button (click)="loadMore()" [disabled]="isLoading()"
          class="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 disabled:opacity-50">
          {{ isLoading() ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductApiService);
  cartService = inject(CartService);
  toast = inject(HotToastService);

  products = signal<Product[]>([]);
  currentPage = signal(0);
  pageSize = 10;
  isLoading = signal(false);
  hasMore = signal(true);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.productService.getProducts(this.currentPage(), this.pageSize).subscribe({
      next: (response) => {
        this.products.update(current => [...current, ...response.content]);
        this.hasMore.set(!response.last);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.error('Failed to load products');
        this.isLoading.set(false);
      }
    });
  }

  loadMore() {
    this.currentPage.update(p => p + 1);
    this.loadProducts();
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product, 1).subscribe(() => {
      this.toast.success('Added to cart');
    });
  }
}