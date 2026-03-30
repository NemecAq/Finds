import { apiClient } from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
}

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/api/auth/signin', data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>('/api/auth/signup', data),

  logout: () =>
    apiClient.post('/api/auth/logout'),

  refresh: () =>
    apiClient.post<AuthResponse>('/api/auth/refresh'),
};