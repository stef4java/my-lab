import {defineConfig} from 'vitepress'
import {nav} from './nav'
import {sidebar} from "./sidebar";
import {vitepressPluginLegend} from 'vitepress-plugin-legend'

export default defineConfig({
    base: '/my-lab/',
    title: "Stef's Lab",
    description: "🌱探索自我的数字实验室✨",
    themeConfig: {
        logo: '/avatar.png',
        nav,
        sidebar,
        outline: {
            level: [1, 6],
            label: '目录'
        },
        search: {
            provider: 'local'
        },
        socialLinks: [
            {icon: 'github', link: 'https://github.com/stef4java'}
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Stef',
        }
    },
    markdown: {
        config(md) {
            vitepressPluginLegend(md, {
                markmap: {
                    showToolbar: true // 显示脑图工具栏（缩放/拖拽）
                },
                mermaid: true // 同时启用 Mermaid 支持
            })
        }
    },
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
})
