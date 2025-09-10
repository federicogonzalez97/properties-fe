<template>
  <div class="email-auth-form">
    <div class="form-header">
      <h2>{{ mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta' }}</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="email" class="form-label">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          class="form-input"
          :class="{ 'error': formErrors.email && touchedFields.email }"
          placeholder="tu@email.com"
          @blur="markFieldAsTouched('email')"
          required
        />
        <span v-if="formErrors.email && touchedFields.email" class="error-message">
          {{ formErrors.email }}
        </span>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Contraseña</label>
        <input
          id="password"
          v-model="formData.password"
          type="password"
          class="form-input"
          :class="{ 'error': formErrors.password && touchedFields.password }"
          placeholder="••••••••"
          @blur="markFieldAsTouched('password')"
          required
        />
        <span v-if="formErrors.password && touchedFields.password" class="error-message">
          {{ formErrors.password }}
        </span>
      </div>

      <div v-if="!isLoginMode" class="form-group">
        <label for="confirmPassword" class="form-label">Confirmar contraseña</label>
        <input
          id="confirmPassword"
          v-model="formData.confirmPassword"
          type="password"
          class="form-input"
          :class="{ 'error': formErrors.confirmPassword && touchedFields.confirmPassword }"
          placeholder="••••••••"
          @blur="markFieldAsTouched('confirmPassword')"
          required
        />
        <span v-if="formErrors.confirmPassword && touchedFields.confirmPassword" class="error-message">
          {{ formErrors.confirmPassword }}
        </span>
        </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <button 
        type="submit" 
        class="submit-button"
        :disabled="isLoading || !validateForm()"
      >
        <span v-if="isLoading" class="loading-spinner"></span>
        {{ isLoginMode ? 'Iniciar sesión' : 'Crear cuenta' }}
      </button>
    </form>

    <!-- <div class="form-footer">
      <span class="footer-text">
        {{ isLoginMode ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?' }}
      </span>
      <button class="footer-link" @click="toggleMode">
        {{ isLoginMode ? 'Regístrate aquí' : 'Inicia sesión aquí' }}
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import { useAuth } from '@/composables/useAuth'

interface Props {
  mode: 'login' | 'register'
}

// interface Emits {
//   (e: 'back'): void
//   (e: 'success'): void
// }

const props = defineProps<Props>()
// const emit = defineEmits<Emits>()

const { login, register, isLoading, error } = useAuth()

const formData = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const formErrors = reactive({
  email: '',
  password: '',
  confirmPassword: ''
})

const touchedFields = reactive({
  email: false,
  password: false,
  confirmPassword: false
})

const currentMode = ref(props.mode)

const isLoginMode = computed(() => currentMode.value === 'login')

const validators = {
  email: (value: string) => {
    if (!value) return 'El email es requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'El email no es válido'
    }
    return ''
  },
  
  password: (value: string) => {
    if (!value) return 'La contraseña es requerida'
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
    return ''
  },
  
  confirmPassword: (value: string) => {
    if (!value) return 'Confirma tu contraseña'
    if (value !== formData.password) return 'Las contraseñas no coinciden'
    return ''
  }
}

const validateField = (field: keyof typeof formData) => {
  const validator = validators[field]
  if (validator) {
    formErrors[field] = validator(formData[field])
  }
}

const validateForm = () => {
  let isValid = true
  
  // Only validate email and password for login mode
  const fieldsToValidate = isLoginMode.value 
    ? ['email', 'password'] 
    : ['email', 'password', 'confirmPassword']
  
  fieldsToValidate.forEach(field => {
    validateField(field as keyof typeof formData)
    if (formErrors[field as keyof typeof formData]) {
      isValid = false
    }
  })
  
  return isValid
}

const markFieldAsTouched = (field: keyof typeof formData) => {
  touchedFields[field] = true
  validateField(field)
}

const clearErrors = () => {
  ;(Object.keys(formErrors) as Array<keyof typeof formData>).forEach(field => {
    formErrors[field] = ''
  })
}

const resetForm = () => {
  ;(Object.keys(formData) as Array<keyof typeof formData>).forEach(field => {
    formData[field] = ''
  })
  clearErrors()
  ;(Object.keys(touchedFields) as Array<keyof typeof formData>).forEach(field => {
    touchedFields[field] = false
  })
}

watch(currentMode, () => {
  if (error.value) {
    const { clearError } = useAuth()
    clearError()
  }
  resetForm()
})


const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  if (isLoginMode.value) {
    await login({
      email: formData.email,
      password: formData.password
    })
  } else {
    await register({
      email: formData.email,
      password: formData.password
    })
  }
}
</script>

<style scoped lang="scss">
.email-auth-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 20px 20px;
  padding-top: 25px;
}

.form-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
}



.form-title {
  flex: 1;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #333333;
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 5px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #333333;
}

.form-input {
  padding: 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #365196;
  }

  &::placeholder {
    color: #999;
  }

  &.error {
    border-color: #dc3545;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
  }
}

.error-message {
  background-color: #fee;
  color: #c33;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: 'Poppins', sans-serif;
  font-size: 12px;
  text-align: left;
  margin-top: 4px;
  border-left: 3px solid #dc3545;
}

.submit-button {
  padding: 14px;
  background: #365196;
  color: white;
  border: none;
  border-radius: 5px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover:not(:disabled) {
    background: #2d4080;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-footer {
  margin-top: 30px;
  text-align: center;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.footer-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #737373;
}

.footer-link {
  background: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #365196;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  
  &:hover {
    color: #2d4080;
  }
}

@media (max-width: 768px) {
  .email-auth-form {
    padding: 20px 15px;
    padding-top: 30px;
  }
  
  .form-header {
    margin-bottom: 25px;
  }
  
  .form-title {
    font-size: 18px;
  }
  
  .form-input {
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 6px;
  }
  
  .submit-button {
    padding: 14px;
    font-size: 14px;
    border-radius: 6px;
    margin-top: 15px;
  }
  
  .form-footer {
    margin-top: 20px;
  }
  
  .auth-form {
    gap: 18px;
    margin-top: 15px;
  }
  
  .form-group {
    gap: 8px;
  }
  
  .form-label {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .email-auth-form {
    padding: 15px 10px;
    padding-top: 25px;
  }
  
  .form-header {
    margin-bottom: 20px;
  }
  
  .form-title {
    font-size: 16px;
  }
  
  .form-input {
    padding: 10px 14px;
    font-size: 13px;
    border-radius: 5px;
  }
  
  .submit-button {
    padding: 12px;
    font-size: 13px;
    border-radius: 5px;
    margin-top: 12px;
  }
  
  .form-footer {
    margin-top: 15px;
  }
  
  .auth-form {
    gap: 15px;
    margin-top: 0;
  }
  
  .form-group {
    gap: 6px;
  }
  
  .form-label {
    font-size: 12px;
  }
  
  .footer-text,
  .footer-link {
    font-size: 11px;
  }
}
</style>
