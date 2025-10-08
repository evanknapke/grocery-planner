<template>
  <div class="auth-view">
    <VCard class="auth-view__card">
      <h1 class="auth-view__title">
        {{ isLoginMode ? 'Welcome Back' : 'Create Account' }}
      </h1>
      <p class="auth-view__subtitle">
        {{ isLoginMode ? 'Sign in to your account' : 'Get started with your account' }}
      </p>

      <form @submit.prevent="handleSubmit" class="auth-view__form">
        <VShortTextField
          v-model="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          :error="emailError"
          :error-message="emailErrorMessage"
          :disabled="loading"
          required
          @blur="validateEmail"
        />

        <VShortTextField
          v-model="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          :error="passwordError"
          :error-message="passwordErrorMessage"
          :disabled="loading"
          required
          @blur="validatePassword"
        />

        <div v-if="errorMessage" class="auth-view__error">
          <VIcon name="alertCircle" class="auth-view__error-icon" />
          <span class="auth-view__error-text">{{ errorMessage }}</span>
        </div>

        <div v-if="successMessage" class="auth-view__success">
          <VIcon name="checkCircle" class="auth-view__success-icon" />
          <span class="auth-view__success-text">{{ successMessage }}</span>
        </div>

        <VButton
          type="submit"
          variant="primary"
          size="lg"
          :disabled="loading || !isFormValid"
          class="auth-view__submit-button"
        >
          <VLoadingSpinner v-if="loading" size="sm" class="auth-view__loading-spinner" />
          {{ isLoginMode ? 'Sign In' : 'Create Account' }}
        </VButton>
      </form>

      <div class="auth-view__toggle">
        <p class="auth-view__toggle-text">
          {{ isLoginMode ? "Don't have an account?" : 'Already have an account?' }}
        </p>
        <VButton
          type="button"
          variant="ghost"
          size="sm"
          @click="toggleMode"
          :disabled="loading"
          class="auth-view__toggle-button"
        >
          {{ isLoginMode ? 'Create Account' : 'Sign In' }}
        </VButton>
      </div>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import VButton from '@/components/ui/VButton.vue'
import VShortTextField from '@/components/ui/VShortTextField.vue'
import VLoadingSpinner from '@/components/ui/VLoadingSpinner.vue'
import VIcon from '@/components/ui/VIcon.vue'
import VCard from '@/components/ui/VCard.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

// Form state
const email = ref('')
const password = ref('')
const isLoginMode = ref(true)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Validation state
const emailError = ref(false)
const passwordError = ref(false)
const emailErrorMessage = ref('')
const passwordErrorMessage = ref('')

// Computed properties
const isFormValid = computed(() => {
  return email.value.trim() !== '' && 
         password.value.trim() !== '' && 
         !emailError.value && 
         !passwordError.value
})

// Validation functions
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    emailError.value = false
    emailErrorMessage.value = ''
    return
  }
  
  if (!emailRegex.test(email.value)) {
    emailError.value = true
    emailErrorMessage.value = 'Please enter a valid email address'
  } else {
    emailError.value = false
    emailErrorMessage.value = ''
  }
}

const validatePassword = () => {
  if (!password.value.trim()) {
    passwordError.value = false
    passwordErrorMessage.value = ''
    return
  }
  
  if (password.value.length < 6) {
    passwordError.value = true
    passwordErrorMessage.value = 'Password must be at least 6 characters'
  } else {
    passwordError.value = false
    passwordErrorMessage.value = ''
  }
}

// Clear messages when switching modes
watch(isLoginMode, () => {
  clearMessages()
})

// Clear messages when form values change
watch([email, password], () => {
  if (errorMessage.value || successMessage.value) {
    clearMessages()
  }
})

const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  clearMessages()
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    return
  }

  loading.value = true
  clearMessages()

  try {
    let result

    if (isLoginMode.value) {
      result = await authStore.signIn(email.value.trim(), password.value)
    } else {
      result = await authStore.signUp(email.value.trim(), password.value)
    }

    if (result.success) {
      if (isLoginMode.value) {
        successMessage.value = 'Successfully signed in!'
        // Redirect to intended page or home after successful login
        const redirectPath = route.query.redirect as string || '/'
        setTimeout(() => {
          router.push(redirectPath)
        }, 1000)
      } else {
        successMessage.value = 'Account created successfully! Please check your email to verify your account.'
        // Switch to login mode after successful signup
        setTimeout(() => {
          isLoginMode.value = true
          clearMessages()
        }, 2000)
      }
    } else {
      errorMessage.value = result.error || 'An unexpected error occurred'
    }
  } catch (error) {
    console.error('Auth error:', error)
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.auth-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-lg;
  background: linear-gradient(135deg, rgba($primary-color, 0.05) 0%, rgba($secondary-color, 0.05) 100%);

  &__card {
    width: 100%;
    max-width: 400px;
    text-align: center;
  }

  &__title {
    font-size: 1.75rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: $spacing-sm;
  }

  &__subtitle {
    color: $text-secondary;
    font-size: 0.95rem;
    margin-bottom: $spacing-xl;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    margin-bottom: $spacing-lg;
  }

  &__error {
    background: rgba($error-color, 0.1);
    border: 1px solid rgba($error-color, 0.2);
    border-radius: $border-radius-md;
    padding: $spacing-md;
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__error-icon {
    color: $error-color;
    flex-shrink: 0;
  }

  &__error-text {
    color: $error-color;
    font-size: 0.9rem;
    font-weight: 500;
  }

  &__success {
    background: rgba($success-color, 0.1);
    border: 1px solid rgba($success-color, 0.2);
    border-radius: $border-radius-md;
    padding: $spacing-md;
    display: flex;
    align-items: center;
    gap: $spacing-sm;
  }

  &__success-icon {
    color: $success-color;
    flex-shrink: 0;
  }

  &__success-text {
    color: $success-color;
    font-size: 0.9rem;
    font-weight: 500;
  }

  &__submit-button {
    width: 100%;
    position: relative;
  }

  &__loading-spinner {
    margin-right: $spacing-sm;
  }

  &__toggle {
    text-align: center;
    padding-top: $spacing-lg;
    border-top: 1px solid rgba($text-secondary, 0.1);
  }

  &__toggle-text {
    color: $text-secondary;
    font-size: 0.9rem;
    margin-bottom: $spacing-sm;
  }

  &__toggle-button {
    background: none;
    border: none;
    color: $primary-color;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: underline;
    transition: color 0.2s ease;

    &:hover:not(:disabled) {
      color: $secondary-color;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}

// Responsive design
@media (max-width: 480px) {
  .auth-view {
    padding: $spacing-md;

    &__title {
      font-size: 1.5rem;
    }
  }
}
</style>
