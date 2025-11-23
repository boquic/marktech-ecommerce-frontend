# Marktech E-Commerce Frontend

Frontend application for the Marktech e-commerce platform, built with Angular 17+, TailwindCSS, and RxJS/Signals.

## Features

- **Authentication**: JWT-based auth with automatic token refresh and secure storage.
- **Product Catalog**: Grid view of products with pagination and infinite scroll support.
- **Shopping Cart**: Reactive cart management using Angular Signals, with real-time updates.
- **Orders**: Checkout process with address forms and order history view.
- **UI/UX**: Modern, responsive design using TailwindCSS and HotToast notifications.

## Tech Stack

- **Framework**: Angular 17+ (Standalone Components)
- **Styling**: TailwindCSS v3
- **State Management**: Angular Signals
- **HTTP**: Angular HttpClient with Interceptors
- **Notifications**: @ngneat/hot-toast

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

Run the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building

Run the build command to generate the production artifacts:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

- `src/app/components`: UI components (Products, Cart, Checkout, Auth).
- `src/app/services`: API services (Auth, Product, Cart, Order).
- `src/app/models`: TypeScript interfaces for data models.
- `src/app/interceptors`: HTTP interceptors for Auth and Error handling.
- `src/app/guards`: Route guards for protected routes.

## Configuration

- **API URL**: Configure the backend API URL in `src/environments/environment.ts`.
- **Tailwind**: Custom theme configuration in `tailwind.config.js`.
