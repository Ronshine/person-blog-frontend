<script setup lang="ts">
import type { Pagination as PaginationType } from '@/api/types'

const props = defineProps<{
  pagination: PaginationType
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const pages = computed(() => {
  const { page, totalPages } = props.pagination
  const delta = 2
  const range: (number | string)[] = []

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
      range.push(i)
    } else if (range[range.length - 1] !== '...') {
      range.push('...')
    }
  }

  return range
})

import { computed } from 'vue'

function goTo(page: number) {
  if (page >= 1 && page <= props.pagination.totalPages && page !== props.pagination.page) {
    emit('page-change', page)
  }
}
</script>

<template>
  <nav v-if="pagination.totalPages > 1" class="pagination">
    <button
      class="page-btn"
      :disabled="pagination.page === 1"
      @click="goTo(pagination.page - 1)"
    >
      ← 上一页
    </button>

    <div class="page-numbers">
      <template v-for="p in pages" :key="p">
        <button
          v-if="typeof p === 'number'"
          :class="['page-num', { active: p === pagination.page }]"
          @click="goTo(p)"
        >
          {{ p }}
        </button>
        <span v-else class="page-ellipsis">⋯</span>
      </template>
    </div>

    <button
      class="page-btn"
      :disabled="pagination.page === pagination.totalPages"
      @click="goTo(pagination.page + 1)"
    >
      下一页 →
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 48px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 8px 18px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-num {
  width: 36px;
  height: 36px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-num:hover {
  border-color: var(--border);
  background: var(--bg-muted);
}

.page-num.active {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  font-weight: 600;
}

.page-ellipsis {
  padding: 0 4px;
  color: var(--text-tertiary);
}
</style>
