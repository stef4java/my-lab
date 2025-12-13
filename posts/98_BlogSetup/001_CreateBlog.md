---
title: 博客搭建-01.使用VitePress搭建博客并自动部署至Github Pages
author: Stef
date: '2025-12-12'
categories:
  - 博客搭建
tags:
  - VitePress
  - Github Pages
sidebar: 'auto'
---

# 博客搭建-01.使用VitePress搭建博客并自动部署至Github Pages
> 本文为你提供从安装、配置、页面布局、主题自定义、分类体系、导航与侧边栏，到部署上线的完整流程。

## 零、先看效果

[示例链接, 点击查看](https://stef4java.github.io/my-vitepress-blog/)

接下来手把手带大家创建一个如上方链接的博客， 对应的代码仓库在 [Github](https://github.com/stef4java/my-vitepress-blog)

## 一、准备工作
1. 环境要求
- Node.js v18+
- Git（用于部署到 GitHub Pages）
- 推荐使用 VS Code 或其它 Markdown 编辑器
- pnpm（如果没有安装）
```shell
npm install -g pnpm
```

## 二、初始化项目
### 1.创建项目目录并初始化(使用 pnpm)
```shell
mkdir my-vitepress-blog && cd my-vitepress-blog
# 初始化 package.json
pnpm init
```
### 2.安装 VitePress
```shell
pnpm add -D vitepress@next
```
> ⭐ 注：官方建议使用 vitepress@next（最新版本）。
### 3.使用VitePress命令行设置向导，快速构建一个基本项目
```shell
pnpm vitepress init
```
将需要回答几个简单的问题：
```shell
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./ 
│  # 🔥注意,我选择的当前目录，官网选择的是./docs
◇  Where should VitePress look for your markdown files?
│  ./
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme + Customization
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
◇  Add a prefix for VitePress npm scripts?
│  Yes
│
◇  Prefix for VitePress npm scripts:
│  docs
│
└  Done! Now run pnpm run docs:dev and start writing.

Tips:
- Since you've chosen to customize the theme, you should also explicitly install vue as a dev dependency.
```
### 4.查看文件结构
> ⭐ 官网说明: 如果正在构建一个独立的 VitePress 站点，可以在当前目录 (./) 中搭建站点。但是，如果在现有项目中与其他源代码一起安装 VitePress，建议将站点搭建在嵌套目录 (例如 ./docs) 中，以便它与项目的其余部分分开。
> 🔥注意：我选择的是./docs，所以文件结构如下：
```shell
.
├── api-examples.md
├── index.md
├── markdown-examples.md
├── package.json
└── pnpm-lock.yaml
```
### 5.本地预览
命令行执行如下命令，
```shell
pnpm run docs:dev
```
可看到
```shell
> my-vitepress-blog@1.0.0 docs:dev /Users/stef/my-vitepress-blog
> vitepress dev
  vitepress v2.0.0-alpha.15
  ➜  Local:   http://localhost:5173/ 🔥默认端口是5173
  ➜  Network: use --host to expose
  ➜  press h to show help

```
访问 http://localhost:5173/ 即可看到
![默认页面](https://github.com/stef4java/picx-images-hosting/raw/master/image.36211shlhx.webp)

## 三、基础配置&&自定义首页
### 1.基础配置（config.mts） 
在`.vitepress/config.ts`，编写如下：
```ts
import {defineConfig} from 'vitepress'

export default defineConfig({
    base: '/my-vitepress-blog/', // ⭐ 部署到的 base URL，详细参照[部署指南](https://vitepress.dev/zh/reference/site-config#base)
    title: "我的 VitePress 博客",
    description: "这是一个使用 VitePress 构建的博客",
    themeConfig: {
        logo: '/logo.svg', // ⭐ 导航栏logo, 在public目录下,可以去 [图标库](https://iconfont.cn/) 获取
        nav: [
            {text: '首页', link: '/'},
            {
                text: '后端', items: [
                    {text: 'API 开发', link: '/posts/01_backend/api/'},
                    {text: '数据库', link: '/posts/01_backend/database/'}
                ]
            },
            {
                text: '前端',
                items: [
                    {text: 'Vue 框架', link: '/posts/02_frontend/vue/'},
                    {text: 'React 生态', link: '/posts/02_frontend/react/'}
                ]
            },
            {
                text: '关于我',
                items: [
                    {text: 'Github', link: 'https://github.com/stef4java'}// 外部链接
                ]
            }
        ],
        sidebar: {
            '/posts/01_backend/api/': [
                {
                    text: 'API 开发',
                    items: [
                        {text: 'RESTful API 设计规范', link: '/posts/01_backend/api/01_restful.md'},
                        {text: 'GraphQL API规范', link: '/posts/01_backend/api/02_graphql.md'}
                    ]
                }
            ],
            '/posts/01_backend/database/': [
                {
                    text: '数据库',
                    items: [
                        {text: 'PostgreSQL 安装与使用指南', link: '/posts/01_backend/database/01_postgresql.md'},
                        {text: 'MySQL 优化指南', link: '/posts/01_backend/database/02_mysql-optimization.md'}
                    ]
                }
            ],
            '/posts/02_frontend/vue/': [
                {
                    text: 'Vue 框架',
                    items: [
                        {text: 'Vue 核心概念', link: '/posts/02_frontend/vue/01_core-concepts.md'},
                        {text: 'Vue 组件通信', link: '/posts/02_frontend/vue/02_component-communication.md'},
                        {text: 'Vue 状态管理', link: '/posts/02_frontend/vue/03_state-management.md'},
                    ]
                }
            ],
            '/posts/02_frontend/react/': [
                {
                    text: 'React 生态',
                    items: [
                        {text: 'React Hooks 原理', link: '/posts/02_frontend/react/01_hooks.md'},
                        {text: 'React 并发模式', link: '/posts/02_frontend/react/02_concurrent-mode.md'},
                    ]
                }
            ]
        },
        // ⭐ 社交链接, [参考链接](https://vitepress.dev/zh/reference/default-theme-config#sociallinks)
        socialLinks: [
            {icon: 'github', link: 'https://github.com/stef4java'}
        ],
        // ⭐ 页脚 copyright
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Stef',
        }
    }
})

```
需要重点关注几个属性:
- **base**: 部署到的 base URL，本列值为`'/my-vitepress-blog/'`，详细参照[部署指南](https://vitepress.dev/zh/reference/site-config#base)
- **nav**: 是顶部导航
- **sidebar**: 是侧边栏（可以为不同目录定制）

### 2.自定义首页（index.md）
在`index.md`文件中编写如下内容：
```md
---
layout: home
title: 欢迎来到我的博客
hero:
  name: "VitePress Blog"
  title: "Hello VitePress 👋"
  tagline: "基于 VitePress 搭建的博客"
  image:
    src: bg.svg
    alt: avatar
  actions:
    - theme: brand
      text: 开始阅读
      link: /posts/99_others/first_post.md
    - theme: alt
      text: 关于我
      link: /posts/99_others/about_me.md

features:
  - icon: "⭐"
    title: "快速"
    details: "基于 Vite & Vue 的静态站点生成器"
  - icon: "💡"
    title: "Markdown"
    details: "使用 Markdown 即可书写文章"
---
```

## 四、写文章（Markdown）
创建`posts`目录，示例文章已经给大家准备好了，可以直接从代码仓库 [Github](https://github.com/stef4java/my-vitepress-blog) 复制整个目录到本地，
在浏览器产看效果。

## 五、Github Pages部署(自动化)
### 1.创建Github仓库
创建Github仓库，本列值为`my-vitepress-blog`
### 2.为了避免提交不需要的文件，创建`.gitignore`文件并添加如下内容：
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Dependency directories
node_modules/
dist/
dist-ssr/
*.local

# Editor directories and files
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.DS_Store

# VitePress build output
docs/.vitepress/dist
.vitepress/dist

# Temp files
*.tmp
*.temp
*.bak

# Local env files
.env.Local
.env.*.local

# Cache
.cache/
.temp/
vite.config.ts.timestamp*
vite.config.js.timestamp*
.vite/
/.vitepress/cache/
```    
### 3.提交到Github仓库
运行如下命令：
```bash
git init
git add 
git commit -m "first commit"
git branch -M main
# 🔥关联为自己的Github仓库
git remote add origin https://github.com/stef4java/my-vitepress-blog.git
git push -u origin main
```

### 4.构建工作流
操作路径: 项目仓库界面，点击`Actions` -> `Set up a workflow yourself`
![](https://github.com/stef4java/picx-images-hosting/raw/master/image.2yyt7ibpmk.webp)
进入到`Code`编辑页面，填写文件名`deploy.yml`, 复制`工作流内容(见下方)`到编辑框中，-> `Commit changes...`提交。
![](https://github.com/stef4java/picx-images-hosting/raw/master/image.6f14zlpsce.webp)
工作流内容
```yml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v4 # 🔥如果使用 pnpm，请取消此区域注释
        with:
          # 🔥此处版本需要跟`package.json`文件中`"packageManager": "pnpm@10.25.0"` 保持一致。
          version: 10.25.0
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: pnpm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: pnpm install # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: pnpm docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # 🔥注意路径
          path: .vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
此步走完，会自动生成`.github/workflows/deploy.yml`文件。
### 5.查看部署进度,点击链接查看效果
![](https://github.com/stef4java/picx-images-hosting/raw/master/image.esyuw8wwj.webp)

## 六、遇到的坑
### 1.`Unable to locate executable file: pnpm.`
> 解决方法：
`.github/workflows/deploy.yml`文件需要打开`pnpm/action-setup@v4`相关配置，官方文档中pnpm默认是关闭的：[pnpm/action-setup](https://vitepress.dev/zh/guide/deploy#github-pages)

### 2.`Error: Multiple versions of pnpm specified:`
> 解决方法：
`.github/workflows/deploy.yml`文件中`pnpm/action-setup@v4`中的`version`版本号需要与`package.json`文件中`"packageManager": "pnpm@10.25.0"` 保持一致。

### 3.base 配置不正确
> 解决方法：
部署到的 base URL，详细参照[部署指南](https://vitepress.dev/zh/reference/site-config#base)

### 4.`.github/workflows/deploy.yml`中`Upload artifact`的`path`配置
> 解决方法：
本例是`.vitepress/dist`，请根据自身情况修改。

### 5.`build error:[vitepress] 1 dead link(s) found.`
> 解决方法：
编写的文章中有`localhost 链接`导致。参照[部署指南](https://vitepress.dev/zh/reference/site-config#ignoredeadlinks)，在`config.mts`添加`ignoreDeadLinks`配置。
```ts
export default {
  ignoreDeadLinks: [
    // 忽略精确网址 "/playground"
    '/playground',
    // 忽略所有 localhost 链接
    /^https?:\/\/localhost/,
    // 忽略所有包含 "/repl/" 的链接
    /\/repl\//,
    // 自定义函数，忽略所有包含 "ignore "的链接
    (url) => {
      return url.toLowerCase().includes('ignore')
    }
  ]
}
```
## 七、参考文章
1. [VitePress官方文档](https://vitepress.dev/zh/)
