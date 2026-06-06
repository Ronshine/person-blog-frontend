<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'
import TagChip from '@/components/TagChip.vue'

const store = useBlogStore()
const { tags, loading } = storeToRefs(store)

onMounted(async () => {
  await Promise.all([
    store.loadBlogInfo(),
    store.loadTags(),
  ])
})

const totalTags = computed(() => tags.value.length)
const totalTagPosts = computed(() =>
  tags.value.reduce((sum, t) => sum + t.count, 0)
)
</script>

<template>
  <div class="tags-page">
    <header class="page-header">
      <h1>🏷️ 标签</h1>
      <p class="page-desc">共 {{ totalTags }} 个标签 · {{ totalTagPosts }} 篇文章</p>
    </header>

    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="tags.length === 0" class="empty-state">
      <p>暂无标签</p>
    </div>

    <div v-else class="tag-cloud-container">
      <TagChip
        v-for="tag in tags"
        :key="tag.id"
        :name="tag.name"
        :count="tag.count"
        :size="tag.count >= 2 ? 'lg' : 'md'"
      />
    </div>
  </div>
</template>

<style scoped>
.tags-page {
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-desc {
  color: var(--text-tertiary);
  font-size: 0.95rem;
}

.tag-cloud-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--text-tertiary);
}
</style>
