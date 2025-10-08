<template>
  <router-view />
  <VToast :toasts="toasts" @remove-toast="toastStore.removeToast" />
  
  <div v-if="loadingStore.isLoading" class="app__loading-overlay">
    <VLoadingSpinner size="lg" color="white" />
  </div>
</template>


<script setup lang="ts">
import { computed, onMounted } from 'vue'
import VToast from '@/components/ui/VToast.vue'
import VLoadingSpinner from '@/components/ui/VLoadingSpinner.vue'
import { useToastStore } from '@/stores/toastStore'
import { useLoadingStore } from '@/stores/loadingStore'
import { useAuthStore } from '@/stores/auth'

const toastStore = useToastStore()
const loadingStore = useLoadingStore()
const authStore = useAuthStore()
const toasts = computed(() => toastStore.toasts)

// Ensure user session is fetched when app mounts
// This is a backup to ensure auth state is properly loaded
onMounted(async () => {
  try {
    // Only fetch if we don't already have a user and we're not already loading
    if (!authStore.isAuthenticated && !authStore.loading) {
      await authStore.fetchUser()
    }
  } catch (error) {
    console.error('Failed to fetch user on app mount:', error)
  }
})
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
