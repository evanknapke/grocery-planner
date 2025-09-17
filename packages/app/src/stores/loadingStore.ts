import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const activePromises = ref<Promise<unknown>[]>([])

  const isLoading = computed(() => activePromises.value.length > 0)

  const addPromise = (promise: Promise<unknown>) => {
    activePromises.value.push(promise)
    
    promise.finally(() => {
      const index = activePromises.value.indexOf(promise)
      if (index > -1) {
        activePromises.value.splice(index, 1)
      }
    })
    
    return promise
  }

  const loadUntilResolved = async <T>(asyncFn: () => Promise<T>): Promise<T> => {
    const promise = asyncFn()
    addPromise(promise)
    return promise
  }

  const clearAll = () => {
    activePromises.value = []
  }

  return {
    isLoading,
    loadUntilResolved,
    clearAll
  }
})
