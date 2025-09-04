<template>
  <div class="layout">
    <header class="layout__header">
      <div class="layout__header-content">
        <router-link to="/" class="layout__title">Grocery Planner</router-link>
        <MainNavigation />
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
import MainNavigation from './MainNavigation.vue'
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    background-color: $primary-color;
    color: white;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
    width: 100%;
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
        flex-direction: column;
        gap: 1rem;
      }
    }


    &__main {
      padding: 1rem;
    }
  }
}

</style>