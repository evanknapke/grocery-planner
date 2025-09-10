<template>
  <div class="layout">
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
          © {{ currentYear }} <a href="https://knapkesoftware.com" target="_blank" rel="noopener noreferrer" class="layout__footer-link">Knapke Software LLC</a>
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MainNavigation from '../navigation/MainNavigation.vue'

const mainNavigation = ref<InstanceType<typeof MainNavigation> | null>(null)

const currentYear = computed(() => new Date().getFullYear())

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
  background: linear-gradient(135deg, 
    rgba(37, 99, 235, 0.05) 0%, 
    rgba(14, 165, 233, 0.08) 25%, 
    rgba(6, 182, 212, 0.06) 50%, 
    rgba(37, 99, 235, 0.04) 75%, 
    rgba(14, 165, 233, 0.07) 100%),
    linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
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
  }

  &__footer {
    background: linear-gradient(135deg, rgba(248, 250, 252, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%);
    border-top: 1px solid rgba(226, 232, 240, 0.6);
    padding: $spacing-lg 0;
    margin-top: auto;
    backdrop-filter: blur(8px);
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.2) 50%, transparent 100%);
    }

    &-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 $spacing-md;
      text-align: center;
    }

    &-text {
      margin: 0;
      color: $text-secondary;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.025em;
    }

    &-link {
      color: inherit;
      text-decoration: none;
      font-weight: inherit;
      cursor: pointer;
      transition: opacity $transition-fast;
      position: relative;
      display: inline;

      &:hover {
        opacity: 0.7;
        text-decoration: none;
      }

      &:focus {
        outline: 2px solid rgba(37, 99, 235, 0.3);
        outline-offset: 2px;
        border-radius: 2px;
      }

      &:active {
        opacity: 0.5;
      }
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