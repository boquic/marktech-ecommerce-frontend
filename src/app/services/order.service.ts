import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Order, OrderRequest } from '../models/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = `${environment.apiBaseUrl}/orders`;
    private http = inject(HttpClient);

    createOrder(orderRequest: OrderRequest): Observable<Order> {
        return this.http.post<Order>(this.apiUrl, orderRequest);
    }

    getMyOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${this.apiUrl}/my-orders`);
    }

    getOrderById(orderId: string): Observable<Order> {
        return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
    }

    cancelOrder(orderId: string): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${orderId}/cancel`, {});
    }
}
