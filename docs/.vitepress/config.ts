import { defineConfig } from "vitepress"
import { mdPlugin } from "./config/plugins"
export default defineConfig({
  title: "Hoski业务组件文档",
  description: "基于Element-plus基础组件封装使用",
  lang: "cn-ZH",
  base: "/hoski-business-ui/",
  lastUpdated: true,
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "Hoski业务组件文档",
    outline: 3,
    socialLinks: [
      { icon: "github", link: "https://gitee.com/jiangsu_cargo_base_network/hoski-business-ui.git" }
    ],
    nav: [
      {
        text: "安装指南",
        link: "/components/"
      },
      { text: "基础组件", link: "/components/HoskiMap/base.md" },
      {
        text: "Gitee 地址",
        link: "https://gitee.com/jiangsu_cargo_base_network/hoski-business-ui.git"
      }
    ],
    sidebar: {
      "/components": [
        {
          text: "常用组件",
          items: [
            { text: "地图组件", link: "/components/HoskiMap/base.md" },
            { text: "视频组件", link: "/components/HoskiVideo/base.md" }
          ]
        }
      ]
    }
  },
  markdown: {
    headers: {
      level: [0, 0]
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: "github-light", dark: "github-dark" },
    config: md => mdPlugin(md)
  }
})
