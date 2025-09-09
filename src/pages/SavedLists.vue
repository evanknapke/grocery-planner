<template>
  <div class="saved-lists">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <VIcon name="clipboardList" class="header-icon" />
        <div class="header-text">
          <h1 class="page-title">Saved Lists</h1>
          <p class="page-description">
            View and manage your previously saved grocery lists.
          </p>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error-container">
      <div class="error-card">
        <VIcon name="alert" class="error-icon" />
        <h2>Oops! Something went wrong</h2>
        <p>{{ error }}</p>
        <VButton @click="fetchSavedLists" variant="outline" class="error-button">
          Try Again
        </VButton>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="savedLists.length === 0" class="empty-container">
      <div class="empty-card">
        <VIcon name="fileDocument" class="empty-icon" />
        <h2>No Saved Lists Yet</h2>
        <p>Create your first grocery list to get started! Your saved lists will appear here.</p>
        <VButton @click="$router.push('/grocery-list')" variant="primary" class="empty-button">
          Create New List
        </VButton>
      </div>
    </div>

    <!-- Lists Grid -->
    <div v-else class="lists-container">
      <div class="lists-grid">
        <div 
          v-for="list in savedLists" 
          :key="list.id" 
          class="list-card"
        >
          <div class="list-card-header">
            <VIcon name="cart" class="list-icon" />
            <div class="list-info">
              <h3 class="list-title">{{ list.name }}</h3>
              <div class="list-meta">
                <span class="item-count">{{ list.items.length }} items</span>
              </div>
            </div>
          </div>
          
          <div class="list-dates">
            <div class="date-item">
              <VIcon name="contentSave" class="date-icon" />
              <div class="date-content">
                <span class="date-label">Saved</span>
                <span class="date-value">{{ formatDate(list.savedAt) }}</span>
              </div>
            </div>
            <div class="date-item">
              <VIcon name="calendar" class="date-icon" />
              <div class="date-content">
                <span class="date-label">Created</span>
                <span class="date-value">{{ formatDate(list.createdAt) }}</span>
              </div>
            </div>
          </div>

          <div class="list-actions">
            <VButton 
              @click="loadList(list.id)" 
              variant="primary"
              class="load-button"
              leading-icon="download"
            >
              Load List
            </VButton>
          </div>
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
import VIcon from '@/components/ui/VIcon.vue'

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
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 2rem;
  }
}

// Page Header
.page-header {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 0 3rem;

  @media (max-width: 768px) {
    padding: 1rem 0 2rem;
  }
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;

  .header-icon {
    width: 2.5rem;
    height: 2.5rem;
    color: $primary-color;
    flex-shrink: 0;
  }

  .header-text {
    .page-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      color: $text-primary;
      background: linear-gradient(135deg, $text-primary, $primary-color);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .page-description {
      font-size: 1.1rem;
      color: $text-secondary;
      margin: 0;
      line-height: 1.6;
    }
  }
}

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
  background: $surface;
  border-radius: $border-radius-lg;
  padding: 3rem;
  text-align: center;
  box-shadow: $shadow-xl;
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

// Empty State
.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  max-width: 1400px;
  margin: 0 auto;
}

.empty-card {
  background: $surface;
  border-radius: $border-radius-lg;
  padding: 3rem;
  text-align: center;
  box-shadow: $shadow-xl;
  max-width: 500px;
  width: 100%;

  .empty-icon {
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
    color: $primary-color;
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

  .empty-button {
    margin-top: 1rem;
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

// List Cards
.list-card {
  background: $surface;
  border-radius: $border-radius-lg;
  padding: 2rem;
  box-shadow: $shadow-md;
  border: 1px solid $border;
  transition: all $transition-fast;

  &:hover {
    box-shadow: $shadow-lg;
    transform: translateY(-4px);
  }
}

.list-card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;

  .list-icon {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
    color: $primary-color;
  }

  .list-info {
    flex: 1;

    .list-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: $text-primary;
      margin: 0 0 0.5rem 0;
      line-height: 1.3;
    }

    .list-meta {
      .item-count {
        background: linear-gradient(135deg, $primary-color, $primary-dark);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: $border-radius-md;
        font-size: 0.875rem;
        font-weight: 500;
      }
    }
  }
}

.list-dates {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.date-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-radius: $border-radius-md;
  border: 1px solid $border;

  .date-icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    color: $text-secondary;
  }

  .date-content {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;

    .date-label {
      font-size: 0.75rem;
      color: $text-secondary;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .date-value {
      font-size: 0.9rem;
      color: $text-primary;
      font-weight: 500;
    }
  }
}

.list-actions {
  .load-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;

    .button-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }
  }
}

@media (max-width: 768px) {
  .list-card {
    padding: 1.5rem;
  }
  
  .list-card-header {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
    
    .list-icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    
    .list-info .list-title {
      font-size: 1.125rem;
    }
  }
  
  .list-dates {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  
  .date-item {
    padding: 0.5rem;
    gap: 0.5rem;
  }
}
</style>