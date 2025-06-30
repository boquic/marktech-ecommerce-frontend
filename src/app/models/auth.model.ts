export interface LoginRequest {
    usernameOrEmail: string;
    password: string;
}

export interface UserProfile {
    id: string;
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
    roles: string[];
}
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName?: string; // Los campos opcionales deben coincidir con el backend DTO
  lastName?: string;
  // roles no se suele enviar desde el formulario de registro de usuario estándar,
  // el backend usualmente asigna un rol por defecto como "USER".
  // Si tu backend SÍ espera roles desde el frontend para el registro público, añádelo:
  // roles?: string[];
}
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    userProfile: UserProfile;
}