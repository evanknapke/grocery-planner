<template>
  <router-view />
  <VToast :toasts="toasts" @remove-toast="toastStore.removeToast" />
</template>


<script setup lang="ts">
import { computed } from 'vue'
import VToast from '@/components/ui/VToast.vue'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)
</script>

<style scoped></style>
