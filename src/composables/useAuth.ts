import { ref, computed, readonly } from 'vue'
import { authService } from '@/services/auth.service'
import type { LoginRequest, RegisterRequest, User } from '@/interfaces/auth.interface'

const isLoading = ref(false)
const error = ref<string | null>(null)
const isInitialized = ref(false)

const currentUser = computed(() => authService.currentUser.value)
const isAuthenticated = computed(() => authService.isAuthenticated.value)
const accessToken = computed(() => authService.accessToken.value)

const clearError = () => {
  error.value = null
}

const setError = (message: string) => {
  error.value = message
  setTimeout(() => {
    if (error.value === message) {
      error.value = null
    }
  }, 5000)
}

const login = async (credentials: LoginRequest): Promise<boolean> => {
  try {
    isLoading.value = true
    clearError()
    
    await authService.login(credentials)
    window.location.href = '/'
    return true
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
    setError(message)
    return false
  } finally {
    isLoading.value = false
  }
}

const register = async (userData: RegisterRequest): Promise<boolean> => {
  try {
    isLoading.value = true
    clearError()
    
    await authService.register(userData)
    window.location.href = '/'
    return true
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al registrarse'
    setError(message)
    return false
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = async (): Promise<void> => {
  try {
    clearError()
    await authService.loginWithGoogle()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al iniciar sesión con Google'
    setError(message)
  }
}

const loginWithFacebook = async (): Promise<void> => {
  try {
    clearError()
    await authService.loginWithFacebook()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al iniciar sesión con Facebook'
    setError(message)
  }
}

const logout = async (): Promise<void> => {
  try {
    await authService.logout()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al hacer logout'
    setError(message)
  }
}

const getProfile = async (): Promise<User | null> => {
  try {
    clearError()
    return await authService.getProfile()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error al obtener perfil'
    setError(message)
    return null
  }
}

const verifyToken = async (): Promise<boolean> => {
  try {
    return await authService.verifyToken()
  } catch (err) {
    console.error('Token verification failed:', err)
    return false
  }
}

const initAuth = async (): Promise<void> => {
  if (isInitialized.value) return
  
  try {
    await authService.initAuth()
  } catch (err) {
    console.error('Auth initialization failed:', err)
  } finally {
    isInitialized.value = true
  }
}

const ensureAuth = async (): Promise<boolean> => {
  if (!isInitialized.value) {
    await initAuth()
  }
  
  if (localStorage.getItem('access_token') && !authService.currentUser.value) {
    try {
      await Promise.race([
        authService.initAuth(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('EnsureAuth timeout')), 3000)
        )
      ])
    } catch (err) {
      console.error('Failed to ensure auth:', err)
      return false
    }
  }
  
  return authService.isAuthenticated.value
}

const handleOAuthCallback = async (): Promise<void> => {
  try {
    await authService.handleOAuthCallback()
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error en la autenticación social'
    setError(message)
  }
}

export function useAuth() {
  return {
    currentUser: readonly(currentUser),
    isAuthenticated: readonly(isAuthenticated),
    accessToken: readonly(accessToken),
    isLoading: readonly(isLoading),
    error: readonly(error),
    isInitialized: readonly(isInitialized),
    
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    getProfile,
    verifyToken,
    initAuth,
    ensureAuth,
    handleOAuthCallback,
    clearError,
    setError
  }
}

export default useAuth

