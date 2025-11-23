import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { OrderRequest, Address } from '../../models/order.model';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Checkout</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Order Summary -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">Order Summary</h3>
          <div *ngFor="let item of cart().items" class="flex justify-between mb-2">
            <span>{{ item.productName }} (x{{ item.quantity }})</span>
            <span>{{ item.subtotal | currency }}</span>
          </div>
          <hr class="my-4">
          <div class="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{{ cart().totalAmount | currency }}</span>
          </div>
        </div>

        <!-- Shipping & Billing Form -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
            <h3 class="text-xl font-semibold mb-4">Shipping Address</h3>
            <div formGroupName="shippingAddress" class="space-y-4">
              <input formControlName="street" placeholder="Street" class="w-full p-2 border rounded">
              <input formControlName="city" placeholder="City" class="w-full p-2 border rounded">
              <input formControlName="state" placeholder="State" class="w-full p-2 border rounded">
              <input formControlName="zipCode" placeholder="Zip Code" class="w-full p-2 border rounded">
              <input formControlName="country" placeholder="Country" class="w-full p-2 border rounded">
            </div>

            <h3 class="text-xl font-semibold mb-4 mt-6">Billing Address</h3>
            <div class="mb-4">
              <label class="inline-flex items-center">
                <input type="checkbox" (change)="copyShippingToBilling($event)" class="form-checkbox">
                <span class="ml-2">Same as shipping</span>
              </label>
            </div>
            <div formGroupName="billingAddress" class="space-y-4">
              <input formControlName="street" placeholder="Street" class="w-full p-2 border rounded">
              <input formControlName="city" placeholder="City" class="w-full p-2 border rounded">
              <input formControlName="state" placeholder="State" class="w-full p-2 border rounded">
              <input formControlName="zipCode" placeholder="Zip Code" class="w-full p-2 border rounded">
              <input formControlName="country" placeholder="Country" class="w-full p-2 border rounded">
            </div>

            <button type="submit" [disabled]="checkoutForm.invalid || cart().items.length === 0"
              class="w-full mt-6 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:bg-gray-400">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
    cartService = inject(CartService);
    orderService = inject(OrderService);
    fb = inject(FormBuilder);
    router = inject(Router);
    toast = inject(HotToastService);

    cart = this.cartService.cart;

    checkoutForm = this.fb.group({
        shippingAddress: this.createAddressGroup(),
        billingAddress: this.createAddressGroup()
    });

    createAddressGroup(): FormGroup {
        return this.fb.group({
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zipCode: ['', Validators.required],
            country: ['', Validators.required]
        });
    }

    copyShippingToBilling(event: any) {
        if (event.target.checked) {
            this.checkoutForm.get('billingAddress')?.setValue(this.checkoutForm.get('shippingAddress')?.value || {});
        } else {
            this.checkoutForm.get('billingAddress')?.reset();
        }
    }

    onSubmit() {
        if (this.checkoutForm.valid && this.cart().items.length > 0) {
            const formValue = this.checkoutForm.value;
            const orderRequest: OrderRequest = {
                shippingAddress: formValue.shippingAddress as Address,
                billingAddress: formValue.billingAddress as Address,
                orderItems: this.cart().items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity
                }))
            };

            this.orderService.createOrder(orderRequest).pipe(
                this.toast.observe({
                    loading: 'Processing order...',
                    success: 'Order placed successfully!',
                    error: 'Failed to place order'
                })
            ).subscribe({
                next: () => {
                    this.cartService.clearCart();
                    this.router.navigate(['/orders/my-orders']);
                }
            });
        }
    }
}
