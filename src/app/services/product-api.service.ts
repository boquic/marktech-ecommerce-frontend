import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Asegúrate que la ruta sea correcta
import { Product } from '../models/product.model';
import { PaginatedProductResponse } from '../models/paginated-response.model'; // Importar la interfaz paginada

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private apiUrl = environment.apiUrlProductService; // URL base del product-service
  private http = inject(HttpClient);

  constructor() { }

  /**
   * Obtiene todos los productos de forma paginada.
   * @param page Número de página (0-indexed).
   * @param size Número de ítems por página.
   * @param sort Array de strings para ordenamiento, ej: ['name,asc', 'price,desc'] o un solo string 'name,asc'.
   * @returns Observable de la respuesta paginada de productos.
   */
  getAllProducts(page: number = 0, size: number = 10, sort: string[] = ['name,asc']): Observable<PaginatedProductResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Spring Boot espera múltiples parámetros 'sort' si hay múltiples criterios
    sort.forEach(sortCriteria => {
      params = params.append('sort', sortCriteria);
    });

    return this.http.get<PaginatedProductResponse>(`${this.apiUrl}/products`, { params });
  }

  /**
   * Obtiene productos filtrados por categoryId, de forma paginada.
   * @param categoryId El UUID de la categoría.
   * @param page Número de página (0-indexed).
   * @param size Número de ítems por página.
   * @param sort Array de strings para ordenamiento.
   * @returns Observable de la respuesta paginada de productos.
   */
  getProductsByCategoryId(categoryId: string, page: number = 0, size: number = 10, sort: string[] = ['name,asc']): Observable<PaginatedProductResponse> {
    let params = new HttpParams()
      .set('categoryId', categoryId)
      .set('page', page.toString())
      .set('size', size.toString());

    sort.forEach(sortCriteria => {
      params = params.append('sort', sortCriteria);
    });

    return this.http.get<PaginatedProductResponse>(`${this.apiUrl}/products`, { params });
  }

  /**
   * Obtiene un producto específico por su ID.
   * @param id El UUID del producto.
   * @returns Observable del producto.
   */
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  /**
   * (FUTURO - EJEMPLO) Crea un nuevo producto.
   * Requiere autenticación y rol ADMIN. El interceptor Auth se encargará del token.
   * @param productData Los datos del producto a crear (debería ser un DTO específico).
   * @returns Observable del producto creado.
   */
  // createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'isActive'>): Observable<Product> {
  //   return this.http.post<Product>(`${this.apiUrl}/products`, productData);
  // }

  /**
   * (FUTURO - EJEMPLO) Actualiza un producto existente.
   * Requiere autenticación y rol ADMIN.
   * @param id El UUID del producto a actualizar.
   * @param productData Los datos a actualizar (DTO con campos opcionales).
   * @returns Observable del producto actualizado.
   */
  // updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Observable<Product> {
  //   return this.http.put<Product>(`${this.apiUrl}/products/${id}`, productData);
  // }

  /**
   * (FUTURO - EJEMPLO) Elimina (lógicamente) un producto.
   * Requiere autenticación y rol ADMIN.
   * @param id El UUID del producto a eliminar.
   * @returns Observable<void>
   */
  // deleteProduct(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  // }

  /**
   * (FUTURO - EJEMPLO) Busca productos.
   * @param query El término de búsqueda.
   * @param page Número de página.
   * @param size Número de ítems por página.
   * @returns Observable de la respuesta paginada de productos.
   */
  // searchProducts(query: string, page: number = 0, size: number = 10): Observable<PaginatedProductResponse> {
  //   const params = new HttpParams()
  //     .set('q', query) // O el nombre del parámetro que tu backend espere para la búsqueda
  //     .set('page', page.toString())
  //     .set('size', size.toString());
  //   return this.http.get<PaginatedProductResponse>(`${this.apiUrl}/products/search`, { params });
  // }
}