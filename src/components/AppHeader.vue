<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

const router = useRouter()
const route = useRoute()
const store = useBlogStore()

const searchQuery = ref('')
const mobileMenuOpen = ref(false)

function handleSearch() {
  const q = searchQuery.value.trim()
  if (!q) return
  router.push({ name: 'home', query: { search: q } })
  searchQuery.value = ''
  mobileMenuOpen.value = false
}

function navigateTo(path: string) {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <router-link to="/" class="logo" @click="mobileMenuOpen = false">
        <span class="logo-icon">✦</span>
        <span class="logo-text">{{ store.blogInfo?.title || '博客' }}</span>
      </router-link>

      <button class="menu-toggle" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="菜单">
        <span :class="['menu-bar', { open: mobileMenuOpen }]"></span>
      </button>

      <nav :class="['nav-links', { open: mobileMenuOpen }]">
        <router-link
          to="/"
          :class="{ active: route.name === 'home' }"
          @click="navigateTo('/')"
        >
          首页
        </router-link>
        <router-link
          to="/archives"
          :class="{ active: route.name === 'archives' }"
          @click="navigateTo('/archives')"
        >
          归档
        </router-link>
        <router-link
          to="/tags"
          :class="{ active: route.name === 'tags' }"
          @click="navigateTo('/tags')"
        >
          标签
        </router-link>
        <router-link
          to="/about"
          :class="{ active: route.name === 'about' }"
          @click="navigateTo('/about')"
        >
          关于
        </router-link>

        <form class="search-form" @submit.prevent="handleSearch">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索文章..."
            class="search-input"
          />
          <button type="submit" class="search-btn" aria-label="搜索">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 1.4rem;
  color: var(--accent);
}

.menu-toggle {
  display: none;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  z-index: 101;
}

.menu-bar,
.menu-bar::before,
.menu-bar::after {
  display: block;
  width: 22px;
  height: 2.5px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
  position: absolute;
  left: 7px;
}

.menu-bar {
  top: 50%;
  transform: translateY(-50%);
}
.menu-bar::before {
  content: '';
  top: -7px;
}
.menu-bar::after {
  content: '';
  top: 7px;
}
.menu-bar.open {
  background: transparent;
}
.menu-bar.open::before {
  top: 0;
  transform: rotate(45deg);
}
.menu-bar.open::after {
  top: 0;
  transform: rotate(-45deg);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  color: var(--text-primary);
  background: var(--bg-muted);
}

.nav-links a.active {
  color: var(--accent);
  background: var(--accent-bg);
}

.search-form {
  display: flex;
  align-items: center;
  margin-left: 12px;
  position: relative;
}

.search-input {
  width: 160px;
  padding: 8px 32px 8px 14px;
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.85rem;
  background: var(--bg-muted);
  color: var(--text-primary);
  outline: none;
  transition: all 0.2s ease;
}

.search-input:focus {
  width: 200px;
  border-color: var(--accent);
  background: white;
  box-shadow: 0 0 0 3px var(--accent-bg);
}

.search-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: var(--text-tertiary);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-btn:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
    align-items: center;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 80px 24px 24px;
    gap: 4px;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
    align-items: stretch;
  }

  .nav-links.open {
    right: 0;
  }

  .nav-links a {
    padding: 12px 16px;
    font-size: 1rem;
  }

  .search-form {
    margin-left: 0;
    margin-top: 12px;
  }

  .search-input {
    width: 100%;
  }

  .search-input:focus {
    width: 100%;
  }
}
</style>
