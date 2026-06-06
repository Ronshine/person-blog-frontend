<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'
import PostCard from '@/components/PostCard.vue'
import Sidebar from '@/components/Sidebar.vue'
import Pagination from '@/components/Pagination.vue'

const route = useRoute()
const store = useBlogStore()
const { posts, loading, pagination } = storeToRefs(store)

async function loadData(page = 1) {
  const tag = route.query.tag as string | undefined
  const search = route.query.search as string | undefined
  const category = route.query.category as string | undefined

  if (tag) {
    await store.loadPostsByTag(tag)
  } else if (category) {
    await store.loadPostsByCategory(category)
  } else if (search) {
    await store.searchPosts(search)
  } else {
    await store.loadPosts(page)
  }
}

onMounted(async () => {
  await Promise.all([
    store.loadBlogInfo(),
    store.loadTags(),
    loadData(),
  ])
})

watch(
  () => route.query,
  () => loadData()
)

function onPageChange(page: number) {
  loadData(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="home-layout">
    <main class="main-content">
      <!-- 搜索结果提示 -->
      <div v-if="route.query.search" class="result-info">
        <h2>搜索结果：<em>"{{ route.query.search }}"</em></h2>
        <p v-if="!loading && posts.length === 0">没有找到相关文章 😅</p>
      </div>
      <div v-else-if="route.query.tag" class="result-info">
        <h2>标签：<em>#{{ route.query.tag }}</em></h2>
      </div>
      <div v-else-if="route.query.category" class="result-info">
        <h2>分类：<em>{{ route.query.category }}</em></h2>
      </div>

      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <!-- 文章列表 -->
      <div v-else-if="posts.length > 0" class="post-grid">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <p class="empty-icon">📭</p>
        <p>暂无文章</p>
      </div>

      <!-- 分页 -->
      <Pagination
        v-if="pagination && posts.length > 0"
        :pagination="pagination"
        @page-change="onPageChange"
      />
    </main>

    <aside class="sidebar-wrapper">
      <Sidebar />
    </aside>
  </div>
</template>

<style scoped>
.home-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 40px;
  align-items: start;
}

.result-info {
  margin-bottom: 32px;
}

.result-info h2 {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
}

.result-info h2 em {
  font-style: normal;
  color: var(--accent);
}

.result-info p {
  margin-top: 8px;
  color: var(--text-secondary);
}

.post-grid {
  display: grid;
  gap: 24px;
}

.sidebar-wrapper {
  position: sticky;
  top: 88px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
  color: var(--text-tertiary);
}

.loading-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: var(--text-tertiary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

@media (max-width: 900px) {
  .home-layout {
    grid-template-columns: 1fr;
  }

  .sidebar-wrapper {
    position: static;
  }
}
</style>
