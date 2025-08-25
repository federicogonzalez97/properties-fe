export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  expires_in: number
  user: {
    id: number
    email: string
    picture?: string
    provider: string
    isVerified: boolean
  }
}

export interface User {
  id: number
  email: string
  picture?: string
  provider: string
  isVerified: boolean
}
