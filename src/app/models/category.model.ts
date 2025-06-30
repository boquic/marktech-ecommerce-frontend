// src/app/models/category.model.ts
export interface Category {
  id: string; // UUID
  name: string;
  description?: string;
  parentId?: string | null; // UUID o null
  parentName?: string; // Opcional, si el backend lo devuelve
  imageUrl?: string;
  isActive: boolean;
  createdAt?: string; // O Date
  updatedAt?: string; // O Date
  // children?: Category[]; // Para estructuras anidadas si las cargas así
}