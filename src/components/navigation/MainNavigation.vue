<template>
  <nav class="navigation">
    <ul class="navigation__list navigation__list--desktop">
      <li v-for="route in routes" :key="route.name" class="navigation__item">
        <VButton 
          :to="route.path" 
          variant="ghost" 
          class="navigation__link"
        >
          {{ route.title}}
        </VButton>
      </li>
    </ul>

    <!-- Mobile Hamburger Button -->
    <button 
      class="navigation__hamburger"
      @click="toggleMobileMenu"
      :class="{ 'navigation__hamburger--open': isMobileMenuOpen }"
      aria-label="Toggle mobile menu"
    >
      <span class="navigation__hamburger-line"></span>
      <span class="navigation__hamburger-line"></span>
      <span class="navigation__hamburger-line"></span>
    </button>

    <MobileMenu 
      :is-open="isMobileMenuOpen" 
      @close="closeMobileMenu" 
    />
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TopLevelRoutes from '@/router/TopLevelRoutes'
import VButton from '@/components/ui/VButton.vue'
import MobileMenu from './MobileMenu.vue'

const routes = TopLevelRoutes.filter(route => !route.hideFromNavigation)

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

defineExpose({
  closeMobileMenu
})
</script>

<style scoped lang="scss">
.navigation {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  &__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;

    &--desktop {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  &__item {
    margin: 0;
  }

  &__link {
    color: white !important;
    text-decoration: none !important;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    background-color: transparent !important;
    border: none !important;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
      color: white !important;
    }

    &.router-link-active {
      background-color: rgba(255, 255, 255, 0.2) !important;
      font-weight: 600;
      color: white !important;
    }
  }

  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 15; // Higher than header (10) and mobile menu (5)
    position: relative;

    @media (max-width: 768px) {
      display: flex;
    }

    &:focus {
      outline: 2px solid rgba(255, 255, 255, 0.5);
      outline-offset: 2px;
    }
  }

  &__hamburger-line {
    width: 2rem;
    height: 0.25rem;
    background: white;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
  }

  // Hamburger to X animation
  &__hamburger--open {
    .navigation__hamburger-line {
      &:first-child {
        transform: rotate(45deg);
      }

      &:nth-child(2) {
        opacity: 0;
        transform: translateX(20px);
      }

      &:nth-child(3) {
        transform: rotate(-45deg);
      }
    }
  }
}

@media (max-width: 768px) {
  .navigation {
    &__list {
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .navigation {
    &__list {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
  }
}
</style>
