// src/app/services/cart-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart } from '../models/cart.model';

export interface AddCartItemDto {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDto {
  productId: string;
  quantity: number;
}

export interface RemoveCartItemDto {
  productId: string;
}

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiBaseUrl}${environment.endpoints.cart}`; // http://localhost:8080/api/v1/cart

  // GET /api/v1/cart (cart del usuario autenticado)
  getMyCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}`);
  }

  // POST /api/v1/cart/items
  addItem(dto: AddCartItemDto): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}/items`, dto);
    }

  // PUT /api/v1/cart/items/{productId}
  updateItem(dto: UpdateCartItemDto): Observable<Cart> {
    return this.http.put<Cart>(`${this.baseUrl}/items/${dto.productId}`, { quantity: dto.quantity });
  }

  // DELETE /api/v1/cart/items/{productId}
  removeItem(productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}/items/${productId}`);
  }

  // DELETE /api/v1/cart (vaciar carrito)
  clear(): Observable<Cart> {
    return this.http.delete<Cart>(`${this.baseUrl}`);
  }
}
