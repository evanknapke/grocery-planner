<template>
  <div class="grocery-list">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <VIcon name="cart" class="header-icon" />
        <div class="header-text">
          <h1 class="page-title">Grocery List</h1>
          <p class="page-description">
            Manage your current grocery list and track your shopping progress.
          </p>
        </div>
        <div v-if="groceryList.length > 0" class="header-actions">
          <VButton @click="clearList" variant="destructive" leading-icon="delete" size="sm">
            Clear All
          </VButton>
          <VButton @click="saveList" variant="primary" leading-icon="contentSave" size="sm">
            Save List
          </VButton>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="groceryList.length === 0" class="empty-container">
      <div class="empty-card">
        <VIcon name="cart" class="empty-icon" />
        <h2>Your grocery list is empty</h2>
        <p>Start by searching for recipes and adding ingredients to your list.</p>
        <VButton to="/recipes" variant="primary" class="empty-button">
          Browse Recipes
        </VButton>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="grocery-content">
      <!-- Grocery Items -->
      <div class="grocery-items">
        <div
          v-for="group in groupedItems"
          :key="group.aisle"
          class="grocery-category"
        >
          <div class="grocery-category-header">
            <h3 class="grocery-category-title">{{ group.aisle }}</h3>
            <span class="category-count">{{ group.items.length }} items</span>
          </div>
          
          <div class="grocery-category-items">
            <div
              v-for="item in group.items"
              :key="item.id"
              class="grocery-item"
              :class="{ 'grocery-item--checked': item.checked }"
            >
              <label class="grocery-item-checkbox">
                <input
                  type="checkbox"
                  :checked="item.checked"
                  @change="toggleItem(item.id)"
                />
                <span class="checkmark"></span>
              </label>
              
              <div class="grocery-item-content">
                <div class="grocery-item-name">{{ item.name }}</div>
                <div class="grocery-item-amount">
                  {{ item.amount }} {{ item.unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Summary -->
      <div class="grocery-summary">
        <div class="summary-header">
          <VIcon name="checkCircle" class="summary-icon" />
          <h3 class="summary-title">Shopping Progress</h3>
        </div>
        <p class="summary-text">
          {{ checkedItemsCount }} of {{ groceryList.length }} items completed
        </p>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        <div class="progress-percentage">{{ Math.round(progressPercentage) }}%</div>
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
    toastStore.error('Error', 'Failed to save grocery list. Please try again.', 6000)
  }
}

onMounted(() => {
  groceryStore.loadList()
})
</script>

<style scoped lang="scss">
.grocery-list {
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
  justify-content: space-between;
  gap: 1rem;

  .header-icon {
    width: 2.5rem;
    height: 2.5rem;
    color: $primary-color;
    flex-shrink: 0;
  }

  .header-text {
    flex: 1;

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

  .header-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-shrink: 0;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.5rem;
    }
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

// Main Content
.grocery-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}


// Grocery Items
.grocery-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grocery-category {
  background: $surface;
  border-radius: $border-radius-lg;
  box-shadow: $shadow-md;
  border: 1px solid $border;
  overflow: hidden;
  transition: all $transition-fast;

  &:hover {
    box-shadow: $shadow-lg;
  }
}

.grocery-category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  border-bottom: 1px solid $border;

  .grocery-category-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
    text-transform: capitalize;
  }

  .category-count {
    background: linear-gradient(135deg, $primary-color, $primary-dark);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: $border-radius-md;
    font-size: 0.875rem;
    font-weight: 500;
  }
}

.grocery-category-items {
  .grocery-item:last-child {
    border-bottom: none;
  }
}

.grocery-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid $border;
  transition: all $transition-fast;

  &:hover {
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  }

  &--checked {
    background: linear-gradient(135deg, #f0fdf4, #dcfce7);
    opacity: 0.8;

    .grocery-item-name {
      text-decoration: line-through;
      color: $text-secondary;
    }

    .grocery-item-amount {
      color: $text-secondary;
    }
  }
}

.grocery-item-checkbox {
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
    border: 2px solid $border;
    border-radius: $border-radius-sm;
    position: relative;
    transition: all $transition-fast;
    background: $surface;

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
      transition: opacity $transition-fast;
    }
  }

  input[type="checkbox"]:checked + .checkmark {
    background: linear-gradient(135deg, $primary-color, $primary-dark);
    border-color: $primary-color;

    &::after {
      opacity: 1;
    }
  }
}

.grocery-item-content {
  flex: 1;
}

.grocery-item-name {
  font-weight: 500;
  color: $text-primary;
  margin-bottom: 0.25rem;
  font-size: 1rem;
}

.grocery-item-amount {
  font-size: 0.875rem;
  color: $text-secondary;
  font-weight: 500;
}

// Progress Summary
.grocery-summary {
  background: $surface;
  border-radius: $border-radius-lg;
  padding: 2rem;
  box-shadow: $shadow-md;
  border: 1px solid $border;
  text-align: center;
}

.summary-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  .summary-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: $primary-color;
  }

  .summary-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: $text-primary;
    margin: 0;
  }
}

.summary-text {
  margin-bottom: 1.5rem;
  font-weight: 500;
  color: $text-primary;
  font-size: 1rem;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
  border-radius: $border-radius-md;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  .progress-fill {
    height: 100%;
    background: linear-gradient(135deg, $primary-color, $primary-dark);
    transition: width $transition-normal;
    border-radius: $border-radius-md;
  }
}

.progress-percentage {
  font-size: 1.125rem;
  font-weight: 600;
  color: $primary-color;
}

// Responsive Design
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;

    .header-actions {
      width: 100%;
      justify-content: center;
      flex-direction: row;
    }
  }

  .grocery-category-header {
    padding: 1rem;
    gap: 0.5rem;

    .grocery-category-title {
      font-size: 1rem;
    }

    .category-count {
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
    }
  }

  .grocery-item {
    padding: 0.875rem 1rem;
  }

  .grocery-item-name {
    font-size: 0.95rem;
  }

  .grocery-item-amount {
    font-size: 0.8rem;
  }

  .grocery-summary {
    padding: 1.5rem;
  }

  .summary-header {
    .summary-title {
      font-size: 1.125rem;
    }
  }
}
</style>