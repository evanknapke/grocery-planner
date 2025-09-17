<template>
  <div class="saved-lists">
    <VHeader
      icon="clipboardList"
      title="Saved Lists"
      description="View and manage your previously saved grocery lists."
    />

    <ErrorCard 
      v-if="error" 
      :message="error" 
      @action="fetchSavedLists" 
    />

    <SavedListsEmpty 
      v-else-if="savedLists.length === 0" 
      @create-list="$router.push('/grocery-list')" 
    />

    <div v-else class="lists-container">
      <div class="lists-grid">
        <SavedListCard 
          v-for="list in savedLists" 
          :key="list.id" 
          :list="list"
          @load-list="loadList"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { groceryListsService } from '@/services/groceryListsService'
import { useGroceryStore } from '@/stores/groceryStore'
import { useLoadingStore } from '@/stores/loadingStore'
import type { GroceryList } from '@/typings/services/GroceryList'
import { VHeader } from '@grocery-planner/design-system'
import ErrorCard from '@/components/common/ErrorCard.vue'
import SavedListCard from '@/components/savedLists/SavedListCard.vue'
import SavedListsEmpty from '@/components/savedLists/SavedListsEmpty.vue'

const router = useRouter()
const groceryStore = useGroceryStore()
const loadingStore = useLoadingStore()

const savedLists = ref<GroceryList[]>([])
const error = ref<string | null>(null)

const fetchSavedLists = async () => {
  error.value = null
  
  try {
    await loadingStore.loadUntilResolved(async () => {
      const response = await groceryListsService.getGroceryLists()
      
      if (response.success && response.data) {
        savedLists.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch saved lists')
      }
    })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch saved lists'
  }
}

const loadList = async (listId: string) => {
  try {
    if (typeof groceryStore.loadSavedList !== 'function') {
      throw new Error('loadSavedList method is not available on grocery store')
    }
    
    await loadingStore.loadUntilResolved(async () => {
      return await groceryStore.loadSavedList(listId)
    })
    // Navigate to grocery list page after successful load
    router.push('/grocery-list')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load list'
  }
}


onMounted(() => {
  fetchSavedLists()
})
</script>

<style scoped lang="scss">
.saved-lists {
  min-height: 100vh;
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
  }
}

// Lists Container
.lists-container {
  max-width: 1400px;
  margin: 0 auto;
}

.lists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>