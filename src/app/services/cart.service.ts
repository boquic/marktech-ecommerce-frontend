import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Cart, CartItem, AddToCartRequest, UpdateCartItemRequest, RemoveFromCartRequest } from '../models/cart.model';
import { Product } from '../models/product.model';
import { AuthApiService } from './auth-api.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private authService = inject(AuthApiService);
  private readonly CART_STORAGE_KEY = 'marktech_cart';

  // Signals
  private cartSignal = signal<Cart>(this.getInitialCart());

  // Computed values
  public cart = computed(() => this.cartSignal());
  public totalItems = computed(() => this.cartSignal().items.reduce((acc, item) => acc + item.quantity, 0));
  public totalAmount = computed(() => this.cartSignal().items.reduce((acc, item) => acc + item.subtotal, 0));

  constructor() {
    // Effect to save to localStorage whenever cart changes
    effect(() => {
      this.saveCartToStorage(this.cartSignal());
    });

    // Migrate cart on login
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.migrateCartToUser(user.id);
      }
    });
  }

  addToCart(request: AddToCartRequest): Observable<Cart> {
    this.updateCart(currentCart => {
      const existingItemIndex = currentCart.items.findIndex(item => item.productId === request.productId);
      if (existingItemIndex > -1) {
        currentCart.items[existingItemIndex].quantity += request.quantity;
        // Note: Price update logic should ideally come from backend or product lookup
        // For now assuming price is stable or updated elsewhere
        currentCart.items[existingItemIndex].subtotal = currentCart.items[existingItemIndex].productPrice * currentCart.items[existingItemIndex].quantity;
      } else {
        // In a real app, we might need to fetch product details here if not provided
        // For this refactor, we assume the component calling this might need to provide more info 
        // or we fetch it. To keep it simple and compatible with previous interface:
        // We'll add a placeholder if it's a raw request, but ideally use addProductToCart
      }
      return currentCart;
    });
    return of(this.cartSignal());
  }

  addProductToCart(product: Product, quantity: number = 1): Observable<Cart> {
    this.updateCart(currentCart => {
      const existingItemIndex = currentCart.items.findIndex(item => item.productId === product.id);
      if (existingItemIndex > -1) {
        currentCart.items[existingItemIndex].quantity += quantity;
        currentCart.items[existingItemIndex].subtotal = currentCart.items[existingItemIndex].productPrice * currentCart.items[existingItemIndex].quantity;
      } else {
        currentCart.items.push({
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          productImageUrl: product.imageUrl,
          quantity: quantity,
          subtotal: product.price * quantity
        });
      }
      return currentCart;
    });
    return of(this.cartSignal());
  }

  updateCartItem(request: UpdateCartItemRequest): Observable<Cart> {
    this.updateCart(currentCart => {
      const index = currentCart.items.findIndex(item => item.productId === request.productId);
      if (index > -1) {
        if (request.quantity <= 0) {
          currentCart.items.splice(index, 1);
        } else {
          currentCart.items[index].quantity = request.quantity;
          currentCart.items[index].subtotal = currentCart.items[index].productPrice * request.quantity;
        }
      }
      return currentCart;
    });
    return of(this.cartSignal());
  }

  removeFromCart(request: RemoveFromCartRequest): Observable<Cart> {
    this.updateCart(currentCart => {
      currentCart.items = currentCart.items.filter(item => item.productId !== request.productId);
      return currentCart;
    });
    return of(this.cartSignal());
  }

  clearCart(): Observable<Cart> {
    this.updateCart(currentCart => {
      currentCart.items = [];
      return currentCart;
    });
    return of(this.cartSignal());
  }

  private updateCart(updater: (cart: Cart) => Cart) {
    this.cartSignal.update(currentCart => {
      const updatedCart = updater({ ...currentCart }); // Shallow copy
      updatedCart.updatedAt = new Date().toISOString();
      updatedCart.totalItems = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);
      updatedCart.totalAmount = updatedCart.items.reduce((acc, item) => acc + item.subtotal, 0);
      return updatedCart;
    });
  }

  private getInitialCart(): Cart {
    const stored = localStorage.getItem(this.CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      id: 'anonymous',
      items: [],
      totalItems: 0,
      totalAmount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  private saveCartToStorage(cart: Cart) {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }

  private migrateCartToUser(userId: string) {
    const currentCart = this.cartSignal();
    if (currentCart.id === 'anonymous') {
      this.cartSignal.update(cart => ({ ...cart, id: userId }));
    }
  }
}
