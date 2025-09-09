<template>
  <div class="recipe-header">
    <div class="recipe-hero">
      <div class="recipe-content">
        <div class="recipe-info">
          <h1 class="recipe-title">{{ recipe.title }}</h1>
          
          <div class="recipe-meta-grid">
            <div class="meta-card">
              <div class="meta-icon">⏱️</div>
              <div class="meta-content">
                <span class="meta-label">Ready in</span>
                <span class="meta-value">{{ recipe.readyInMinutes }} min</span>
              </div>
            </div>
            
            <div class="meta-card">
              <div class="meta-icon">👥</div>
              <div class="meta-content">
                <span class="meta-label">Serves</span>
                <span class="meta-value">{{ recipe.servings }}</span>
              </div>
            </div>
            
            <div class="meta-card" v-if="recipe.preparationMinutes">
              <div class="meta-icon">🔪</div>
              <div class="meta-content">
                <span class="meta-label">Prep</span>
                <span class="meta-value">{{ recipe.preparationMinutes }} min</span>
              </div>
            </div>
            
            <div class="meta-card" v-if="recipe.cookingMinutes">
              <div class="meta-icon">🔥</div>
              <div class="meta-content">
                <span class="meta-label">Cook</span>
                <span class="meta-value">{{ recipe.cookingMinutes }} min</span>
              </div>
            </div>
          </div>
          
          <div class="recipe-tags" v-if="recipe.cuisines && recipe.cuisines.length > 0">
            <span
              v-for="cuisine in recipe.cuisines"
              :key="cuisine"
              class="tag cuisine-tag"
            >
              {{ cuisine }}
            </span>
          </div>
        </div>
        
        <div class="recipe-image-container">
          <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
          <div class="image-overlay"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipeDetails } from '@/typings/services/RecipeDetails'

defineProps<{
  recipe: RecipeDetails
}>()
</script>

<style scoped lang="scss">
.recipe-header {
  margin-bottom: 3rem;
}

.recipe-hero {
  background: $surface;
  border-radius: $border-radius-lg;
  overflow: hidden;
  box-shadow: $shadow-lg;
}

.recipe-content {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.recipe-info {
  padding: 2rem;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}


.recipe-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: $text-primary;
  line-height: 1.2;
  background: linear-gradient(135deg, $text-primary, $primary-color);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.875rem;
    margin-bottom: 1.25rem;
  }
}

.recipe-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
}

.meta-card {
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border: 1px solid $border;
  border-radius: $border-radius-md;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all $transition-fast;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
    border-color: $primary-color;
  }

  .meta-icon {
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .meta-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    .meta-label {
      font-size: 0.75rem;
      color: $text-secondary;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .meta-value {
      font-size: 1rem;
      color: $text-primary;
      font-weight: 600;
    }
  }
}

.recipe-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  .tag {
    padding: 0.5rem 1rem;
    border-radius: $border-radius-md;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all $transition-fast;

    &.cuisine-tag {
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      color: #92400e;
      border: 1px solid #fbbf24;

      &:hover {
        background: linear-gradient(135deg, #fde68a, #fbbf24);
        transform: translateY(-1px);
      }
    }
  }
}

.recipe-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: $border-radius-md;
  margin: 2rem 2rem 2rem 0;

  @media (max-width: 1024px) {
    height: 250px;
    margin: 0 2rem 2rem 2rem;
  }

  @media (max-width: 768px) {
    height: 200px;
    margin: 0 1.5rem 1.5rem 1.5rem;
  }

  .recipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform $transition-slow;
    filter: brightness(0.95) contrast(1.05);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.05) 0%,
      rgba(0, 0, 0, 0.15) 100%
    );
  }

  &:hover .recipe-image {
    transform: scale(1.05);
  }
}
</style>
