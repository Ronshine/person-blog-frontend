# ✨ Ronshine 个人博客 - 前端

[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Pinia](https://img.shields.io/badge/Pinia-3-FFD859?logo=pinia&logoColor=white)](https://pinia.vuejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

一个使用 Vue 3 + Vite + TypeScript 构建的个人博客前端。支持响应式布局、暗色主题、Markdown 渲染、文章搜索、标签分类等功能。

- **配套后端仓库**: 待补充

---

## 📋 目录

- [技术栈](#-技术栈)
- [项目结构](#-项目结构)
- [快速开始](#-快速开始)
- [功能特性](#-功能特性)
- [项目配置](#-项目配置)
- [构建部署](#-构建部署)

---

## 🛠 技术栈

| 技术              | 版本    | 说明                          |
| ----------------- | ------- | ----------------------------- |
| Vue               | 3.5     | 前端框架（Composition API）  |
| Vite              | 8       | 构建工具                      |
| TypeScript        | 6       | 类型安全                      |
| Vue Router        | 5       | 路由管理（History 模式）     |
| Pinia             | 3       | 状态管理                      |
| markdown-it       | 14      | Markdown 渲染                 |
| ESLint + Oxlint   | —       | 代码检查                      |
| Prettier          | 3.8     | 代码格式化                    |

---

## 📁 项目结构

```
person_blog/
├── public/                    # 静态资源（favicon 等）
├── src/
│   ├── api/
│   │   ├── blogApi.ts         # API 请求层（封装 fetch）
│   │   └── types.ts           # TypeScript 类型定义
│   ├── assets/
│   │   └── styles/
│   │       └── main.css       # 全局样式 + CSS 变量 + 暗色主题
│   ├── components/
│   │   ├── AppHeader.vue      # 顶部导航栏（搜索 + 移动端菜单）
│   │   ├── AppFooter.vue      # 页脚
│   │   ├── Sidebar.vue        # 侧边栏（作者信息、标签云、最近文章）
│   │   ├── PostCard.vue       # 文章卡片
│   │   ├── TagChip.vue        # 标签组件（支持 sm/md/lg 三种尺寸）
│   │   └── Pagination.vue     # 分页组件
│   ├── views/
│   │   ├── HomeView.vue       # 首页（文章列表 + 侧边栏）
│   │   ├── PostDetailView.vue # 文章详情（Markdown 渲染）
│   │   ├── ArchivesView.vue   # 归档（按年月分组）
│   │   ├── TagsView.vue       # 标签云页面
│   │   ├── AboutView.vue      # 关于页面
│   │   └── BirthdayBlessing.vue # 🎂 生日祝福页
│   ├── stores/
│   │   └── blog.ts            # Pinia 全局状态
│   ├── router/
│   │   └── index.ts           # 路由配置
│   ├── App.vue                # 根组件
│   └── main.ts                # 入口文件
├── index.html                 # HTML 入口
├── vite.config.ts             # Vite 配置（含 API 代理）
├── tsconfig.json              # TypeScript 配置
├── eslint.config.ts           # ESLint 配置
├── .prettierrc.json           # Prettier 配置
└── package.json               # 依赖管理
```

---

## 🚀 快速开始

### 前置要求

- Node.js 20.19+ 或 22.12+
- npm（随 Node.js 自带）

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173`，开发模式默认将 `/api` 请求代理到 `http://localhost:8080`（后端地址），见 [vite.config.ts](vite.config.ts)。

### 3. 类型检查

```bash
npm run type-check
```

### 4. 代码检查 & 格式化

```bash
# 检查
npm run lint

# 格式化
npm run format
```

---

## ✨ 功能特性

### 📄 文章浏览
- **首页列表** — 分页展示文章摘要卡片（封面图、标题、摘要、分类、标签）
- **文章详情** — Markdown 正文渲染，显示分类、标签、阅读时间估算
- **归档视图** — 按年月分组的时间线展示
- **标签云** — 展示所有标签及对应文章数，按文章数区分大小

### 🔍 搜索与筛选
- **全文搜索** — 顶部搜索框，关键词匹配标题和摘要
- **按标签筛选** — 点击标签可查看该标签下的所有文章
- **按分类筛选** — 点击分类链接可查看该分类下的所有文章

### 🎨 视觉与体验
- **暗色主题** — 跟随系统 `prefers-color-scheme` 自动切换
- **响应式布局** — 桌面端双栏（文章列表 + 侧边栏），移动端单栏 + 侧滑菜单
- **加载状态** — 文章加载时显示旋转动画
- **Markdown 渲染** — 支持代码块、表格、块引用、图片、任务列表等，代码块采用暗色主题
- **滚动条美化** — 自定义滚动条样式

### 🧩 侧边栏
- **作者信息卡片** — 头像、名称、简介、社交链接（GitHub / Twitter / Email）
- **标签云** — 展示最常用的 12 个标签
- **最近文章** — 显示最新 5 篇文章链接
- **生日祝福入口** — 特色小彩蛋

---

## 🗺 路由

| 路径             | 页面         | 说明              |
|------------------|-------------|-------------------|
| `/`              | HomeView    | 首页（文章列表）  |
| `/post/:slug`    | PostDetail  | 文章详情          |
| `/archives`      | Archives    | 归档              |
| `/tags`          | Tags        | 标签云            |
| `/about`         | About       | 关于              |
| `/blessing`      | Blessing    | 🎂 生日祝福       |
| `/*`             | —           | 未匹配则重定向首页 |

首页支持 URL 查询参数筛选：
- `/?tag=vue` — 按标签筛选
- `/?category=frontend` — 按分类 slug 筛选
- `/?search=keyword` — 搜索

---

## ⚙️ 项目配置

### API 代理

在 [vite.config.ts](vite.config.ts) 中，Vite 开发服务器自动将 `/api` 请求代理到后端：

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
}
```

生产环境需要自行配置反向代理（Nginx 等）。

### 路径别名

使用 `@/` 指向 `src/` 目录：

```ts
import { useBlogStore } from '@/stores/blog'
```

---

## 📦 构建部署

### 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录，可直接部署到静态服务器（Nginx、Vercel、Netlify 等）。

### 部署提示

由于使用 `createWebHistory`（History 模式），需要在服务器端配置**回退路由**，将所有路径指向 `index.html`。

**Nginx 示例：**

```nginx
server {
  listen 80;
  server_name your-domain.com;
  root /path/to/dist;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api {
    proxy_pass http://localhost:8080;
  }
}
```

---

## 🎯 设计细节

- **CSS 变量** — 通过 `:root` 自定义属性统一管理颜色、字体，便于主题切换
- **暗色主题** — 使用 `@media (prefers-color-scheme: dark)` 媒体查询，自动适应系统主题
- **过渡动画** — 页面切换使用 `slide-fade` 过渡效果
- **移动端适配** — 900px 以下切换为单栏布局，768px 以下导航栏变为侧滑菜单
- **字体** — 使用 Inter 作为英文字体，Noto Sans SC 作为中文字体，JetBrains Mono 作为等宽字体

---

## 📄 License

[MIT](LICENSE)
