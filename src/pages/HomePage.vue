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
            <router-link to="/recipes" class="home__cta home__cta--primary">
              <span>Explore Recipes</span>
              <svg class="home__cta-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </router-link>
            
            <router-link to="/saved-lists" class="home__cta home__cta--secondary">
              <span>View Saved Lists</span>
        </router-link>
          </div>
        </div>
        
        <!-- Feature cards -->
        <div class="home__features">
          <div class="home__feature-card">
            <div class="home__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"/>
                <path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"/>
              </svg>
            </div>
            <h3 class="home__feature-title">Smart Planning</h3>
            <p class="home__feature-description">AI-powered meal suggestions based on your preferences and dietary needs.</p>
          </div>
          
          <div class="home__feature-card">
            <div class="home__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"/>
              </svg>
            </div>
            <h3 class="home__feature-title">Organized Lists</h3>
            <p class="home__feature-description">Automatically categorized grocery lists that make shopping efficient and stress-free.</p>
          </div>
          
          <div class="home__feature-card">
            <div class="home__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3 class="home__feature-title">Recipe Discovery</h3>
            <p class="home__feature-description">Explore thousands of recipes with detailed instructions and nutritional information.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
    flex-wrap: wrap;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-lg $spacing-xl;
    border-radius: $border-radius-lg;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all $transition-normal;
    position: relative;
    overflow: hidden;
    min-width: 200px;
    justify-content: center;

    &--primary {
      background: linear-gradient(135deg, $primary-color, $primary-dark);
      color: white;
      box-shadow: $shadow-lg;

      &:hover {
        transform: translateY(-2px);
        box-shadow: $shadow-xl;
        background: linear-gradient(135deg, $primary-dark, darken($primary-dark, 10%));
      }

      &:active {
        transform: translateY(0);
      }
    }

    &--secondary {
      background: $surface;
      color: $primary-color;
      border: 2px solid $primary-color;
      box-shadow: $shadow-md;

      &:hover {
        background: $primary-color;
        color: white;
        transform: translateY(-2px);
        box-shadow: $shadow-lg;
      }
    }

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