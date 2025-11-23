import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
    selector: 'app-order-history',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-6">My Orders</h2>
      
      <div *ngIf="orders.length === 0" class="text-center py-8 text-gray-500">
        You have no orders yet.
      </div>

      <div class="space-y-4">
        <div *ngFor="let order of orders" class="bg-white border rounded-lg p-4 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <div>
              <span class="font-bold text-lg">Order #{{ order.id.slice(0, 8) }}</span>
              <div class="text-sm text-gray-500">{{ order.orderDate | date:'medium' }}</div>
            </div>
            <div class="flex items-center gap-4">
              <span [ngClass]="{
                'bg-yellow-100 text-yellow-800': order.status === 'PENDING',
                'bg-green-100 text-green-800': order.status === 'COMPLETED',
                'bg-red-100 text-red-800': order.status === 'CANCELLED'
              }" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ order.status }}
              </span>
              <span class="font-bold text-lg">{{ order.totalAmount | currency }}</span>
            </div>
          </div>

          <div class="border-t pt-4">
            <div *ngFor="let item of order.items" class="flex justify-between text-sm mb-1">
              <span>{{ item.productName }} (x{{ item.quantity }})</span>
              <span>{{ (item.price || 0) * item.quantity | currency }}</span>
            </div>
          </div>

          <div class="mt-4 flex justify-end" *ngIf="order.status === 'PENDING'">
            <button (click)="cancelOrder(order.id)" 
              class="text-red-600 hover:text-red-800 text-sm font-medium">
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderHistoryComponent implements OnInit {
    orderService = inject(OrderService);
    toast = inject(HotToastService);
    orders: Order[] = [];

    ngOnInit() {
        this.loadOrders();
    }

    loadOrders() {
        this.orderService.getMyOrders().subscribe({
            next: (orders) => this.orders = orders,
            error: () => this.toast.error('Failed to load orders')
        });
    }

    cancelOrder(orderId: string) {
        if (confirm('Are you sure you want to cancel this order?')) {
            this.orderService.cancelOrder(orderId).pipe(
                this.toast.observe({
                    loading: 'Cancelling...',
                    success: 'Order cancelled',
                    error: 'Failed to cancel order'
                })
            ).subscribe(() => {
                this.loadOrders();
            });
        }
    }
}
