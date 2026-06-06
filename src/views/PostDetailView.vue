<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

const route = useRoute()
const router = useRouter()
const store = useBlogStore()
const { currentPost, loading } = storeToRefs(store)
const notFound = ref(false)

const formattedDate = computed(() => {
  if (!currentPost.value) return ''
  return new Date(currentPost.value.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})

const readingTime = computed(() => {
  if (!currentPost.value) return 0
  const words = currentPost.value.content.length
  return Math.max(1, Math.ceil(words / 500))
})

/** 将 Markdown 内容渲染为 HTML */
const renderedContent = computed(() => {
  if (!currentPost.value) return ''
  return md.render(currentPost.value.content)
})

onMounted(async () => {
  const slug = route.params.slug as string
  const post = await store.loadPostBySlug(slug)
  if (!post) {
    notFound.value = true
  }
  await Promise.all([
    store.loadBlogInfo(),
    store.loadTags(),
  ])
})
</script>

<template>
  <div class="post-detail-layout">
    <article v-if="currentPost && !notFound" class="post-detail">
      <!-- 封面图 -->
      <div v-if="currentPost.coverImage" class="post-cover">
        <img :src="currentPost.coverImage" :alt="currentPost.title" />
      </div>

      <div class="post-header">
        <div class="post-meta">
          <router-link
            :to="`/?category=${currentPost.category.slug}`"
            class="post-category"
          >
            {{ currentPost.category.name }}
          </router-link>
          <span class="post-date">{{ formattedDate }}</span>
          <span class="post-reading">约 {{ readingTime }} 分钟阅读</span>
        </div>

        <h1 class="post-title">{{ currentPost.title }}</h1>

        <div class="post-tags">
          <router-link
            v-for="tag in currentPost.tags"
            :key="tag.id"
            :to="`/?tag=${tag.slug}`"
            class="tag-link"
          >
            #{{ tag.name }}
          </router-link>
        </div>
      </div>

      <!-- 文章内容 -->
      <div class="post-content" v-html="renderedContent"></div>

      <!-- 底部导航 -->
      <div class="post-footer">
        <router-link to="/" class="back-link">
          ← 返回首页
        </router-link>
        <span class="post-updated" v-if="currentPost.updatedAt !== currentPost.createdAt">
          最后更新：{{ new Date(currentPost.updatedAt).toLocaleDateString('zh-CN') }}
        </span>
      </div>
    </article>

    <!-- 加载状态 -->
    <div v-else-if="loading && !notFound" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载文章...</p>
    </div>

    <!-- 404 -->
    <div v-else class="not-found">
      <p class="not-found-icon">🔍</p>
      <h2>文章未找到</h2>
      <p>这篇文章可能已被删除或地址有误</p>
      <router-link to="/" class="back-link">← 返回首页</router-link>
    </div>
  </div>
</template>

<style scoped>
.post-detail-layout {
  max-width: 800px;
  margin: 0 auto;
}

.post-detail {
  background: var(--bg-card);
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid var(--border);
}

.post-cover {
  width: 100%;
  max-height: 400px;
  overflow: hidden;
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-header {
  padding: 40px 40px 0;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.post-category {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-bg);
  padding: 4px 14px;
  border-radius: 14px;
  text-decoration: none;
  transition: opacity 0.2s;
}

.post-category:hover {
  opacity: 0.8;
}

.post-date,
.post-reading {
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

.post-title {
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.35;
  color: var(--text-primary);
  margin-bottom: 16px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.tag-link {
  font-size: 0.82rem;
  color: var(--text-secondary);
  background: var(--bg-muted);
  padding: 4px 14px;
  border-radius: 14px;
  text-decoration: none;
  transition: all 0.2s;
}

.tag-link:hover {
  color: var(--accent);
  background: var(--accent-bg);
}

/* Markdown 内容样式 */
.post-content {
  padding: 32px 40px 40px;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-primary);
}

.post-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 36px 0 16px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--accent);
  color: var(--text-primary);
}

.post-content :deep(h3) {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 28px 0 12px;
  padding-left: 12px;
  border-left: 3px solid var(--accent);
  color: var(--text-primary);
}

.post-content :deep(h4) {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 20px 0 8px;
  color: var(--text-primary);
}

.post-content :deep(p) {
  margin-bottom: 16px;
}

.post-content :deep(code) {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9em;
  background: var(--bg-muted);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--accent);
}

.post-content :deep(pre) {
  background: #1a1a2e;
  color: #e4e4ef;
  padding: 20px 24px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 20px 0;
  font-size: 0.88rem;
  line-height: 1.6;
}

.post-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.post-content :deep(blockquote) {
  border-left: 4px solid var(--accent);
  margin: 20px 0;
  padding: 12px 20px;
  background: var(--accent-bg);
  border-radius: 0 8px 8px 0;
  color: var(--text-secondary);
  font-style: italic;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.post-content :deep(li) {
  margin-bottom: 8px;
}

.post-content :deep(input[type="checkbox"]) {
  margin-right: 8px;
  accent-color: var(--accent);
}

.post-content :deep(li input[type="checkbox"] + strong) {
  font-weight: 600;
}

/* 已完成任务项 */
.post-content :deep(li input[type="checkbox"][checked] + strong) {
  text-decoration: line-through;
  opacity: 0.6;
}

.post-content :deep(strong) {
  font-weight: 700;
}

.post-content :deep(em) {
  font-style: italic;
}

.post-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 20px 0;
}

.post-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.9rem;
}

.post-content :deep(th),
.post-content :deep(td) {
  border: 1px solid var(--border);
  padding: 10px 16px;
  text-align: left;
}

.post-content :deep(th) {
  background: var(--bg-muted);
  font-weight: 600;
}

.post-content :deep(tr:nth-child(even)) {
  background: var(--bg-muted);
}

.post-content :deep(a) {
  color: var(--accent);
  text-decoration: none;
}

.post-content :deep(a:hover) {
  text-decoration: underline;
}

.post-content :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 32px 0;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 12px;
}

.back-link {
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.back-link:hover {
  opacity: 0.8;
}

.post-updated {
  font-size: 0.82rem;
  color: var(--text-tertiary);
}

/* 加载状态 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120px 0;
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

/* 404 */
.not-found {
  text-align: center;
  padding: 120px 0;
}

.not-found-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
}

.not-found h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}

@media (max-width: 640px) {
  .post-header {
    padding: 24px 20px 0;
  }

  .post-title {
    font-size: 1.5rem;
  }

  .post-content {
    padding: 24px 20px;
    font-size: 0.95rem;
  }

  .post-footer {
    padding: 20px;
  }

  .post-meta {
    gap: 10px;
  }
}
</style>
