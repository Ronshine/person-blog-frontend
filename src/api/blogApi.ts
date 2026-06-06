/**
 * 博客 API 服务层
 *
 * 调用后端 REST API（localhost:8080），通过 Vite proxy 转发 /api 请求
 */

import type {
  Post,
  PostSummary,
  BlogInfo,
  TagWithCount,
  ArchiveGroup,
  PaginatedResult,
  Category,
} from './types'

/** API 基础路径 */
const BASE = '/api'

/** 通用 fetch 封装：解析 Result 包裹，提取 data */
async function request<T>(url: string): Promise<T> {
  const res = await fetch(`${BASE}${url}`)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  const body = await res.json()
  if (body.code !== 200) {
    throw new Error(body.message || '请求失败')
  }
  return body.data as T
}

/** 获取博客基本信息 */
export async function fetchBlogInfo(): Promise<BlogInfo> {
  return request<BlogInfo>('/blog/info')
}

/** 获取文章列表（分页） */
export async function fetchPosts(
  page = 1,
  pageSize = 6
): Promise<PaginatedResult<PostSummary>> {
  return request<PaginatedResult<PostSummary>>(
    `/posts?page=${page}&pageSize=${pageSize}`
  )
}

/** 根据 slug 获取文章详情 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await request<Post>(`/posts/${encodeURIComponent(slug)}`)
  } catch {
    return null
  }
}

/** 根据 ID 获取文章详情 */
export async function fetchPostById(id: number): Promise<Post | null> {
  try {
    return await request<Post>(`/posts/id/${id}`)
  } catch {
    return null
  }
}

/** 获取分类列表 */
export async function fetchCategories(): Promise<Category[]> {
  return request<Category[]>('/categories')
}

/** 获取所有标签（含文章数） */
export async function fetchTags(): Promise<TagWithCount[]> {
  return request<TagWithCount[]>('/tags')
}

/** 根据标签 slug 获取文章列表 */
export async function fetchPostsByTag(
  tagSlug: string
): Promise<PostSummary[]> {
  return request<PostSummary[]>(`/posts/byTag?tagSlug=${encodeURIComponent(tagSlug)}`)
}

/** 根据分类 slug 获取文章列表 */
export async function fetchPostsByCategory(
  categorySlug: string
): Promise<PostSummary[]> {
  return request<PostSummary[]>(
    `/posts/byCategory?categorySlug=${encodeURIComponent(categorySlug)}`
  )
}

/** 获取归档数据 */
export async function fetchArchives(): Promise<ArchiveGroup[]> {
  return request<ArchiveGroup[]>('/archives')
}

/** 搜索文章 */
export async function searchPosts(query: string): Promise<PostSummary[]> {
  return request<PostSummary[]>(
    `/posts/search?q=${encodeURIComponent(query)}`
  )
}
