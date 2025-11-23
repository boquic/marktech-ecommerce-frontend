// src/app/models/cart.model.ts

export interface CartItem {
  productId: string;
  productName: string;
  productPrice: number;
  productImageUrl?: string;
  quantity: number;
  subtotal: number; // price * quantity
}

export interface Cart {
  id: string; // userId o sessionId
  items: CartItem[];
  totalItems: number; // suma de todas las cantidades
  totalAmount: number; // suma de todos los subtotales
  createdAt: string;
  updatedAt: string;
}

export interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartRequest {
  productId: string;
}
