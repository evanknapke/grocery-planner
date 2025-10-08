import type { RouteRecordRaw } from 'vue-router'

export type RouteRecord = RouteRecordRaw & {
  title: string
  hideFromNavigation?: boolean
  requiresAuth?: boolean
  meta?: {
    requiresAuth?: boolean
  }
}