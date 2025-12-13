---
title: 博客搭建-03. 添加思维导图(markmap)和mermaid图表支持
author: Stef
date: '2025-12-13'
categories:
  - 博客搭建
tags:
  - VitePress
  - markmap
  - mermaid
description: 添加思维导图(markmap)和mermaid图表支持
sidebar: 'auto'
---

# 博客搭建-03. 添加思维导图(markmap)和mermaid图表支持
写文章的过程中，不可避免的添加思维导图和图表，方便读者快速理解文章内容，这里介绍如何添加。

## 一、安装插件
```shell
pnpm add vitepress-plugin-legend
```
## 二、配置插件
在`vitepress.config.ts`文件中添加如下配置：
```ts{2,6-15}
// ... 省略
import {vitepressPluginLegend} from 'vitepress-plugin-legend' // [!code ++]

export default defineConfig({
    // ... 省略
    markdown: {// [!code ++]
        config(md) {// [!code ++]
            vitepressPluginLegend(md, {// [!code ++]
                markmap: {// [!code ++]
                    showToolbar: true // [!code ++]
                },// [!code ++]
                mermaid: true // [!code ++]
            })// [!code ++]
        }// [!code ++]
    }// [!code ++]
})
```
修改`.vitepress/theme/index.ts`文件
```ts{2,3,8}
// ... 省略
import { initComponent } from 'vitepress-plugin-legend/component'// [!code ++]
import 'vitepress-plugin-legend/dist/index.css'// [!code ++]

export default {
// ... 省略
  enhanceApp({ app, router, siteData }) {
    initComponent(app)// [!code ++]
  }
} satisfies Theme
```

## 三、使用
> 在代码块中添加`markmap`或`mermaid`标签即可
### markmap示例
```markmap
# Markmap Example
## Links
- <https://markmap.js.org/>
- [GitHub](https://github.com/gera2ld/markmap)
## Related
- [coc-markmap](https://github.com/gera2ld/coc-markmap)
- [gatsby-remark-markmap](https://github.com/gera2ld/gatsby-remark-markmap)
## Features
### Features1
- links1
- links2
- links3
### Features2
- links
- **inline** ~~text~~ *styles*
- multiline
  text
- `inline code`
- `<video>`
```
### (可全屏查看)OAuth2.0下AccessToken和RefreshToken交互时序图
```mermaid
sequenceDiagram
    participant User as 用户/客户端
    participant App as 前端应用
    participant Auth as 认证服务器
    participant API as 资源服务器
    participant DB as 数据库

    %% 初始登录获取Token
    Note over User,Auth: 1. 初始认证流程
    User->>App: 提交用户名密码
    App->>Auth: POST /oauth/token<br>grant_type=password<br>username,password
    Auth->>DB: 验证用户凭证
    DB-->>Auth: 验证结果
    Auth->>Auth: 生成Token对
    Auth-->>App: 返回响应:<br>- access_token (短时效)<br>- refresh_token (长时效)<br>- expires_in
    App-->>User: 登录成功

    %% 正常访问资源
    Note over App,API: 2. 使用AccessToken访问
    User->>App: 请求受保护资源
    App->>API: GET /api/resource<br>Header: Bearer {access_token}
    API->>Auth: 验证token有效性
    Auth-->>API: token有效
    API-->>App: 返回资源数据
    App-->>User: 显示数据

    %% Token过期刷新
    Note over App,Auth: 3. AccessToken过期刷新
    User->>App: 再次请求资源
    App->>API: GET /api/resource<br>Header: Bearer {expired_token}
    API->>Auth: 验证token
    Auth-->>API: token已过期
    API-->>App: 401 Unauthorized
    
    App->>Auth: POST /oauth/refresh<br>grant_type=refresh_token<br>refresh_token={refresh_token}
    Auth->>DB: 验证refresh_token有效性
    DB-->>Auth: 验证通过
    Auth->>Auth: 生成新的Token对
    Auth-->>App: 返回新Token对
    App->>API: 用新token重试请求
    API-->>App: 返回资源数据
    App-->>User: 显示数据
```

## 四、参考链接
1. [VitePress & Markmap](https://www.liujiajia.me/2025/4/8/vitepress-and-makrmap.html)
2. [vitepress-plugin-legend](https://github.com/flingyp/vitepress-plugin-legend)
3. [markmap:markdown + mindmap](https://markmap.js.org/repl)