import { ref, computed } from 'vue'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/interfaces/auth.interface'

// Configuración de la API
import { API_ENDPOINTS } from '@/config/env'
import axiosInstance from './axios.config'
import axios from 'axios'

const AUTH_ENDPOINTS = API_ENDPOINTS.AUTH

// Estado global de autenticación
const currentUser = ref<User | null>(null)
const accessToken = ref<string | null>(localStorage.getItem('access_token'))
const isAuthenticated = computed(() => !!accessToken.value && !!currentUser.value)

// Función para manejar la respuesta de autenticación
function handleAuthResponse(response: any): AuthResponse {
  if (response.statusCode !== 200 && response.statusCode !== 201) {
    throw new Error(response.message || 'Error de autenticación')
  }

  const authData = response.data
  if (!authData.access_token) {
    throw new Error('Token de acceso no recibido')
  }

  // Guardar token en localStorage
  localStorage.setItem('access_token', authData.access_token)
  accessToken.value = authData.access_token
  currentUser.value = authData.user

  return authData
}

// Servicio de autenticación
export const authService = {
  // Estado
  currentUser,
  accessToken,
  isAuthenticated,

  // Login local
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<{ statusCode: number; message: string; data: AuthResponse }>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      )

      return handleAuthResponse(response.data)
    } catch (error) {
      console.error('Login error:', error)
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión')
      }
      throw error
    }
  },

  // Registro local
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<{ statusCode: number; message: string; data: any }>(
        AUTH_ENDPOINTS.REGISTER,
        userData
      )

      if (response.data.statusCode === 201) {
        return await this.login({
          email: userData.email,
          password: userData.password
        })
      }

      throw new Error(response.data.message || 'Error en el registro')
    } catch (error) {
      console.error('Register error:', error)
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error al registrarse')
      }
      throw error
    }
  },

  // Login con Google
  async loginWithGoogle(): Promise<void> {
    try {
      window.location.href = AUTH_ENDPOINTS.GOOGLE
    } catch (error) {
      console.error('Google login error:', error)
      throw error
    }
  },

  // Login con Facebook
  async loginWithFacebook(): Promise<void> {
    try {
      window.location.href = AUTH_ENDPOINTS.FACEBOOK
    } catch (error) {
      console.error('Facebook login error:', error)
      throw error
    }
  },

  // Obtener perfil del usuario
  async getProfile(): Promise<User> {
    try {
      const response = await axiosInstance.get<{ statusCode: number; data: User }>(
        AUTH_ENDPOINTS.PROFILE
      )

      if (response.data.statusCode === 200) {
        currentUser.value = response.data.data
        return response.data.data
      }

      throw new Error('Error al obtener perfil')
    } catch (error) {
      console.error('Get profile error:', error)
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error al obtener perfil')
      }
      throw error
    }
  },

  // Verificar token
  async verifyToken(): Promise<boolean> {
    try {
      if (!accessToken.value) {
        return false
      }

      const response = await axiosInstance.get<{ statusCode: number; message: string; user: User }>(
        AUTH_ENDPOINTS.VERIFY
      )

      if (response.data.statusCode === 200) {
        currentUser.value = response.data.user
        return true
      }

      return false
    } catch (error) {
      console.error('Token verification error:', error)
      this.logout()
      return false
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      // Llamar al endpoint de logout del backend
      if (accessToken.value) {
        await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT)
      }
    } catch (error) {
      console.error('Logout error:', error)
      if (axios.isAxiosError(error)) {
        console.error('Logout error details:', error.response?.data)
      }
    } finally {
      this.clearAuth()
    }
  },

  // Limpiar autenticación
  clearAuth(): void {
    localStorage.removeItem('access_token')
    accessToken.value = null
    currentUser.value = null
  },

  // Inicializar autenticación (verificar token al cargar la app)
  async initAuth(): Promise<void> {
    try {
      if (accessToken.value) {
        await this.verifyToken()
      }
    } catch (error) {
      console.error('Init auth error:', error)
      this.clearAuth()
    }
  },

  // Manejar callback de OAuth (para cuando el usuario regresa de Google/Facebook)
  async handleOAuthCallback(): Promise<void> {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')
      const error = urlParams.get('error')

      if (error) {
        throw new Error(decodeURIComponent(error))
      }

      if (token) {
        localStorage.setItem('access_token', token)
        accessToken.value = token
        
        await this.getProfile()

        window.location.href = '/'


      }
    } catch (error) {
      console.error('OAuth callback error:', error)
      window.location.href = '/'
    }
  }
}

export default authService
