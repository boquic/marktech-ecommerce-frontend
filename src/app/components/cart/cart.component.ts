import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: `
    <div class="container mx-auto p-4">
      <h2 class="text-3xl font-bold mb-6">Shopping Cart</h2>

      <div *ngIf="cart().items.length === 0" class="text-center py-12">
        <p class="text-xl text-gray-500 mb-4">Your cart is empty</p>
        <a routerLink="/products" class="text-blue-600 hover:underline">Continue Shopping</a>
      </div>

      <div *ngIf="cart().items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div class="p-4 border-b hidden md:grid grid-cols-12 gap-4 font-semibold text-gray-600">
            <div class="col-span-6">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-2 text-center">Quantity</div>
            <div class="col-span-2 text-right">Total</div>
          </div>

          <div *ngFor="let item of cart().items" class="p-4 border-b last:border-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div class="col-span-1 md:col-span-6 flex items-center gap-4">
              <img [src]="item.productImageUrl || 'assets/placeholder.png'" class="w-16 h-16 object-cover rounded bg-gray-100">
              <div>
                <h3 class="font-semibold">{{ item.productName }}</h3>
                <button (click)="removeItem(item.productId)" class="text-red-500 text-sm hover:underline mt-1">Remove</button>
              </div>
            </div>
            
            <div class="col-span-1 md:col-span-2 text-center md:text-left">
              <span class="md:hidden font-semibold">Price: </span>
              {{ item.productPrice | currency }}
            </div>

            <div class="col-span-1 md:col-span-2 flex justify-center items-center gap-2">
              <button (click)="updateQuantity(item.productId, item.quantity - 1)" 
                class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">-</button>
              <span class="w-8 text-center">{{ item.quantity }}</span>
              <button (click)="updateQuantity(item.productId, item.quantity + 1)" 
                class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">+</button>
            </div>

            <div class="col-span-1 md:col-span-2 text-right font-bold">
              <span class="md:hidden font-semibold">Subtotal: </span>
              {{ item.subtotal | currency }}
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-xl font-bold mb-4">Order Summary</h3>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-semibold">{{ cart().totalAmount | currency }}</span>
            </div>
            <div class="flex justify-between mb-4">
              <span class="text-gray-600">Shipping</span>
              <span class="text-green-600">Free</span>
            </div>
            <hr class="my-4">
            <div class="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>{{ cart().totalAmount | currency }}</span>
            </div>
            
            <a routerLink="/checkout" class="block w-full bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </a>
            <button (click)="clearCart()" class="block w-full mt-4 text-gray-500 hover:text-red-500 text-sm">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent {
    cartService = inject(CartService);
    cart = this.cartService.cart;

    updateQuantity(productId: string, quantity: number) {
        this.cartService.updateCartItem({ productId, quantity }).subscribe();
    }

    removeItem(productId: string) {
        this.cartService.removeFromCart({ productId }).subscribe();
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cartService.clearCart().subscribe();
        }
    }
}
