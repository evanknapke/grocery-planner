<template>
  <VCard variant="elevated" class="list-card">
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
        @click="$emit('load-list', list.id)" 
        variant="primary"
        class="load-button"
        leading-icon="download"
      >
        Load List
      </VButton>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import type { GroceryList } from '@/typings/services/GroceryList'
import VButton from '@/components/ui/VButton.vue'
import VIcon from '@/components/ui/VIcon.vue'
import VCard from '@/components/ui/VCard.vue'

defineProps<{
  list: GroceryList
}>()

defineEmits<{
  'load-list': [listId: string]
}>()

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
</script>

<style scoped lang="scss">
// List Cards
.list-card {
  transition: all $transition-fast;

  &:hover {
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
