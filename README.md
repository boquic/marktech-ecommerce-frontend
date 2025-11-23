# MarkTech Ecommerce Frontend

Una aplicación frontend de ecommerce moderna basada en Angular para MarkTech Store, construida con Angular 20, TypeScript y Tailwind CSS.

## 🚀 Stack Tecnológico

### Framework Principal
- **Angular 20** - Framework web moderno
- **TypeScript** - JavaScript tipado
- **RxJS** - Biblioteca de programación reactiva

### Estilo y UI
- **Tailwind CSS** - Framework CSS de utilidades
- **SCSS** - CSS mejorado con variables y nesting
- **Bootstrap Icons** - Biblioteca de iconos

### Herramientas de Desarrollo
- **Angular CLI** - Interfaz de línea de comandos para Angular
- **Karma & Jasmine** - Framework de pruebas
- **PostCSS** - Procesamiento de CSS
- **Autoprefixer** - Prefijos de CSS

### Librerías Adicionales
- **@ngneat/hot-toast** - Notificaciones toast
- **@ngneat/overview** - Visión general de componentes

## 🏗️ Arquitectura

### Arquitectura de la Aplicación
- **Arquitectura basada en Componentes** - Componentes UI modulares
- **Capa de Servicios** - Lógica de negocio y comunicación API
- **Autenticación basada en Guards** - Protección de rutas
- **Patrón Interceptor** - Manejo de solicitudes/respuestas HTTP
- **Programación Reactiva** - Observables RxJS para gestión de estado

### Patrones de Diseño
- **Patrón Repository** - Abstracción de servicios API
- **Patrón Observer** - Flujo de datos reactivo
- **Patrón Strategy** - Guards de autenticación

## 📁 Estructura del Proyecto

```
marktech-ecommerce-frontend/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes de UI
│   │   │   ├── cart/           # Funcionalidad del carrito
│   │   │   ├── category-menu/  # Navegación de categorías
│   │   │   ├── checkout/       # Proceso de checkout
│   │   │   ├── header/         # Cabecera de navegación principal
│   │   │   ├── login/          # Autenticación de usuario
│   │   │   ├── notification/   # Notificaciones toast
│   │   │   ├── order-history/  # Gestión de pedidos
│   │   │   ├── product-detail/ # Información de producto
│   │   │   ├── product-list/   # Catálogo de productos
│   │   │   ├── profile/        # Gestión de perfil de usuario
│   │   │   ├── register/       # Registro de usuario
│   │   │   └── secret-page/    # Sección de administrador/secreta
│   │   ├── guards/             # Protección de rutas
│   │   │   ├── admin.guard.ts  # Protección de rutas de admin
│   │   │   └── auth.guard.ts   # Guard de autenticación
│   │   ├── interceptors/       # Interceptors HTTP
│   │   │   └── auth.interceptor.ts # Gestión de tokens
│   │   ├── models/             # Interfaces TypeScript
│   │   │   ├── auth.model.ts   # Modelos de autenticación
│   │   │   ├── cart.model.ts   # Modelos del carrito
│   │   │   ├── category.model.ts # Modelos de categorías
│   │   │   ├── order.model.ts  # Modelos de pedidos
│   │   │   ├── product.model.ts # Modelos de productos
│   │   │   └── paginated-response.model.ts # Modelos de respuesta API
│   │   ├── services/           # Lógica de negocio
│   │   │   ├── auth-api.service.ts      # API de autenticación
│   │   │   ├── cart-api.service.ts      # API del carrito
│   │   │   ├── cart.service.ts          # Gestión de estado del carrito
│   │   │   ├── category-api.service.ts  # API de categorías
│   │   │   ├── notification.service.ts  # Sistema de notificaciones
│   │   │   ├── order.service.ts         # Gestión de pedidos
│   │   │   ├── product-api.service.ts   # API de productos
│   │   │   └── auth.service.ts          # Servicio de autenticación
│   │   ├── app.component.*     # Componente raíz
│   │   ├── app.config.ts       # Configuración de la aplicación
│   │   ├── app.routes.ts       # Definiciones de rutas
│   │   └── app.spec.ts         # Pruebas del componente raíz
│   ├── assets/                 # Recursos estáticos
│   │   └── images/            # Imágenes de la aplicación
│   ├── environments/          # Configuraciones de entorno
│   │   ├── environment.ts     # Configuración de producción
│   │   └── environment.development.ts # Configuración de desarrollo
│   ├── styles.scss           # Estilos globales
│   ├── main.ts               # Bootstrap de la aplicación
│   └── index.html            # Plantilla HTML principal
├── angular.json              # Configuración de Angular CLI
├── package.json              # Dependencias y scripts
├── tailwind.config.js        # Configuración de Tailwind CSS
├── postcss.config.js         # Configuración de PostCSS
├── proxy.conf.json          # Configuración de proxy de desarrollo
├── tsconfig.json            # Configuración de TypeScript
├── tsconfig.app.json        # Configuración TypeScript de aplicación
└── tsconfig.spec.json       # Configuración TypeScript de pruebas
```

## 🔧 Arquitectura API

### Comunicación con Backend
- **API Gateway**: `http://localhost:8080` (Producción)
- **Proxy de Desarrollo**: `http://localhost:8081`
- **APIs RESTful** con endpoints versionados (`/api/v1/`)

### Endpoints API
```
/api/v1/auth          # Endpoints de autenticación
/api/v1/users         # Gestión de usuarios
/api/v1/products      # Catálogo de productos
/api/v1/categories    # Categorías de productos
/api/v1/inventory     # Gestión de inventario
/api/v1/cart          # Carrito de compras
/api/v1/orders        # Gestión de pedidos
/api/v1/payments      # Procesamiento de pagos
/api/v1/notifications # Sistema de notificaciones
/actuator/health      # Endpoint de verificación de salud
```

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Angular CLI** (v20)

## 🛠️ Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd marktech-ecommerce-frontend
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configuración de Entorno
La aplicación usa archivos de entorno para la configuración:

- **Desarrollo**: `src/environments/environment.development.ts`
- **Producción**: `src/environments/environment.ts`

Asegúrate de que tus servicios backend estén ejecutándose en los puertos configurados.

### 4. Iniciar Servidor de Desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### 5. Alternativa: Usando Angular CLI
```bash
ng serve
```

## 🏃‍♂️ Ejecutando la Aplicación

### Modo Desarrollo
```bash
npm start
# o
ng serve
```
- Se abre en `http://localhost:4200`
- Usa configuración de proxy de desarrollo
- Recarga automática habilitada
- Mapas de fuente habilitados

### Build de Producción
```bash
npm run build
```
- Crea build de producción optimizado
- Salida en directorio `dist/`
- Assets minificados y comprimidos

### Modo Watch (Desarrollo)
```bash
npm run watch
```
- Construye en cambios de archivos
- Optimizado para desarrollo

### Ejecutar Pruebas
```bash
npm test
# o
ng test
```

## 🧪 Pruebas

### Pruebas Unitarias
```bash
npm test
```
Ejecuta el runner de pruebas Karma con Jasmine

### Pruebas End-to-End
```bash
ng e2e
```
Ejecuta pruebas end-to-end (si está configurado)

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación
1. Credenciales de usuario enviadas via formulario de login
2. AuthInterceptor agrega token JWT a las solicitudes
3. AuthGuard protege rutas autenticadas
4. Validación de token en endpoints protegidos

### Protección de Rutas
- **Rutas Públicas**: Login, Registro, Lista de Productos, Detalles de Productos
- **Rutas Protegidas**: Carrito, Checkout, Perfil, Historial de Pedidos
- **Rutas de Admin**: Página secreta (admin.guard.ts)

### Características de Seguridad
- Autenticación basada en tokens JWT
- Interceptors HTTP para manejo automático de tokens
- Guards de rutas para control de acceso
- Configuración API basada en entornos

## 🎨 Arquitectura de Estilos

### Organización CSS
- **Estilos Globales**: `src/styles.scss`
- **Estilos de Componentes**: Archivos SCSS por componente
- **Utilidades Tailwind**: Enfoque de utilidades
- **Bootstrap Icons**: Sistema de iconos

### Sistema de Diseño
- Clases de utilidades de Tailwind CSS
- Variables y mixins personalizados de SCSS
- Patrones de diseño responsive
- Estilos basados en componentes

## 📱 Características

### Características de Usuario
- ✅ Navegación y búsqueda de productos
- ✅ Páginas de detalle de productos
- ✅ Gestión del carrito de compras
- ✅ Autenticación de usuario (login/register)
- ✅ Gestión de perfil de usuario
- ✅ Historial de pedidos
- ✅ Proceso de checkout seguro
- ✅ Navegación por categorías
- ✅ Diseño responsive

### Características de Admin
- ✅ Rutas de admin protegidas
- ✅ Guards de autenticación
- ✅ Página de administrador secreta

### Características Técnicas
- ✅ Programación reactiva con RxJS
- ✅ Interceptors HTTP para llamadas API
- ✅ Notificaciones toast
- ✅ Configuración basada en entornos
- ✅ Configuración de proxy para desarrollo
- ✅ Desarrollo tipado con TypeScript
- ✅ Arquitectura de componentes modular

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Desplegar en Hosting Estático
El directorio `dist/marktech-store-ui/` contiene el build de producción listo para desplegar en cualquier servicio de hosting estático.

### Variables de Entorno
Asegúrate de que las variables de entorno de producción estén correctamente configuradas en `src/environments/environment.ts`.

## 🔧 Guías de Desarrollo

### Organización de Código
- Seguir guía de estilos de Angular
- Usar modo estricto de TypeScript
- Implementar manejo adecuado de errores
- Usar patrones de programación reactiva

### Estructura de Componentes
```typescript
// Ejemplo de estructura de componente
@Component({
  selector: 'app-nombre-componente',
  templateUrl: './nombre-componente.component.html',
  styleUrls: ['./nombre-componente.component.scss']
})
export class NombreComponenteComponent {
  // Lógica del componente
}
```

### Arquitectura de Servicios
- Los servicios API manejan comunicación HTTP
- Los servicios de lógica de negocio gestionan el estado de la aplicación
- Usar inyección de dependencias para gestión de servicios

## 📞 Integración API

El frontend se integra con una API backend RESTful a través del HttpClient de Angular. Los servicios API están organizados por dominio:

- `AuthApiService` - Endpoints de autenticación
- `ProductApiService` - Gestión de productos
- `CartApiService` - Operaciones del carrito
- `OrderService` - Procesamiento de pedidos
- `CategoryApiService` - Gestión de categorías

## 🤝 Contribuir

1. Seguir guía de estilos de Angular
2. Escribir pruebas unitarias para nuevas características
3. Usar modo estricto de TypeScript
4. Seguir patrones de programación reactiva
5. Documentar lógica de negocio compleja

## 📄 Licencia

Este software es propietario de MarkTech Store.

---

**MarkTech Ecommerce Frontend** - Construido con Angular 20 y tecnologías web modernas.