import {DefaultTheme} from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    {
        text: '首页',
        link: '/'
    },
    {
        text: '精选专栏',
        items: [
            {
                text: '23种设计模式',
                link: '/posts/01DesignPattern/'
            }
        ]
    },
    {
        text: '博客搭建',
        items: [
            {
                text: '博客搭建',
                link: '/posts/98BlogSetup/'
            }
        ]
    },
    {
        text: '关于我',
        items: [
            {text: 'Github', link: 'https://github.com/stef4java'}
        ]
    }
];