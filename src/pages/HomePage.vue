<template>
  <div class="home">
    <!-- Main content -->
    <div class="home__container">
    <div class="home__content">
        <!-- Hero section -->
        <div class="home__hero">
          <h1 class="home__title">
            <span class="home__title-highlight">Smart</span> Grocery Planning
            <br>
            <span class="home__title-sub">Made Simple</span>
          </h1>
          
      <p class="home__description">
            Transform your meal planning experience with AI-powered recipe discovery, 
            intelligent grocery list generation, and seamless shopping organization.
      </p>
          
          <div class="home__actions">
            <VButton to="/recipes" variant="primary" size="lg" class="home__cta home__cta--primary" trailing-icon="arrowRight">
              <span>Explore Recipes</span>
            </VButton>
            
            <VButton to="/saved-lists" variant="outline" size="lg" class="home__cta home__cta--secondary">
              <span>View Saved Lists</span>
            </VButton>
          </div>
        </div>
        
        <!-- Feature cards -->
        <div class="home__features">
          <div class="home__feature-card">
            <div class="home__feature-icon">
              <VIcon name="checkCircle" :size="24" />
            </div>
            <h3 class="home__feature-title">Smart Planning</h3>
            <p class="home__feature-description">AI-powered meal suggestions based on your preferences and dietary needs.</p>
          </div>
          
          <div class="home__feature-card">
            <div class="home__feature-icon">
              <VIcon name="cart" :size="24" />
            </div>
            <h3 class="home__feature-title">Organized Lists</h3>
            <p class="home__feature-description">Automatically categorized grocery lists that make shopping efficient and stress-free.</p>
          </div>
          
          <div class="home__feature-card">
            <div class="home__feature-icon">
              <VIcon name="star" :size="24" />
            </div>
            <h3 class="home__feature-title">Recipe Discovery</h3>
            <p class="home__feature-description">Explore thousands of recipes with detailed instructions and nutritional information.</p>
          </div>
        </div>
        
        <!-- Toast Demo Section (for development/testing) -->
        <div v-if="showToastDemo" class="home__toast-demo">
          <h3 class="home__demo-title">Toast Notifications Demo</h3>
          <p class="home__demo-description">Test the different toast notification variants:</p>
          <div class="home__demo-buttons">
            <VButton @click="showSuccessToast" variant="primary" size="sm">
              Success Toast
            </VButton>
            <VButton @click="showErrorToast" variant="destructive" size="sm">
              Error Toast
            </VButton>
            <VButton @click="showWarningToast" variant="outline" size="sm">
              Warning Toast
            </VButton>
            <VButton @click="showInfoToast" variant="secondary" size="sm">
              Info Toast
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VButton from '@/components/ui/VButton.vue'
import VIcon from '@/components/ui/VIcon.vue'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()

// Show toast demo in development
const showToastDemo = ref(import.meta.env.DEV)

const showSuccessToast = () => {
  toastStore.success('Success!', 'Operation completed successfully!', 4000)
}

const showErrorToast = () => {
  toastStore.error('Error', 'Something went wrong. Please try again.', 6000)
}

const showWarningToast = () => {
  toastStore.warning('Warning', 'Please review your input before proceeding.', 5000)
}

const showInfoToast = () => {
  toastStore.info('Information', 'Here is some useful information for you.', 4000)
}
</script>

<style scoped lang="scss">
.home {
  position: relative;
  min-height: calc(100vh - 80px); // Account for header height
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    padding: $spacing-xl $spacing-md $spacing-xxl;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-xxl;
  }

  &__hero {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }


  &__title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: $spacing-lg;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 50%, $accent-color 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;

    &-highlight {
      display: inline-block;
      background: linear-gradient(135deg, $primary-color, $secondary-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    &-sub {
      display: block;
      font-size: 0.6em;
      font-weight: 600;
      color: $text-secondary;
      margin-top: $spacing-sm;
    }
  }

  &__description {
    font-size: 1.25rem;
    color: $text-secondary;
    line-height: 1.7;
    margin-bottom: $spacing-xxl;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__actions {
    display: flex;
    gap: $spacing-lg;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  &__cta {
    min-width: 200px;

    &-icon {
      transition: transform $transition-fast;
    }

    &:hover &-icon {
      transform: translateX(4px);
    }
  }

  &__features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-xl;
    margin-top: $spacing-xxl;
  }

  &__feature-card {
    background: $surface;
    padding: $spacing-xl;
    border-radius: $border-radius-lg;
    box-shadow: $shadow-md;
    text-align: center;
    transition: all $transition-normal;
    border: 1px solid rgba($primary-color, 0.1);

    &:hover {
      transform: translateY(-4px);
      box-shadow: $shadow-xl;
      border-color: rgba($primary-color, 0.2);
    }
  }

  &__feature-icon {
    width: 60px;
    height: 60px;
    margin: 0 auto $spacing-lg;
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: $shadow-md;
  }

  &__feature-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: $spacing-sm;
  }

  &__feature-description {
    color: $text-secondary;
    line-height: 1.6;
    font-size: 0.95rem;
  }
}

// Toast Demo Section
&__toast-demo {
  background: rgba(255, 255, 255, 0.8);
  border: 2px dashed $border;
  border-radius: $border-radius-lg;
  padding: $spacing-lg;
  text-align: center;
  margin-top: $spacing-xl;
}

&__demo-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

&__demo-description {
  color: $text-secondary;
  margin-bottom: $spacing-md;
  font-size: 0.9rem;
}

&__demo-buttons {
  display: flex;
  gap: $spacing-sm;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    
    .v-button {
      width: 200px;
    }
  }
}

// Animations
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

// Responsive design
@media (max-width: 768px) {
  .home {
  &__container {
      padding: $spacing-lg $spacing-sm $spacing-xl;
    }

    &__content {
      gap: $spacing-xl;
    }

    &__title {
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: 1.1rem;
      margin-bottom: $spacing-xl;
    }

    &__actions {
      flex-direction: column;
      align-items: center;
      gap: $spacing-md;
    }

    &__cta {
      width: 100%;
      max-width: 280px;
      padding: $spacing-md $spacing-lg;
      font-size: 1rem;
    }

    &__features {
      grid-template-columns: 1fr;
      gap: $spacing-lg;
      margin-top: $spacing-xl;
    }

    &__feature-card {
      padding: $spacing-lg;
    }
  }
}

@media (max-width: 480px) {
  .home {

    &__title {
      &-sub {
        font-size: 0.7em;
      }
    }

    &__description {
      font-size: 1rem;
    }

    &__cta {
      padding: $spacing-sm $spacing-md;
      font-size: 0.95rem;
    }
  }
}
</style>