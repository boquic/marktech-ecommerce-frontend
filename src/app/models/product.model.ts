// src/app/models/product.model.ts
export interface Product {
    id: string; // UUID es string en TS/JS
    name: string;
    description?: string;
    price: number;
    sku?: string;
    imageUrl?: string;
    categoryId?: string;
    attributes?: { [key: string]: string };
    isActive: boolean;
    createdAt?: string; // O Date
    updatedAt?: string; // O Date
  }