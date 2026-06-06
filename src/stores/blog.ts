import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as api from '@/api/blogApi'
import type {
  PostSummary,
  Post,
  BlogInfo,
  TagWithCount,
  ArchiveGroup,
  Pagination,
  Category,
} from '@/api/types'

export const useBlogStore = defineStore('blog', () => {
  // --- 状态 ---
  const blogInfo = ref<BlogInfo | null>(null)
  const posts = ref<PostSummary[]>([])
  const currentPost = ref<Post | null>(null)
  const tags = ref<TagWithCount[]>([])
  const categories = ref<Category[]>([])
  const archives = ref<ArchiveGroup[]>([])
  const pagination = ref<Pagination | null>(null)
  const loading = ref(false)

  // --- 计算属性 ---
  const isLoaded = computed(() => blogInfo.value !== null)

  // --- 操作 ---
  async function loadBlogInfo(): Promise<void> {
    if (blogInfo.value) return
    blogInfo.value = await api.fetchBlogInfo()
  }

  async function loadPosts(page = 1): Promise<void> {
    loading.value = true
    try {
      const result = await api.fetchPosts(page, 6)
      posts.value = result.items
      pagination.value = result.pagination
    } finally {
      loading.value = false
    }
  }

  async function loadPostBySlug(slug: string): Promise<Post | null> {
    loading.value = true
    try {
      currentPost.value = await api.fetchPostBySlug(slug)
      return currentPost.value
    } finally {
      loading.value = false
    }
  }

  async function loadTags(): Promise<void> {
    tags.value = await api.fetchTags()
  }

  async function loadCategories(): Promise<void> {
    categories.value = await api.fetchCategories()
  }

  async function loadArchives(): Promise<void> {
    archives.value = await api.fetchArchives()
  }

  async function loadPostsByTag(tagSlug: string): Promise<void> {
    loading.value = true
    try {
      posts.value = await api.fetchPostsByTag(tagSlug)
      pagination.value = null
    } finally {
      loading.value = false
    }
  }

  async function loadPostsByCategory(categorySlug: string): Promise<void> {
    loading.value = true
    try {
      posts.value = await api.fetchPostsByCategory(categorySlug)
      pagination.value = null
    } finally {
      loading.value = false
    }
  }

  async function searchPosts(query: string): Promise<void> {
    loading.value = true
    try {
      posts.value = await api.searchPosts(query)
      pagination.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    blogInfo,
    posts,
    currentPost,
    tags,
    categories,
    archives,
    pagination,
    loading,
    isLoaded,
    loadBlogInfo,
    loadPosts,
    loadPostBySlug,
    loadTags,
    loadCategories,
    loadArchives,
    loadPostsByTag,
    loadPostsByCategory,
    searchPosts,
  }
})
