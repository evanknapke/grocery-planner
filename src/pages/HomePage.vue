<template>
  <div class="home">
    <div class="home__content">
      <h1 class="home__title">Welcome to Grocery Planner</h1>
      <p class="home__description">
        Simplify your meal planning and grocery shopping experience. Discover delicious recipes, 
        create organized grocery lists, and save time in the kitchen.
      </p>
      <div class="home__actions">
        <router-link to="/recipes" class="btn btn-primary home__cta">
          Browse Recipes
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.home {
  min-height: calc(100vh - 120px); // Account for header height
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl $spacing-md;

  &__content {
    text-align: center;
    max-width: 600px;
    width: 100%;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: $spacing-lg;
    color: $primary-color;
    line-height: 1.2;
  }

  &__description {
    font-size: 1.2rem;
    color: $text-secondary;
    margin-bottom: $spacing-xl;
    line-height: 1.6;
  }

  &__actions {
    margin-top: $spacing-xl;
  }

  &__cta {
    font-size: 1.1rem;
    padding: $spacing-md $spacing-xl;
    border-radius: $border-radius-md;
    text-decoration: none;
    display: inline-block;
    min-width: 180px;
  }
}

// Responsive design
@media (max-width: 768px) {
  .home {
    padding: $spacing-lg $spacing-sm;
    min-height: calc(100vh - 100px);

    &__title {
      font-size: 2rem;
      margin-bottom: $spacing-md;
    }

    &__description {
      font-size: 1.1rem;
      margin-bottom: $spacing-lg;
    }

    &__cta {
      font-size: 1rem;
      padding: $spacing-sm $spacing-lg;
      min-width: 160px;
    }
  }
}

@media (max-width: 480px) {
  .home {
    &__title {
      font-size: 1.75rem;
    }

    &__description {
      font-size: 1rem;
    }
  }
}
</style>