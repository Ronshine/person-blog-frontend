<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'

const store = useBlogStore()
const { archives, loading } = storeToRefs(store)

onMounted(async () => {
  await Promise.all([
    store.loadBlogInfo(),
    store.loadArchives(),
    store.loadTags(),
  ])
})

/** 统计总文章数 */
const totalPosts = computed(() =>
  archives.value.reduce((sum, group) => sum + group.posts.length, 0)
)
</script>

<template>
  <div class="archives-page">
    <header class="page-header">
      <h1>📚 归档</h1>
      <p class="page-desc">共 {{ totalPosts }} 篇文章</p>
    </header>

    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>

    <div v-else-if="archives.length === 0" class="empty-state">
      <p>暂无文章</p>
    </div>

    <div v-else class="timeline">
      <div
        v-for="group in archives"
        :key="`${group.year}-${group.month}`"
        class="archive-group"
      >
        <h2 class="archive-month">
          {{ group.year }} 年 {{ group.month }} 月
          <span class="archive-count">{{ group.posts.length }} 篇</span>
        </h2>
        <ul class="archive-list">
          <li
            v-for="post in group.posts"
            :key="post.id"
            class="archive-item"
          >
            <span class="item-date">
              {{ new Date(post.createdAt).toLocaleDateString('zh-CN', { day: 'numeric' }) }}日
            </span>
            <router-link :to="`/post/${post.slug}`" class="item-title">
              {{ post.title }}
            </router-link>
            <span class="item-category">{{ post.category.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archives-page {
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

/* 时间线 */
.archive-group {
  margin-bottom: 40px;
}

.archive-month {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.archive-count {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-tertiary);
  background: var(--bg-muted);
  padding: 2px 10px;
  border-radius: 10px;
}

.archive-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border-left: 2px solid var(--border);
  margin-left: 12px;
}

.archive-item {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 12px 20px;
  position: relative;
  transition: background 0.2s;
  border-radius: 0 8px 8px 0;
}

.archive-item::before {
  content: '';
  position: absolute;
  left: -7px;
  top: 20px;
  width: 12px;
  height: 12px;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 50%;
  transition: all 0.2s;
}

.archive-item:hover {
  background: var(--bg-muted);
}

.archive-item:hover::before {
  border-color: var(--accent);
  background: var(--accent);
}

.item-date {
  font-size: 0.82rem;
  color: var(--text-tertiary);
  white-space: nowrap;
  min-width: 40px;
}

.item-title {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.95rem;
  flex: 1;
  transition: color 0.2s;
}

.archive-item:hover .item-title {
  color: var(--accent);
}

.item-category {
  font-size: 0.78rem;
  color: var(--accent);
  background: var(--accent-bg);
  padding: 2px 10px;
  border-radius: 10px;
  white-space: nowrap;
}

/* 加载 */
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

@media (max-width: 640px) {
  .archive-item {
    flex-wrap: wrap;
    gap: 8px;
  }
  .item-date {
    min-width: auto;
  }
}
</style>
