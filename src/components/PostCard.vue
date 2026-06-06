<script setup lang="ts">
import type { PostSummary } from '@/api/types'

defineProps<{
  post: PostSummary
}>()
</script>

<template>
  <article class="post-card">
    <router-link :to="`/post/${post.slug}`" class="card-link">
      <div v-if="post.coverImage" class="card-image">
        <img :src="post.coverImage" :alt="post.title" loading="lazy" />
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">{{ post.category.name }}</span>
          <span class="card-date">{{ new Date(post.createdAt).toLocaleDateString('zh-CN') }}</span>
        </div>
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="card-excerpt">{{ post.excerpt }}</p>
        <div class="card-tags">
          <span
            v-for="tag in post.tags"
            :key="tag.id"
            class="tag"
          >
            #{{ tag.name }}
          </span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<style scoped>
.post-card {
  background: var(--bg-card);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
  height: 100%;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  border-color: var(--accent);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.post-card:hover .card-image img {
  transform: scale(1.05);
}

.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.card-category {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--accent);
  background: var(--accent-bg);
  padding: 3px 10px;
  border-radius: 12px;
}

.card-date {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.45;
  color: var(--text-primary);
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card:hover .card-title {
  color: var(--accent);
}

.card-excerpt {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 16px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 0.78rem;
  color: var(--text-tertiary);
  background: var(--bg-muted);
  padding: 2px 10px;
  border-radius: 10px;
  transition: color 0.2s;
}

.tag:hover {
  color: var(--accent);
}
</style>
