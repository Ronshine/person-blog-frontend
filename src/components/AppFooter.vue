<script setup lang="ts">
import { useBlogStore } from '@/stores/blog'

const store = useBlogStore()
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-info">
        <router-link to="/" class="footer-logo">
          <span class="logo-icon">✦</span>
          {{ store.blogInfo?.title || '博客' }}
        </router-link>
        <p class="footer-desc">{{ store.blogInfo?.subtitle }}</p>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h4>导航</h4>
          <router-link to="/">首页</router-link>
          <router-link to="/archives">归档</router-link>
          <router-link to="/tags">标签</router-link>
          <router-link to="/about">关于</router-link>
        </div>
        <div class="link-group">
          <h4>社交</h4>
          <a v-if="store.blogInfo?.socialLinks.github" :href="store.blogInfo.socialLinks.github" target="_blank">GitHub</a>
          <a v-if="store.blogInfo?.socialLinks.twitter" :href="store.blogInfo.socialLinks.twitter" target="_blank">Twitter</a>
          <a v-if="store.blogInfo?.socialLinks.email" :href="`mailto:${store.blogInfo.socialLinks.email}`">Email</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} {{ store.blogInfo?.author.name }}. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  margin-top: 80px;
}

.footer-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 24px 32px;
  display: flex;
  justify-content: space-between;
  gap: 48px;
  flex-wrap: wrap;
}

.footer-info {
  max-width: 300px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.1rem;
  margin-bottom: 8px;
}

.logo-icon {
  color: var(--accent);
}

.footer-desc {
  color: var(--text-tertiary);
  font-size: 0.88rem;
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 48px;
}

.link-group h4 {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  font-weight: 600;
}

.link-group a {
  display: block;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  padding: 4px 0;
  transition: color 0.2s;
}

.link-group a:hover {
  color: var(--accent);
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 16px 24px;
  text-align: center;
}

.footer-bottom p {
  color: var(--text-tertiary);
  font-size: 0.82rem;
  max-width: 1100px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    gap: 32px;
  }
  .footer-links {
    gap: 32px;
  }
}
</style>
