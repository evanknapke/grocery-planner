<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li v-for="route in routes" :key="route.name" class="navigation__item">
        <router-link :to="route.path" class="navigation__link">
          {{ route.title}}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import TopLevelRoutes from '@/router/TopLevelRoutes'

const routes = TopLevelRoutes.filter(route => !route.hideFromNavigation)
</script>

<style scoped lang="scss">
.navigation {
  &__list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }

  &__item {
    margin: 0;
  }

  &__link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &.router-link-active {
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }
  }
}

// Responsive design
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
