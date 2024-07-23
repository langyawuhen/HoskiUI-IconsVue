<template>
  <div
    class="videoPlay"
    :style="{ '--w': ratio == '4:3' ? '80%' : '100%', '--a': ratio == '4:3' ? '-13%' : '0' }"
  >
    <video
      @contextmenu.prevent.stop="changeVideoSource(source)"
      ref="m3u8_video"
      class="video-js vjs-default-skin vjs-big-play-centered vjs-matrix"
      :controls="true"
    >
      <source :src="source.videoSrc" />
    </video>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import videojs, { VideoJsPlayer } from "video.js"
import "video.js/dist/video-js.css"
import zh from "video.js/dist/lang/zh-CN.json"
import mitt from "./utils"
import { VideoSource } from "./type"

const props = withDefaults(
  defineProps<{
    source: VideoSource
    autoPlay?: boolean
    ratio: string
  }>(),
  { autoPlay: false, ratio: "4:3" }
)
const m3u8_video = ref()
// const aspectRatio = ref<string>("4:3")
let player: VideoJsPlayer
const initPlay = async () => {
  videojs.addLanguage("zh-CN", zh)
  await nextTick()
  const options = {
    muted: true,
    controls: true,
    autoplay: true,
    loop: true,
    language: "zh-CN",
    techOrder: ["html5"]
    // aspectRatio: aspectRatio.value
  }
  player = videojs(m3u8_video.value, options, () => {
    videojs.log("播放器已经准备好了!")
    if (props.autoPlay && props.source.videoSrc) {
      player.play()
    }
    player.on("ended", () => {
      videojs.log("播放结束了!")
    })
    player.on("error", () => {
      videojs.log("播放器解析出错!")
    })
  })
}
onMounted(() => {
  initPlay()
})
const changeVideoSource = (source: VideoSource) => {
  mitt.emit("clickVideo", source)
}
//直接改变路径测试
watch(
  () => props.source.videoSrc,
  () => {
    player.pause()
    player.src(props.source.videoSrc)
    player.load()
    if (props.source.videoSrc) {
      player.play()
    }
  }
)
onBeforeUnmount(() => {
  player?.dispose()
})
defineExpose({
  hoskiRef: m3u8_video
})
</script>
<style lang="scss">
.video-js .vjs-control-bar,
.video-js .vjs-big-play-button,
.video-js .vjs-menu-button .vjs-menu-content {
  background-color: transparent;
  bottom: 16px;
}

.vjs-has-started .vjs-control-bar,
.vjs-audio-only-mode .vjs-control-bar {
  //opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.video-js .vjs-progress-control .vjs-progress-holder {
  //margin: 0 !important;
  //margin: 0 -13% !important;
  margin: 0 var(--a) !important;
}

.video-js .vjs-control {
  width: 0 !important;
}

span[aria-hidden="true"] {
  display: none;
}

//.vjs-remaining-time-display {
//  font-size: 14px;
//  margin-bottom: 5px;
//}

.video-js .vjs-play-progress {
  &:before {
    color: rgba(41, 97, 245, 1) !important;
    //box-shadow: 0 0 3px 3px rgba(41, 97, 245, 0.7);
    border-radius: 50%;

    :after {
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      background: red;
    }
  }
}

.video-js .vjs-time-control {
  position: absolute;
  right: 30px;
  bottom: 10px;
  margin: 0 -13% 12px -13% !important;
  font-size: 14px;
}

.video-js .vjs-slider {
  background-color: rgba(255, 255, 255, 0.4);
}

.vjs-matrix .vjs-volume-level,
.vjs-matrix .vjs-play-progress,
.vjs-matrix .vjs-slider-bar {
  background: #2961f5;
}

.vjs-icon-fullscreen-enter:before,
.video-js .vjs-fullscreen-control .vjs-icon-placeholder:before,
.vjs-icon-picture-in-picture-enter:before,
.video-js .vjs-picture-in-picture-control .vjs-icon-placeholder:before,
.vjs-icon-volume-mute:before,
.video-js .vjs-mute-control.vjs-vol-0 .vjs-icon-placeholder:before,
.vjs-icon-play:before,
.video-js .vjs-play-control .vjs-icon-placeholder:before {
  display: none;
}

[pseudo="-webkit-media-controls-volume-control-container"] {
  display: none;
}
</style>
<style lang="scss" scoped>
.videoPlay {
  --w: "80%";
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .video-js {
    height: 100%;
    width: var(--w);
    object-fit: fill;
  }
}

:deep(.vjs-tech) {
  object-fit: fill;
}
</style>
