import { Product } from './product.model'; // Asumiendo que product.model.ts existe

export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // Número de página actual (0-indexed por Spring Data Page)
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number; // Elementos en la página actual
  empty: boolean;
}

// Específicamente para productos
export type PaginatedProductResponse = PaginatedResponse<Product>;