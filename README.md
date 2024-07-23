# HoskiBusiness-UI

> 基于 Element-ui 二次封装基础组件地址
>
## [Hoski-Business-UI 使用Demo项目](https://github.com/wocwin/wocwin-admin)

>`Hoski-Business-UI`是基于 Vue3.3、TypeScript、Vite4、Pinia、Element-Plus 开发的 Hoski 业务组件库



## npm 方式安装使用

```shell
pnpm i hoski-business-ui
```

## 全局注册使用

> ### 前提条件：使用项目必须全局注册 Element-plus组件库

```js
// 在main.js中按下引入
import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import locale from "element-plus/es/locale/lang/zh-cn";
// element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import HoskiBsUI from 'hoski-business-ui'
import 'hoski-business-ui/lib/style.css'
const app = createApp(App)
// 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  // 注册ElementPlus
  app.use(ElementPlus, {
    locale // 语言设置
    // size: Cookies.get('size') || 'medium' // 尺寸设置
  });
app.use(HoskiBsUI)
app.mount('#app')
```

## 按需引入

```js
// 在main.js中按下引入
import 'hoski-business-ui/lib/style.css'
// 单个.vue文件引入
<script setup lang="ts">
  import {HoskiMap, HoskiVideo} from "hoski-business-ui"
</script>
```
## 全部组件如下
```json
HoskiMap,
HoskiVideo
```

## hoski-business-ui Volar 组件类型提示

```js
// 需要在使用的项目的tsconfig.json文件中添加以下
compilerOptions：{
  "types": [
      "hoski-business-ui/components.d.ts",
    ],
}

```

## 安装依赖
> ### 注意: 本地环境版本最好安装 [Node.js 16.x+](https://nodejs.org/en)、[pnpm 7.x+](https://github.com/pnpm/pnpm/)

```shell
npm install -g pnpm

pnpm install

```

## 本地运行 vuepress 中组件文档

```shell
// docs项目(文档demo示例)基于vue3+vite项目
npm run docs:dev

```


## Git 提交规范

- `ci`: ci 配置文件和脚本的变动;
- `chore`: 构建系统或辅助工具的变动;
- `fix`: 代码 BUG 修复;
- `feat`: 新功能;
- `perf`: 性能优化和提升;
- `refactor`: 仅仅是代码变动，既不是修复 BUG 也不是引入新功能;
- `style`: 代码格式调整，可能是空格、分号、缩进等等;
- `docs`: 文档变动;
- `test`: 补充缺失的测试用例或者修正现有的测试用例;
- `revert`: 回滚操作;
