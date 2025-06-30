// src/app/services/category-api.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model'; // Necesitarás crear este modelo

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  private apiUrl = environment.apiUrlCategoryService; // URL del category-service
  private http = inject(HttpClient);

  constructor() { }

  // Obtener todas las categorías raíz (parentId no especificado o null)
  getRootCategories(): Observable<Category[]> {
    // Asumiendo que GET /api/v1/categories sin parentId devuelve las raíz
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // Obtener subcategorías de una categoría padre
  getSubcategories(parentId: string): Observable<Category[]> {
    const params = new HttpParams().set('parentId', parentId);
    return this.http.get<Category[]>(`${this.apiUrl}/categories`, { params });
  }

  // Obtener una categoría por su ID (si lo necesitas)
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/categories/${id}`);
  }
}