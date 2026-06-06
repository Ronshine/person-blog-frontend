/** 博客文章分类 */
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

/** 博客文章标签 */
export interface Tag {
  id: number
  name: string
  slug: string
}

/** 博客文章 */
export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  category: Category
  tags: Tag[]
  createdAt: string
  updatedAt: string
  published: boolean
}

/** 文章列表项（不含正文） */
export interface PostSummary {
  id: number
  title: string
  slug: string
  excerpt: string
  coverImage?: string
  category: Category
  tags: Tag[]
  createdAt: string
  updatedAt: string
}

/** 归档分组 */
export interface ArchiveGroup {
  year: number
  month: number
  posts: PostSummary[]
}

/** 标签云 */
export interface TagWithCount extends Tag {
  count: number
}

/** 分页信息 */
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

/** 分页响应 */
export interface PaginatedResult<T> {
  items: T[]
  pagination: Pagination
}

/** 博客全局信息 */
export interface BlogInfo {
  title: string
  subtitle: string
  description: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  socialLinks: {
    github?: string
    twitter?: string
    email?: string
  }
}
