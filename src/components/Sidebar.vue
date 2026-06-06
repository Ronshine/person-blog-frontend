<script setup lang="ts">
import { useBlogStore } from '@/stores/blog'
import { storeToRefs } from 'pinia'

const store = useBlogStore()
const { blogInfo, tags, posts } = storeToRefs(store)

/** 取最新的 5 篇文章作为推荐阅读 */
const recentPosts = computed(() => posts.value.slice(0, 5))

import { computed } from 'vue'
</script>

<template>
  <aside class="sidebar">
    <!-- 作者信息 -->
    <div v-if="blogInfo" class="widget author-widget">
      <img :src="blogInfo.author.avatar" :alt="blogInfo.author.name" class="avatar" />
      <h3 class="author-name">{{ blogInfo.author.name }}</h3>
      <p class="author-bio">{{ blogInfo.author.bio }}</p>
      <div class="social-links">
        <a v-if="blogInfo.socialLinks.github" :href="blogInfo.socialLinks.github" target="_blank" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a v-if="blogInfo.socialLinks.twitter" :href="blogInfo.socialLinks.twitter" target="_blank" aria-label="Twitter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a v-if="blogInfo.socialLinks.email" :href="`mailto:${blogInfo.socialLinks.email}`" aria-label="Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
      </div>
    </div>

    <!-- 祝福入口 -->
    <router-link to="/blessing" class="widget blessing-widget">
      <div class="blessing-content">
        <span class="blessing-icon">🎂</span>
        <div>
          <span class="blessing-label">生日祝福</span>
          <span class="blessing-desc">送上一份美好的祝愿</span>
        </div>
        <span class="blessing-arrow">→</span>
      </div>
    </router-link>

    <!-- 标签云 -->
    <div class="widget tags-widget">
      <h3 class="widget-title">🏷️ 标签</h3>
      <div class="tag-cloud">
        <TagChip
          v-for="tag in tags.slice(0, 12)"
          :key="tag.id"
          :name="tag.name"
          :count="tag.count"
          size="sm"
        />
      </div>
    </div>

    <!-- 最近文章 -->
    <div class="widget recent-widget">
      <h3 class="widget-title">📝 最近文章</h3>
      <ul class="recent-list">
        <li v-for="post in recentPosts" :key="post.id">
          <router-link :to="`/post/${post.slug}`" class="recent-item">
            <span class="recent-title">{{ post.title }}</span>
            <span class="recent-date">{{ new Date(post.createdAt).toLocaleDateString('zh-CN') }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.widget {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
}

.widget-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

/* 作者小部件 */
.author-widget {
  text-align: center;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin: 0 auto 12px;
  background: var(--bg-muted);
}

.author-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.author-bio {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  line-height: 1.5;
  margin-bottom: 16px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.social-links a {
  color: var(--text-tertiary);
  transition: color 0.2s;
  display: flex;
}

.social-links a:hover {
  color: var(--accent);
}

/* 祝福入口 */
.blessing-widget {
  text-decoration: none;
  display: block;
  transition: all 0.25s ease;
  cursor: pointer;
  background: linear-gradient(135deg, var(--accent-bg) 0%, var(--bg-card) 60%);
}

.blessing-widget:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.12);
}

.blessing-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.blessing-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.blessing-label {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.blessing-desc {
  display: block;
  font-size: 0.78rem;
  color: var(--text-tertiary);
}

.blessing-arrow {
  margin-left: auto;
  font-size: 1.1rem;
  color: var(--text-tertiary);
  transition: transform 0.2s ease;
}

.blessing-widget:hover .blessing-arrow {
  transform: translateX(4px);
  color: var(--accent);
}

/* 标签云 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 最近文章 */
.recent-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-decoration: none;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
  transition: padding-left 0.2s;
}

.recent-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.recent-item:hover {
  padding-left: 6px;
}

.recent-title {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: color 0.2s;
}

.recent-item:hover .recent-title {
  color: var(--accent);
}

.recent-date {
  font-size: 0.78rem;
  color: var(--text-tertiary);
}
</style>
