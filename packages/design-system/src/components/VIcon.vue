<template>
  <svg
    :class="iconClasses"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    :fill="props.fill ? 'currentColor' : 'none'"
    :stroke="props.fill ? 'none' : 'currentColor'"
    :stroke-width="props.fill ? '0' : '1.5'"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as mdiIcons from '@mdi/js'
import type { VIconProps } from './typings/VIconProps'

const props = withDefaults(defineProps<VIconProps>(), {
  size: 24,
  color: 'currentColor',
  fill: true,
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
  color: inherit;
}
</style>
