<template>
  <div style="height: 700px; width: 100%">
    <hoski-video
      :source="source"
      @close-all="closeAll"
      @select-event="selectEvent"
      @videoOption="videoOption"
      :codeStreamData="codeStreamData"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"

type VideoSource = {
  sourceId: string
  videoSrc: string
  title: string
  speed: string
  codeStream: string
}
const source = ref<VideoSource[]>([
  {
    sourceId: "1",
    videoSrc: "https://www.w3schools.com/html/movie.mp4",
    title: "苏A·1R89J-通道1",
    speed: "23Kb/s",
    codeStream: "8920KB"
  },
  {
    sourceId: "2",
    videoSrc: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    title: "苏A·1R89J-通道2",
    speed: "23Kb/s",
    codeStream: "8920KB"
  },
  {
    sourceId: "3",
    videoSrc: "http://cdn3.toronto360.tv:8081/toronto360/hd/playlist.m3u8",
    title: "苏A·1R89J-通道3",
    speed: "23Kb/s",
    codeStream: "8920KB"
  },
  {
    sourceId: "4",
    videoSrc: "http://vjs.zencdn.net/v/oceans.mp4",
    title: "苏A·1R89J-通道4",
    speed: "23Kb/s",
    codeStream: "8920KB"
  }
])
const codeStreamData = [
  { label: "480P", value: "1" },
  { label: "720P", value: "1" },
  { label: "1080P", value: "1" }
]
/**
 * 全部关闭事件
 */
const closeAll = () => {
  source.value = []
  console.log("全部关闭")
}
/**
 * 下拉事件 事件项-事件值
 * @param val
 */
const selectEvent = (val: string) => {
  console.log("val ===>", val)
}
/**
 * video 的操作事件，0为是否播放，1是截图，2是是否全屏
 * @param val
 */
const videoOption = (val: number) => {
  console.log("val ===>", val)
}
</script>
