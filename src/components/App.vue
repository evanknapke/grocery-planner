<template>
  <router-view />
  <VToast :toasts="toasts" @remove-toast="toastStore.removeToast" />
  
  <div v-if="loadingStore.isLoading" class="app__loading-overlay">
    <VLoadingSpinner size="lg" color="white" />
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import VToast from '@/components/ui/VToast.vue'
import VLoadingSpinner from '@/components/ui/VLoadingSpinner.vue'
import { useToastStore } from '@/stores/toastStore'
import { useLoadingStore } from '@/stores/loadingStore'

const toastStore = useToastStore()
const loadingStore = useLoadingStore()
const toasts = computed(() => toastStore.toasts)
</script>

<style scoped lang="scss">
.app__loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
</style>
