<template>
  <div class="saved-lists">
    <h2 class="saved-lists__title">Saved Lists</h2>
    <p class="saved-lists__description">
      View and manage your previously saved grocery lists.
    </p>

    <!-- Error state -->
    <div v-if="error" class="saved-lists__error">
      <p>{{ error }}</p>
      <VButton @click="fetchSavedLists" variant="secondary">
        Try Again
      </VButton>
    </div>

    <!-- Empty state -->
    <div v-else-if="savedLists.length === 0" class="saved-lists__empty">
      <p>No saved lists found. Create your first grocery list to get started!</p>
    </div>

    <!-- Lists display -->
    <div v-else class="saved-lists__grid">
      <div 
        v-for="list in savedLists" 
        :key="list.id" 
        class="saved-list-card"
      >
        <div class="saved-list-card__header">
          <h3 class="saved-list-card__title">{{ list.name }}</h3>
          <span class="saved-list-card__item-count">
            {{ list.items.length }} items
          </span>
        </div>
        
        <div class="saved-list-card__meta">
          <p class="saved-list-card__date">
            Saved: {{ formatDate(list.savedAt) }}
          </p>
          <p class="saved-list-card__created">
            Created: {{ formatDate(list.createdAt) }}
          </p>
        </div>

        <div class="saved-list-card__actions">
          <VButton 
            @click="loadList(list.id)" 
            variant="primary"
          >
            Load List
          </VButton>
        </div>
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
import VButton from '@/components/ui/VButton.vue'

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
    console.error('Error fetching saved lists:', err)
    error.value = err instanceof Error ? err.message : 'Failed to fetch saved lists'
  }
}

const loadList = async (listId: string) => {
  try {
    console.log('Attempting to load list with ID:', listId)
    console.log('Grocery store methods:', Object.keys(groceryStore))
    console.log('loadSavedList method exists:', typeof groceryStore.loadSavedList)
    
    if (typeof groceryStore.loadSavedList !== 'function') {
      throw new Error('loadSavedList method is not available on grocery store')
    }
    
    await loadingStore.loadUntilResolved(async () => {
      return await groceryStore.loadSavedList(listId)
    })
    // Navigate to grocery list page after successful load
    router.push('/grocery-list')
  } catch (err) {
    console.error('Error loading list:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load list'
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchSavedLists()
})
</script>

<style scoped lang="scss">
.saved-lists {
  &__title {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: $primary-color;
  }

  &__description {
    color: $text-secondary;
    margin-bottom: 2rem;
  }

  &__loading,
  &__error,
  &__empty {
    text-align: center;
    padding: 2rem;
    color: $text-secondary;
  }

  &__error {
    color: $error-color;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
}

.saved-list-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid $border-color;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
    flex: 1;
  }

  &__item-count {
    background: $primary-color;
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
    margin-left: 1rem;
  }

  &__meta {
    margin-bottom: 1.5rem;
  }

  &__date,
  &__created {
    font-size: 0.9rem;
    color: $text-secondary;
    margin: 0.25rem 0;
  }

  &__actions {
    display: flex;
    gap: 0.5rem;
  }
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &--primary {
    background: $primary-color;
    color: white;

    &:hover:not(:disabled) {
      background: darken($primary-color, 10%);
    }
  }

  &--secondary {
    background: $text-secondary;
    color: white;

    &:hover:not(:disabled) {
      background: darken($text-secondary, 10%);
    }
  }
}
</style>