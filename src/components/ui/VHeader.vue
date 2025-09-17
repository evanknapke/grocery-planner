<template>
  <div class="v-header">
    <div class="v-header__content">
      <div class="v-header__main">
        <VIcon :name="icon" class="v-header__icon" />
        <div class="v-header__text">
          <h1 class="v-header__title">{{ title }}</h1>
          <p class="v-header__description">{{ description }}</p>
        </div>
      </div>
      <div v-if="$slots.actions" class="v-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VIcon from '@/components/ui/VIcon.vue'
import type { VHeaderProps } from './typings/VHeaderProps'

defineProps<VHeaderProps>()
</script>

<style scoped lang="scss">
.v-header {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 0 3rem;

  @media (max-width: 768px) {
    padding: 1rem 0 2rem;
  }
}

.v-header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

.v-header__main {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.v-header__icon {
  width: 2.5rem;
  height: 2.5rem;
  color: $primary-color;
  flex-shrink: 0;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    margin-top: 0.2rem;
  }
}

.v-header__text {
  .v-header__title {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
    color: $text-primary;
    background: linear-gradient(135deg, $text-primary, $primary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.75rem;
    }
  }

  .v-header__description {
    font-size: 1.1rem;
    color: $text-secondary;
    margin: 0;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
}

.v-header__actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-shrink: 0;

  @media (max-width: 768px) {
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
}
</style>
