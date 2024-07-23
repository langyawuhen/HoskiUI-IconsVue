<template>
  <div class="cell">
    <div class="cell-player">
      <div :class="cellClass(i)" v-for="(v, i) in afterSource" :key="i">
        <VideoCellPlayer :ratio="ratio" :source="v" v-if="cellCount != 6 && cellCount != 8" />
        <VideoCellPlayer :ratio="ratio" :source="v" v-if="cellCount == 6 && i != 1 && i != 2" />
        <template v-if="cellCount == 6 && i == 1">
          <div class="cell-player-6-2-cell">
            <VideoCellPlayer :ratio="ratio" :source="v" />
            <VideoCellPlayer :ratio="ratio" :source="afterSource[i + 1]" />
          </div>
        </template>

        <VideoCellPlayer
          :ratio="ratio"
          :source="v"
          v-if="cellCount == 8 && i != 1 && i != 2 && i != 3"
        />
        <template v-if="cellCount == 8 && i == 1">
          <div class="cell-player-8-2-cell" v-if="i == 1">
            <VideoCellPlayer :ratio="ratio" :source="v" />
            <VideoCellPlayer :ratio="ratio" :source="afterSource[i + 1]" />
            <VideoCellPlayer :ratio="ratio" :source="afterSource[i + 2]" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { type PropType, ref, watch, computed, onBeforeMount } from "vue"
import VideoCellPlayer from "./VideoCellPlayer.vue"
import { ElMessage } from "element-plus"
import { VideoSource } from "./type"

const props = defineProps({
  receiveCount: {
    type: Number,
    default: 4
  },
  source: {
    type: Array as PropType<VideoSource[]>,
    default: () => []
  },
  ratio: {
    type: String,
    default: "4:3"
  }
})
const cellCount = ref<number>(4)
watch(
  () => props.receiveCount,
  (nv: number) => {
    cellCount.value = nv
  }
)
const afterSource = computed(() => {
  const { source, receiveCount } = props
  const newSource: VideoSource[] = []
  if (source.length > receiveCount) {
    ElMessage({
      message: "请重新选择布局！",
      type: "warning"
    })
    return []
  }
  for (let i = 0; i < receiveCount - source.length; i++) {
    newSource.push({
      sourceId: "",
      videoSrc: "",
      title: "",
      speed: "",
      codeStream: ""
    })
  }
  return [...source, ...newSource]
})

const cellClass = (index: number) => {
  switch (cellCount.value) {
    case 1:
      return ["cell-player-1"]
    case 4:
      return ["cell-player-4"]
    case 6:
      if (index == 0) return ["cell-player-6-1"]
      if (index == 1) return ["cell-player-6-2"]
      if (index == 2) return ["cell-player-6-none"]
      return ["cell-player-6"]
    case 8:
      if (index == 0) return ["cell-player-8-1"]
      if (index == 1) return ["cell-player-8-2"]
      if (index == 2 || index == 3) return ["cell-player-8-none"]
      return ["cell-player-8"]
    case 9:
      return ["cell-player-9"]
    case 16:
      return ["cell-player-16"]
    default:
      break
  }
}
</script>
<style scoped lang="scss">
.cell {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  .cell-player {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .cell-player-1 {
      width: 100%;
      box-sizing: border-box;
    }

    .cell-player-4 {
      width: 50%;
      height: 50% !important;
      box-sizing: border-box;
    }

    .cell-player-9 {
      width: 33.33%;
      height: 33.33% !important;
      box-sizing: border-box;
    }

    .cell-player-16 {
      width: 25%;
      height: 25% !important;
      box-sizing: border-box;
    }

    .cell-player-6 {
      width: 33.33%;
      height: 33.33% !important;
      box-sizing: border-box;
    }

    .cell-player-6-1 {
      width: 66.66%;
      height: 66.66% !important;
      box-sizing: border-box;
    }

    .cell-player-6-2 {
      width: 33.33%;
      height: 33.33% !important;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    .cell-player-6-none {
      display: none;
    }

    .cell-player-6-2-cell {
      width: 100%;
      height: 100% !important;
      box-sizing: border-box;
    }

    .cell-player-8 {
      width: 25%;
      height: 25% !important;
      box-sizing: border-box;
    }

    .cell-player-8-1 {
      width: 75%;
      height: 75% !important;
      box-sizing: border-box;
    }

    .cell-player-8-2 {
      width: 25%;
      box-sizing: border-box;
      flex: 1;
    }

    .cell-player-8-none {
      display: none;
    }

    .cell-player-8-2-cell {
      width: 100%;
      height: 100% !important;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
