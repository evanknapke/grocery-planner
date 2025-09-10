<template>
  <div class="mobile-menu" :class="{ 'mobile-menu--open': isOpen }">
    <div class="mobile-menu__overlay" @click="closeMenu"></div>
    <div class="mobile-menu__drawer">
      <ul class="mobile-menu__list">
        <li v-for="route in routes" :key="route.name" class="mobile-menu__item">
          <VButton 
            :to="route.path" 
            variant="ghost" 
            class="mobile-menu__link"
            @click="closeMenu"
          >
            {{ route.title }}
          </VButton>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import TopLevelRoutes from '@/router/TopLevelRoutes'
import VButton from '@/components/ui/VButton.vue'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const routes = TopLevelRoutes.filter(route => !route.hideFromNavigation)

const closeMenu = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.mobile-menu {
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5; // Lower than header's z-index: 10
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;

  &--open {
    pointer-events: auto;
    opacity: 1;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%);
    backdrop-filter: blur(4px);
  }

  &__drawer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    transform: translateY(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding: 2rem 1rem;
    backdrop-filter: blur(10px);
  }

  &--open &__drawer {
    transform: translateY(0);
  }

  &__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__item {
    margin: 0;
  }

  &__link {
    display: block;
    width: 100%;
    color: #374151 !important;
    text-decoration: none !important;
    font-weight: 500;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: transparent !important;
    border: none !important;
    text-align: left;
    font-size: 1.1rem;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%);
      opacity: 0;
      transition: opacity 0.2s ease;
      border-radius: 12px;
    }

    &:hover {
      color: #1f2937 !important;
      transform: translateX(8px);
      
      &::before {
        opacity: 1;
      }
    }

    &.router-link-active {
      background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%) !important;
      color: #1e40af !important;
      font-weight: 600;
      border: 1px solid rgba(37, 99, 235, 0.2);
      
      &::before {
        opacity: 1;
      }
    }
  }
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.mobile-menu--open .mobile-menu__drawer {
  animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
