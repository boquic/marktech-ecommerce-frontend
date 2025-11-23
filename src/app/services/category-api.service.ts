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
  private baseUrl = `${environment.apiBaseUrl}${environment.endpoints.categories}`; // API Gateway -> /api/categories
  private http = inject(HttpClient);

  constructor() { }

  // Obtener todas las categorías raíz (parentId no especificado o null)
  getRootCategories(): Observable<Category[]> {
    // GET /api/categories
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }

  // Obtener subcategorías de una categoría padre
  getSubcategories(parentId: string): Observable<Category[]> {
    const params = new HttpParams().set('parentId', parentId);
    return this.http.get<Category[]>(`${this.baseUrl}`, { params });
  }

  // Obtener una categoría por su ID (si lo necesitas)
  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }
}