<template>
  <div class="video">
    <div class="video-title">【{{ layout }}】【{{ ratio }}】</div>
    <el-container class="video-container">
      <el-header height="46px" class="video-container-header">
        <div class="header-box">
          <div
              class="header-box-item"
              v-for="(module, i) in moduleItems"
              :key="i"
              @click="module.onEvent"
          >
            <el-icon class="pointer" size="25" color="#1D2129">
              <component :is="module.icon"/>
            </el-icon>
            <span class="pointer module-title" v-if="module.isCloseAll">{{
                module.currentValue
              }}</span>
            <el-dropdown v-else @command="handleCommand" popper-class="dropdown-showcase">
              <span class="dropdown-showcase module-title">
                <span class="pointer">{{ module.currentValue.value.replace(/\"/g, ' ') }}</span>
                <el-icon class="el-icon--right">
                  <CaretBottom/>
                </el-icon>
              </span>
              <template #dropdown v-if="!module.isCloseAll">
                <el-dropdown-menu>
                  <el-dropdown-item
                      v-for="menu in module.select"
                      :key="menu.value"
                      :command="`${module.name}-${menu.value}`"
                  >
                    {{ menu.label }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main class="video-container-main">
        <VideoPlayer
            v-if="onShow"
            style="width: 100%"
            :receive-count="receiveCount"
            :source="newSource"
            :ratio="ratio"
        />
        <el-empty v-else description="暂无内容"/>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {onBeforeMount, ref, shallowRef} from "vue"
import type {Component, Ref, PropType} from "vue"
import {CaretBottom} from "@element-plus/icons-vue"
import CloseAll from "../../svgIcon/close-all.vue"
import CodeStream from "../../svgIcon/code-stream.vue"
import Layout from "../../svgIcon/layout.vue"
import Ratio from "../../svgIcon/ratio.vue"
import VideoPlayer from "./VideoPlayer.vue"
import {VideoSource} from "./type"
import mitt from "./utils"

type Select = { label: string; value: string }
type ModuleItems = {
  name: string
  icon: Component
  isCloseAll: boolean
  currentValue: Ref<string>
  select: Select[]
  onEvent?: Function
}
defineOptions({
  name: "HoskiVideo"
})
const props = defineProps({
  source: {
    type: Array as PropType<VideoSource[]>,
    default: () => []
  },
  codeStreamData: {
    type: Array as PropType<Select[]>,
    default: () => []
  }
})
const newSource = ref<VideoSource[]>([])
const onShow = ref<boolean>(true)
const emit = defineEmits(["closeAll", "selectEvent", "videoOption"])
const ratio = ref<string>("4:3")
const layout = ref<string>("4宫格")
const receiveCount = ref<number>(4)
//替换资源
onBeforeMount(() => {
  newSource.value = [...props.source]
  mitt.on("clickVideo", (source: VideoSource) => {
    if ([6, 8].includes(receiveCount.value)) {
      const idx = newSource.value?.findIndex(v => v.sourceId === source.sourceId)
      const temp = newSource.value[0]
      newSource.value[0] = source //替换第一个位置的视频
      newSource.value[Number(idx)] = temp
    }
  })
})
const closeAll = () => {
  onShow.value = false
  emit("closeAll")
}
const moduleItems = shallowRef<ModuleItems[]>([
  {
    name: "CloseAll",
    icon: CloseAll,
    isCloseAll: true,
    currentValue: `全部关闭`,
    select: [],
    onEvent: closeAll
  },
  {
    name: "CodeStream",
    icon: CodeStream,
    isCloseAll: false,
    currentValue: ref<string>("子码流"),
    select: props.codeStreamData
  },
  {
    name: "Layout",
    icon: Layout,
    isCloseAll: false,
    currentValue: ref<string>("4宫格"),
    select: [
      {label: "1宫格", value: "1"},
      {label: "4宫格", value: "4"},
      {label: "1大5小", value: "6"},
      {label: "1大7小", value: "8"},
      {label: "9宫格", value: "9"},
      {label: "16宫格", value: "16"}
    ]
  },
  {
    name: "Ratio",
    icon: Ratio,
    isCloseAll: false,
    currentValue: ref<string>("4:3"),
    select: [
      {label: "4:3", value: "4:3"},
      {label: "16:9", value: "16:9"}
    ]
  }
])

/**
 * 下拉菜单事件暴露
 * @param command
 */
const handleCommand = (command: string) => {
  emit("selectEvent", command)
  const name = command.split("-")[0]
  const selectValue = command.split("-")[1]
  moduleItems.value.forEach((item: ModuleItems) => {
    if (item.name === name) {
      item.select.forEach((_item: Select) => {
        if (_item.value === selectValue) {
          item.currentValue.value = _item.label

          if (name === "Layout") {
            layout.value = _item.label
            receiveCount.value = Number(selectValue)
          }

          if (name === "Ratio") {
            ratio.value = _item.label
            mitt.emit("ratio", command)
          }
        }
      })
    }
  })
}
const passVideoOption = (val: number) => {
  emit("videoOption", val)
}
onBeforeMount(() => {
  onShow.value = true
  mitt.on("video-option", e => {
    passVideoOption(e as number)
  })
})
</script>
<style lang="scss">
.pointer {
  cursor: pointer;
}

.dropdown-showcase {
  cursor: pointer;
  display: flex;
  align-items: center;
  border: none;
}

.video {
  padding: 20px 15px;
  background: white;
  height: 100%;
  box-sizing: border-box;

  &-title {
    margin-bottom: 20px;
  }

  &-container {
    background: #f3f7fa;
    height: calc(100% - 35px);

    &-header {
      .header-box {
        display: flex;
        align-items: center;
        justify-content: end;
        height: 100%;
        gap: 20px;

        &-item {
          display: flex;
          align-items: center;
          height: 100%;

          .module-title {
            color: #4e5969;
          }
        }
      }
    }

    &-main {
      background: #252525;
      color: white;
      padding: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
