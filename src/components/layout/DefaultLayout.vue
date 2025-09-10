<template>
  <div class="layout">
    <!-- Background gradient overlay -->
    <div class="layout__background"></div>
    
    <header class="layout__header">
      <div class="layout__header-content">
        <router-link to="/" class="layout__title" @click="closeMobileMenu">Grocery Planner</router-link>
        <MainNavigation ref="mainNavigation" />
      </div>
    </header>

    <main class="layout__main">
      <router-view />
    </main>

    <footer class="layout__footer">
      <div class="layout__footer-content">
        <p class="layout__footer-text">
          © 2025 Knapke Software LLC
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainNavigation from '../navigation/MainNavigation.vue'

const mainNavigation = ref<InstanceType<typeof MainNavigation> | null>(null)

const closeMobileMenu = () => {
  if (mainNavigation.value) {
    mainNavigation.value.closeMobileMenu()
  }
}
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;

  &__header {
    background-color: $primary-color;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;

    &-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: white;
    text-decoration: none;
    transition: opacity 0.2s ease;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }


  &__main {
    flex: 1;
    width: 100%;
    position: relative;
    z-index: 2;
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(37, 99, 235, 0.05) 0%, 
      rgba(14, 165, 233, 0.08) 25%, 
      rgba(6, 182, 212, 0.06) 50%, 
      rgba(37, 99, 235, 0.04) 75%, 
      rgba(14, 165, 233, 0.07) 100%);
    z-index: 1;
  }

  &__footer {
    background-color: $background;
    border-top: 1px solid $border;
    padding: 1rem 0;
    margin-top: auto;

    &-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      text-align: center;
    }

    &-text {
      margin: 0;
      color: $text-secondary;
      font-size: 0.875rem;
    }
  }

}

// Responsive design
@media (max-width: 768px) {
  .layout {
    &__header {
      &-content {
        // Keep horizontal layout for mobile to maintain title and hamburger in same row
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}

</style>