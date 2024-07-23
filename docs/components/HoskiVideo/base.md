# HoskiVideo 视频组件

### 基础用法

:::demo
HoskiVideo/base
:::

### 配置属性

```ts
type VideoSource = {
  sourceId: string
  videoSrc: string
  title: string
  speed: string
  codeStream: string
}
```

| 参数     | 说明                             | 类型                                                                              | 默认值        |
| :------- |:-------------------------------|:--------------------------------------------------------------------------------|:-----------|
| source    | 视频资源                           | VideoSource | {}         |
| @close-all    | 关闭所有事件                         |                                                                           |      |
| @select-event | 下拉事件 事件项-事件值                   |                                                                           |  |
|  @videoOption | video 的操作事件，0为是否播放，1是截图，2是是否全屏 |                                                                           |  |
| :codeStreamData | 自定义子码流                         |                                                                           |  |
