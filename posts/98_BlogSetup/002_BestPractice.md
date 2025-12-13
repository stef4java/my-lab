---
title: 博客搭建-02. VitePress 最佳实践
author: Stef
date: '2025-12-13'
categories:
  - 博客搭建
tags:
  - VitePress
  - 博客
description: 总结 VitePress 在真实项目中的最佳实践
sidebar: 'auto'
---

# 博客搭建-02. VitePress 最佳实践

> 本文为你提供 VitePress 最佳实践,包括组件化`nav / sidebar`、图床推荐 等等(待添加...)

## 一、组件化`nav / sidebar`

### 1.问题描述

`config.mts`配置文件中`nav / sidebar`很乱，影响阅读，随着文章越来越多，配置文件也会爆炸。

### 2.目标

- config.mts 只负责组装
- Nav / Sidebar 按模块拆分
- 每个技术域 独立维护
- 新增内容 不动核心配置

### 3.解决方案

#### 3.1 最终目录结构（配置层）

```shell
docs/
└── .vitepress/
    ├── config.mts          # 入口，只做 assemble
    ├── nav/
    │   └── index.ts        # 顶部导航
    └── sidebar/
        ├── backend.ts      # 后端 sidebar
        ├── frontend.ts     # 前端 sidebar
        └── index.ts        # sidebar 汇总
```

#### 3.2 Nav 组件化（nav/index.ts）

.vitepress/nav/index.ts

```ts
import type {DefaultTheme} from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
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
]
```

#### 3.3 Sidebar 拆成“领域组件”

1️⃣ 后端 Sidebar（sidebar/backend.ts）

```ts
import type {DefaultTheme} from 'vitepress'

export const backendSidebar: DefaultTheme.SidebarItem[] = [
    {
        text: '后端',
        items: [
            {
                text: 'API 开发',
                link: '/posts/01_backend/api/',
                items: [
                    {
                        text: 'RESTful API 设计规范',
                        link: '/posts/01_backend/api/01_restful'
                    },
                    {
                        text: 'GraphQL API 规范',
                        link: '/posts/01_backend/api/02_graphql'
                    }
                ]
            },
            {
                text: '数据库',
                link: '/posts/01_backend/database/',
                items: [
                    {
                        text: 'PostgreSQL 安装与使用',
                        link: '/posts/01_backend/database/01_postgresql'
                    },
                    {
                        text: 'MySQL 优化指南',
                        link: '/posts/01_backend/database/02_mysql-optimization'
                    }
                ]
            }
        ]
    }
]
```

2️⃣ 前端 Sidebar（sidebar/frontend.ts）

```ts
import type {DefaultTheme} from 'vitepress'

export const frontendSidebar: DefaultTheme.SidebarItem[] = [
    {
        text: '前端',
        items: [
            {
                text: 'Vue 框架',
                link: '/posts/02_frontend/vue/',
                items: [
                    {
                        text: 'Vue 核心概念',
                        link: '/posts/02_frontend/vue/01_core-concepts'
                    },
                    {
                        text: 'Vue 组件通信',
                        link: '/posts/02_frontend/vue/02_component-communication'
                    },
                    {
                        text: 'Vue 状态管理',
                        link: '/posts/02_frontend/vue/03_state-management'
                    }
                ]
            },
            {
                text: 'React 生态',
                link: '/posts/02_frontend/react/',
                items: [
                    {
                        text: 'React Hooks 原理',
                        link: '/posts/02_frontend/react/01_hooks'
                    },
                    {
                        text: 'React 并发模式',
                        link: '/posts/02_frontend/react/02_concurrent-mode'
                    }
                ]
            }
        ]
    }
]
```

3️⃣ Sidebar 统一出口（sidebar/index.ts）

```ts
import type {DefaultTheme} from 'vitepress'
import {backendSidebar} from './backend'
import {frontendSidebar} from './frontend'

export const sidebar: DefaultTheme.Sidebar = {
    '/posts/01_backend/': backendSidebar,
    '/posts/02_frontend/': frontendSidebar
}
``` 

最后`.vitepress/config.mts`中`nav`和`sidebar`变得极其干净

```ts
import {defineConfig} from 'vitepress'
import {nav} from './nav'
import {sidebar} from './sidebar'

export default defineConfig({
    title: '技术博客',
    description: '后端 & 前端技术沉淀',

    themeConfig: {
        nav,
        sidebar
    }
})
```

🎉 至此，config.mts 完全“解耦”， 仓库链接: https://github.com/stef4java/my-vitepress-blog.git ,原`config.mts`备份为
`config.mts.bak`,大家可以对比感受下。

## 二、图床推荐
基于 GitHub API 开发的图床工具: [PicX 安全&免费的图床工具](https://picx-docs.xpoet.cn/)
文档写的很清晰，配置也简单，我就不赘述了。


## 三、参考链接
1. 文章分类很清晰,文件名加数字前缀，管理起来也方面: [周一的博客](https://mondaylab.github.io/mondaylab-blog/)
2. [VitePress官网](https://vitepress.dev/zh/)