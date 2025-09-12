<template>
  <div class="error-container">
    <VCard variant="elevated" class="error-card">
      <VIcon name="alert" class="error-icon" />
      <h2>{{ title }}</h2>
      <p>{{ message }}</p>
      <VButton @click="$emit('action')" :variant="buttonVariant" class="error-button">
        {{ buttonText }}
      </VButton>
    </VCard>
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import VIcon from '@/components/ui/VIcon.vue'
import VCard from '@/components/ui/VCard.vue'

withDefaults(defineProps<{
  message: string
  title?: string
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}>(), {
  title: 'Oops! Something went wrong',
  buttonText: 'Try Again',
  buttonVariant: 'outline'
})

defineEmits<{
  action: []
}>()
</script>

<style scoped lang="scss">
// Error State
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  max-width: 1400px;
  margin: 0 auto;
}

.error-card {
  text-align: center;
  max-width: 500px;
  width: 100%;

  .error-icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    color: #ef4444;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: $text-primary;
    margin-bottom: 1rem;
  }

  p {
    color: $text-secondary;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .error-button {
    margin-top: 1rem;
  }
}
</style>
