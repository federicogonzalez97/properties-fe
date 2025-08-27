<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-content">
            <div class="modal-header">
              <button class="modal-back" @click="hideEmailForm" v-if="showEmailForm">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="#737373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="modal-logo">LOGO</div>
              <button class="modal-close" @click="closeModal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#737373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>

            <div v-if="!showEmailForm" class="modal-main">
              <h2 class="modal-title">
                {{ isLoginMode ? 'Elige como quieres ingresar' : 'Elige como quieres registrarte' }}
              </h2>

              <div class="email-button-container">
                <button class="email-button" @click="showEmailFormHandler">
                  {{ isLoginMode ? 'Iniciar sesión con email' : 'Registrarse con email' }}
                </button>
              </div>

              <div class="separator">
                <span class="separator-text">O continuar con</span>
              </div>

              <div class="social-buttons-container">
                <button class="social-button social-button--facebook" @click="loginWithFacebook">
                  <img src="/images/facebook.svg" alt="Facebook" class="social-icon" width="20" height="20" />
                  Continuar con Facebook
                </button>

                <button class="social-button" @click="loginWithGoogle">
                  <img src="/images/google.svg" alt="Google" class="social-icon" width="20" height="20" />
                  Continuar con Google
                </button>
              </div>


              <div class="mode-switch mode-switch--mobile">
                <span class="mode-switch-text">
                  {{ isLoginMode ? '¿No tienes cuenta?' : '¿Ya tienes una cuenta?' }}
                </span>
                <button class="mode-switch-link" @click="switchMode">
                  {{ isLoginMode ? 'Registrarse' : 'Iniciar sesión' }}
                </button>
              </div>

              <p class="legal-text">
                Al iniciar sesión, aceptas los Términos y Condiciones, Declaraciones, Política de Protección de Datos y Política de Privacidad.
              </p>
            </div>

            <EmailAuthForm
              v-else
              :mode="currentMode"
              @back="hideEmailForm"
              @success="handleAuthSuccess"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, computed, watch } from 'vue';
import { useAuth } from '@/composables/useAuth';
import EmailAuthForm from './EmailAuthForm.vue';

interface Props {
  isOpen: boolean;
  mode?: 'login' | 'register';
}

interface Emits {
  (e: 'close'): void;
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'login'
});

const emit = defineEmits<Emits>();

const { loginWithGoogle, loginWithFacebook } = useAuth();

const currentMode = ref<'login' | 'register'>(props.mode);
const showEmailForm = ref(false);

watch(() => props.mode, (newMode) => {
  currentMode.value = newMode;
  showEmailForm.value = false;
}, { immediate: true });

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    currentMode.value = props.mode;
    showEmailForm.value = false;
  }
});

const isLoginMode = computed(() => currentMode.value === 'login');

const closeModal = () => {
  emit('close');
  showEmailForm.value = false;
};

const showEmailFormHandler = () => {
  showEmailForm.value = true;
};

const hideEmailForm = () => {
  showEmailForm.value = false;
};

const handleAuthSuccess = () => {
};

const switchMode = () => {
  currentMode.value = currentMode.value === 'login' ? 'register' : 'login';
};


</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
  transition: backdrop-filter 0.05s ease-out;
}

.modal-container {
  width: 500px;
  height: 520px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
}

.modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 25px 20px 25px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.modal-back {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.05s ease-out;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.modal-logo {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #365196;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.05s ease-out;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 25px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.modal-main {
  flex: 1;
  padding: 15px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: #333333;
  text-align: center;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.email-button-container {
  width: 100%;
  margin-bottom: 25px;
}

.email-button {
  width: 100%;
  height: 50px;
  background: #365196;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.05s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  line-height: 130%;
  letter-spacing: 0%;
  
  &:hover {
    background: #2d4080;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.separator {
  width: 100%;
  text-align: center;
  margin: 25px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #E0E0E0;
  }
}

.separator-text {
  background: white;
  padding: 0 20px;
  color: #737373;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  position: relative;
  z-index: 1;
}

.social-buttons-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 25px;
}

.social-button {
  width: 100%;
  height: 50px;
  border: 1px solid #E0E0E0;
  background: #FFFFFF;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 13px;
  color: #545F71;
  cursor: pointer;
  transition: all 0.05s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  line-height: 130%;
  letter-spacing: 0%;
  position: relative;
  text-align: center;
  
  &:hover {
    background: #f8f8f8;
    border-color: #d0d0d0;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.social-icon {
  flex-shrink: 0;
  position: absolute;
  left: 20px;
}

.mode-switch {
  text-align: center;
  margin-bottom: 20px;
}

.mode-switch--mobile {
  display: none;
}

.mode-switch-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #737373;
  margin-right: 8px;
}

.mode-switch-link {
  background: none;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #365196;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  
  &:hover {
    color: #2d4080;
  }
}

.legal-text {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 11px;
  line-height: 1.4;
  color: #737373;
  text-align: center;
  margin: 0;
  padding: 0 20px;
}
    
.modal-enter-active,
.modal-leave-active {
  transition: all 0.08s ease-out;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

@media (max-width: 1024px) and (min-width: 769px) {
  .modal-container {
    width: 450px;
    height: 470px;
  }
  
  .modal-main {
    padding: 25px 20px;
  }
  
  .modal-title {
    font-size: 17px;
    margin-bottom: 25px;
  }
  
  .email-button,
  .social-button {
    height: 45px;
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .modal-container {
    width: 90vw;
    height: auto;
    min-height: 500px;
    margin: 20px;
  }
  
  .modal-header {
    padding: 30px 20px 20px 20px;
  }
  
  .modal-back {
    width: 36px;
    height: 36px;
  }
  
  .modal-logo {
    font-size: 22px;
  }
  
  .modal-close {
    width: 36px;
    height: 36px;
  }
  
  .modal-main {
    padding: 20px 20px;
    margin-top: 15px;
  }
  
  .modal-title {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .email-button-container {
    margin-bottom: 20px;
  }
  
  .email-button {
    height: 50px;
    font-size: 14px;
  }
  
  .separator {
    margin: 20px 0;
  }
  
  .separator-text {
    font-size: 13px;
  }
  
  .social-buttons-container {
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .social-button {
    height: 45px;
    font-size: 13px;
  }
  
  .mode-switch {
    margin-bottom: 15px;
  }

  .mode-switch--mobile {
    display: block;
  }
  
  .mode-switch-text,
  .mode-switch-link {
    font-size: 13px;
  }
  
  .legal-text {
    font-size: 10px;
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .modal-container {
    width: 95vw;
    margin: 15px;
    min-height: 450px;
  }
  
  .modal-header {
    padding: 25px 15px 15px 15px;
  }
  
  .modal-back {
    width: 32px;
    height: 32px;
  }
  
  .modal-logo {
    font-size: 20px;
  }
  
  .modal-close {
    width: 32px;
    height: 32px;
  }
  
  .modal-main {
    padding: 15px 15px;
  }
  
  .modal-title {
    font-size: 15px;
    margin-bottom: 15px;
  }
  
  .email-button-container {
    margin-bottom: 15px;
  }
  
  .email-button {
    height: 45px;
    font-size: 13px;
  }
  
  .separator {
    margin: 15px 0;
  }
  
  .separator-text {
    font-size: 12px;
  }
  
  .social-buttons-container {
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .social-button {
    height: 40px;
    font-size: 12px;
  }
  
  .mode-switch {
    margin-bottom: 12px;
  }

  .mode-switch--mobile {
    display: block; /* Mostrar en mobile pequeño */
  }
  
  .mode-switch-text,
  .mode-switch-link {
    font-size: 12px;
  }
  
  .legal-text {
    font-size: 9px;
    padding: 0 10px;
  }
}
</style>
