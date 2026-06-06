<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBlogStore } from '@/stores/blog'

const store = useBlogStore()
const { blogInfo, tags } = storeToRefs(store)

onMounted(async () => {
  await Promise.all([
    store.loadBlogInfo(),
    store.loadTags(),
  ])
})
</script>

<template>
  <div class="about-page">
    <div v-if="blogInfo" class="about-card">
      <div class="about-header">
        <img :src="blogInfo.author.avatar" :alt="blogInfo.author.name" class="about-avatar" />
        <div>
          <h1>{{ blogInfo.author.name }}</h1>
          <p class="about-subtitle">{{ blogInfo.subtitle }}</p>
        </div>
      </div>

      <div class="about-content">
        <section>
          <h2>👋 关于我</h2>
          <p>{{ blogInfo.author.bio }}</p>
          <p>
            我是一名全栈开发者，热衷于使用现代 Web 技术构建优秀的应用。
            这个博客记录了我学习过程中的思考、项目经验和技术分享。
          </p>
        </section>

        <section>
          <h2>🛠️ 技术栈</h2>
          <div class="skills">
            <span class="skill">Vue 3</span>
            <span class="skill">React</span>
            <span class="skill">TypeScript</span>
            <span class="skill">Node.js</span>
            <span class="skill">Spring Boot</span>
            <span class="skill">Docker</span>
            <span class="skill">MySQL</span>
            <span class="skill">Rust</span>
          </div>
        </section>

        <section>
          <h2>📬 联系我</h2>
          <div class="contacts">
            <a
              v-if="blogInfo.socialLinks.github"
              :href="blogInfo.socialLinks.github"
              target="_blank"
              class="contact-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
            <a
              v-if="blogInfo.socialLinks.twitter"
              :href="blogInfo.socialLinks.twitter"
              target="_blank"
              class="contact-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Twitter
            </a>
            <a
              v-if="blogInfo.socialLinks.email"
              :href="`mailto:${blogInfo.socialLinks.email}`"
              class="contact-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Email
            </a>
          </div>
        </section>

        <section>
          <h2>📝 关于这个博客</h2>
          <p>
            本站使用 <strong>Vue 3</strong> + <strong>TypeScript</strong> 构建，
            是一个开源的个人博客项目。代码托管在 GitHub 上，
            欢迎 Star 和 Fork。
          </p>
          <p>
            如果你对这个项目感兴趣，可以通过上面的联系方式与我沟通。
          </p>
        </section>
      </div>
    </div>

    <div v-else class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
}

.about-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
}

.about-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 40px;
  background: linear-gradient(135deg, var(--accent-bg) 0%, var(--bg-card) 100%);
  border-bottom: 1px solid var(--border);
}

.about-avatar {
  width: 88px;
  height: 88px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--bg-muted);
}

.about-header h1 {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.about-subtitle {
  color: var(--text-tertiary);
  font-size: 0.95rem;
}

.about-content {
  padding: 32px 40px 40px;
}

.about-content section {
  margin-bottom: 32px;
}

.about-content h2 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.about-content p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 8px;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill {
  font-size: 0.85rem;
  padding: 6px 16px;
  background: var(--accent-bg);
  color: var(--accent);
  border-radius: 20px;
  font-weight: 500;
  border: 1px solid transparent;
}

.skill:hover {
  border-color: var(--accent);
}

.contacts {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--bg-muted);
  border: 1px solid var(--border);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;
}

.contact-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: var(--accent-bg);
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

@media (max-width: 640px) {
  .about-header {
    flex-direction: column;
    text-align: center;
    padding: 32px 20px;
  }

  .about-content {
    padding: 24px 20px;
  }
}
</style>
