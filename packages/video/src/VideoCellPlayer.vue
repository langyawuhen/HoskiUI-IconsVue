<template>
  <div class="player">
    <div class="hoski-video">
      <HoskiVideo ref="hoskiVideo" :source="source" :ratio="ratio" autoPlay />
    </div>
    <div class="player-title">{{ source.title }}</div>
    <div
      class="player-option"
      :style="{ 'justify-content': source.speed === '' ? 'flex-end' : 'space-between' }"
    >
      <span v-if="source.speed">{{ source.speed }} {{ source.codeStream }}</span>
      <div>
        <el-icon class="icon" size="25" v-for="(option, index) in optionItems" :key="index">
          <component :is="option.icon" @click="option.clickEvent" />
        </el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type PropType, computed, onMounted } from "vue"
import Play from "../../svgIcon/play.vue"
import Camera from "../../svgIcon/camera.vue"
import OpenFullScreen from "../../svgIcon/open-full-screen.vue"
import HoskiVideo from "./HoskiVideo.vue"
import { VideoSource } from "./type"
import Pause from "../../svgIcon/pause.vue"
import CloseFullScreen from "../../svgIcon/close-full-screen.vue"
import mitt from "./utils"

defineProps({
  source: {
    type: Object as PropType<VideoSource>,
    default: () => {}
  },
  ratio: {
    type: String,
    default: "4:3"
  }
})
const emit = defineEmits(["video-option"])
const isFullScreen = ref<boolean>(false)
const isOnPlaying = ref<boolean>(true)
const hoskiVideo = ref()

const optionItems = computed(() => {
  return [
    { icon: isOnPlaying.value ? Play : Pause, clickEvent: () => clickEvent(0) },
    { icon: Camera, clickEvent: () => clickEvent(1) },
    { icon: isFullScreen.value ? OpenFullScreen : CloseFullScreen, clickEvent: () => clickEvent(2) }
  ]
})
const clickEvent = (val: number) => {
  mitt.emit("video-option", val)
  switch (val) {
    case 0:
      isOnPlaying.value = !isOnPlaying.value
      if (!isOnPlaying.value) {
        hoskiVideo.value.hoskiRef.play()
      } else {
        hoskiVideo.value.hoskiRef.pause()
      }
      break
    case 1:
      hoskiVideo.value.hoskiRef.pause()
      isOnPlaying.value = true
      //当前播放位置
      const currentTime = hoskiVideo.value.hoskiRef.currentTime
      console.log(`当前播放的位置为${currentTime}`)
      //视频总时长
      // const duration = hoskiVideo.value.hoskiRef.duration
      // console.log("duration ===>", duration)
      break
    case 2:
      isFullScreen.value = !isFullScreen.value
      fullscreenFun()
      break
  }
}

// 全屏播放
function fullscreenFun() {
  const ele: any = hoskiVideo.value.hoskiRef
  if (ele?.requestFullscreen) {
    ele?.requestFullscreen()
  } else if (ele?.mozRequestFullScreen) {
    ele?.mozRequestFullScreen()
  } else if (ele?.webkitRequestFullScreen) {
    ele?.webkitRequestFullScreen()
  }
}

onMounted(() => {})
</script>
<style scoped lang="scss">
.player {
  background-color: black;
  height: 100%;
  border: 1px solid #86909c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    border: 2px solid #2961f5;

    .player-option {
      opacity: 1;
      transition: opacity 300ms linear 0s;
    }
  }

  .hoski-video {
    width: 100%;
    height: 100%;
  }

  &-title {
    position: absolute;
    top: 20px;
    left: 20px;
    //color: #1D2129;
    color: white;
  }

  &-option {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background-color: rgba(29, 33, 41, 0.6);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 14px;
    opacity: 0;
    transition: opacity 500ms linear 2s;

    .icon {
      cursor: pointer;
    }

    .icon:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
