export interface OrderItem {
    productId: string;
    quantity: number;
    price?: number; // Optional for request, likely present in response
    productName?: string;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface OrderRequest {
    shippingAddress: Address;
    billingAddress: Address;
    orderItems: OrderItem[];
}

export interface Order {
    id: string;
    userId: string;
    orderDate: string;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    totalAmount: number;
    shippingAddress: Address;
    billingAddress: Address;
    items: OrderItem[];
}
