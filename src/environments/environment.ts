export const environment = {
    production: false,
    // API Gateway base (todas las llamadas deben pasar por aquí)
    apiBaseUrl: 'http://localhost:8080',

    // Rutas lógicas por dominio (para claridad en servicios)
    endpoints: {
      // Versionadas bajo /api/v1
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      products: '/api/v1/products',
      categories: '/api/v1/categories',
      inventory: '/api/v1/inventory',
      cart: '/api/v1/cart',
      orders: '/api/v1/orders',
      payments: '/api/v1/payments',
      notifications: '/api/v1/notifications',
      // Health check del gateway (no versionado)
      health: '/actuator/health'
    }
  };