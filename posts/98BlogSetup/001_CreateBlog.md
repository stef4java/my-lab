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
