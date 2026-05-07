import { User } from "@shared/interfaces/user.interface";

// Respuesta del backend (formato plano)
export interface BackendAuthResponse {
  token: string;
  tokenType?: string;
  expiresIn?: number;
  userId: string;
  email: string;
  name: string;
  role: string;
}

// Formato interno del frontend (con objeto user)
export interface AuthResponse {
  token: string;
  user: User;
}
