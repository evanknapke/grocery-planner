<template>
  <div class="grocery-list">
    <div class="grocery-list__header">
      <h2 class="grocery-list__title">Grocery List</h2>
      <p class="grocery-list__description">
        Manage your current grocery list and track your shopping.
      </p>
    </div>

    <div v-if="groceryList.length === 0" class="empty-state">
      <VIcon name="cart" class="empty-state__icon" />
      <h3 class="empty-state__title">Your grocery list is empty</h3>
      <p class="empty-state__description">
        Start by searching for recipes and adding ingredients to your list.
      </p>
      <router-link to="/recipes" class="empty-state__button">
        Browse Recipes
      </router-link>
    </div>

    <div v-else class="grocery-content">
      <div class="grocery-actions">
        <VButton @click="clearList" variant="destructive">
          Clear All
        </VButton>
        <VButton @click="saveList" variant="primary">
          Save List
        </VButton>
      </div>

      <div class="grocery-items">
        <div
          v-for="group in groupedItems"
          :key="group.aisle"
          class="grocery-category"
        >
          <h3 class="grocery-category__title">{{ group.aisle }}</h3>
          <div class="grocery-category__items">
            <div
              v-for="item in group.items"
              :key="item.id"
              class="grocery-item"
              :class="{ 'grocery-item--checked': item.checked }"
            >
              <label class="grocery-item__checkbox">
                <input
                  type="checkbox"
                  :checked="item.checked"
                  @change="toggleItem(item.id)"
                />
                <span class="checkmark"></span>
              </label>
              
              <div class="grocery-item__content">
                <div class="grocery-item__name">{{ item.name }}</div>
                <div class="grocery-item__amount">
                  {{ item.amount }} {{ item.unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grocery-summary">
        <p class="summary-text">
          {{ checkedItemsCount }} of {{ groceryList.length }} items completed
        </p>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Clear Confirmation Modal -->
    <VModal
      v-model="showClearConfirmModal"
      title="Clear Grocery List"
      message="Are you sure you want to clear all items from your grocery list? This action cannot be undone."
      type="warning"
      icon="alertTriangle"
      confirm-text="Clear All"
      confirm-variant="destructive"
      cancel-text="Cancel"
      @confirm="confirmClearList"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useGroceryStore } from '@/stores/groceryStore'
import { useLoadingStore } from '@/stores/loadingStore'
import { useToastStore } from '@/stores/toastStore'
import VButton from '@/components/ui/VButton.vue'
import VIcon from '@/components/ui/VIcon.vue'
import VModal from '@/components/ui/VModal.vue'

const groceryStore = useGroceryStore()
const loadingStore = useLoadingStore()
const toastStore = useToastStore()

// Modal state (keeping only the confirmation modal)
const showClearConfirmModal = ref(false)

const groceryList = computed(() => groceryStore.groceryList)

const checkedItemsCount = computed(() => 
  groceryList.value.filter(item => item.checked).length
)

const progressPercentage = computed(() => {
  if (groceryList.value.length === 0) return 0
  return (checkedItemsCount.value / groceryList.value.length) * 100
})

// Group items by aisle
const groupedItems = computed(() => {
  const groups: { [key: string]: any[] } = {}
  
  groceryList.value.forEach(item => {
    const aisle = item.aisle || 'Other'
    if (!groups[aisle]) {
      groups[aisle] = []
    }
    groups[aisle].push(item)
  })
  
  // Sort aisles alphabetically, but put 'Other' at the end
  const sortedAisles = Object.keys(groups).sort((a, b) => {
    if (a === 'Other') return 1
    if (b === 'Other') return -1
    return a.localeCompare(b)
  })
  
  return sortedAisles.map(aisle => ({
    aisle,
    items: groups[aisle]
  }))
})

const toggleItem = (id: string) => {
  groceryStore.toggleItem(id)
}

const clearList = () => {
  showClearConfirmModal.value = true
}

const confirmClearList = () => {
  groceryStore.clearList()
  showClearConfirmModal.value = false
  toastStore.success('List Cleared', 'Grocery list cleared successfully!', 3000)
}

const saveList = async () => {
  try {
    await loadingStore.loadUntilResolved(async () => {
      return await groceryStore.saveList()
    })
    toastStore.success('Success!', 'Grocery list saved successfully!', 4000)
  } catch (error) {
    console.error('Save error:', error)
    toastStore.error('Error', 'Failed to save grocery list. Please try again.', 6000)
  }
}

onMounted(() => {
  groceryStore.loadList()
})
</script>

<style scoped lang="scss">
.grocery-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  &__header {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: $primary-color;
    font-weight: 600;
  }

  &__description {
    color: $text-secondary;
    font-size: 1.1rem;
    margin-bottom: 0;
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: $text-secondary;

  &__icon {
    width: 4rem;
    height: 4rem;
    margin-bottom: 1rem;
    color: $text-secondary;
  }

  &__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: $text-primary;
  }

  &__description {
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  &__button {
    display: inline-block;
    background-color: $primary-color;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}

.grocery-content {
  .grocery-actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .action-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &--primary {
      background-color: $primary-color;
      color: white;

      &:hover {
        background-color: darken($primary-color, 10%);
      }
    }

    &--danger {
      background-color: #f44336;
      color: white;

      &:hover {
        background-color: darken(#f44336, 10%);
      }
    }
  }
}

.grocery-items {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

.grocery-category {
  &:not(:last-child) {
    border-bottom: 2px solid #f0f0f0;
  }

  &__title {
    background-color: #f8f9fa;
    padding: 1rem 1.5rem;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: $text-primary;
    border-bottom: 1px solid #e9ecef;
    text-transform: capitalize;
  }

  &__items {
    .grocery-item:last-child {
      border-bottom: none;
    }
  }
}

.grocery-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  &--checked {
    background-color: #f0f8f0;
    opacity: 0.7;

    .grocery-item__name {
      text-decoration: line-through;
      color: $text-secondary;
    }
  }

  &__checkbox {
    position: relative;
    margin-right: 1rem;
    cursor: pointer;

    input[type="checkbox"] {
      opacity: 0;
      position: absolute;
      width: 0;
      height: 0;
    }

    .checkmark {
      display: block;
      width: 20px;
      height: 20px;
      border: 2px solid #ddd;
      border-radius: 4px;
      position: relative;
      transition: all 0.2s ease;

      &::after {
        content: '';
        position: absolute;
        left: 6px;
        top: 2px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
    }

    input[type="checkbox"]:checked + .checkmark {
      background-color: $primary-color;
      border-color: $primary-color;

      &::after {
        opacity: 1;
      }
    }
  }

  &__content {
    flex: 1;
  }

  &__name {
    font-weight: 500;
    color: $text-primary;
    margin-bottom: 0.25rem;
  }

  &__amount {
    font-size: 0.9rem;
    color: $text-secondary;
  }

}

.grocery-summary {
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  .summary-text {
    margin-bottom: 1rem;
    font-weight: 600;
    color: $text-primary;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;

    .progress-fill {
      height: 100%;
      background-color: $primary-color;
      transition: width 0.3s ease;
    }
  }
}
</style>