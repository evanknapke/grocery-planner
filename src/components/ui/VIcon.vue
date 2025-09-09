<template>
  <svg
    :class="iconClasses"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as mdiIcons from '@mdi/js'

export interface VIconProps {
  name: string
  size?: number | string
  color?: string
  class?: string
}

const props = withDefaults(defineProps<VIconProps>(), {
  size: 24,
  color: 'currentColor',
})

const iconPath = computed(() => {
  const iconName = `mdi${props.name.charAt(0).toUpperCase() + props.name.slice(1)}`
  return (mdiIcons as any)[iconName] || ''
})

const iconClasses = computed(() => {
  const baseClasses = 'v-icon'
  const customClass = props.class || ''
  
  return [baseClasses, customClass]
    .filter(Boolean)
    .join(' ')
})
</script>

<style scoped lang="scss">
.v-icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  
  // Ensure the icon inherits the current text color by default
  color: inherit;
}
</style>
