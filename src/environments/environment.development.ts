export const environment = {
  production: false,
  // Relative base so Angular dev-server proxy can forward to the gateway
  apiBaseUrl: '',
  endpoints: {
    auth: '/api/v1/auth',
    users: '/api/v1/users',
    products: '/api/v1/products',
    categories: '/api/v1/categories',
    inventory: '/api/v1/inventory',
    cart: '/api/v1/cart',
    orders: '/api/v1/orders',
    payments: '/api/v1/payments',
    notifications: '/api/v1/notifications',
    health: '/actuator/health'
  }
};
