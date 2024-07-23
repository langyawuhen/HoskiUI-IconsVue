<template>
  <!--地图容器-->
  <div class="map">
    <AMap ref="amap" v-if="currentMap == 1" />
    <TileMap ref="tilemap" v-else />
    <div class="select">
      <el-select
        v-model="currentMap"
        :suffix-icon="ArrowDown"
        placeholder="选择地图"
        style="width: 120px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue"
import { ArrowDown } from "@element-plus/icons-vue"
import AMap from "./AMap.vue"
import TileMap from "./TileMap.vue"

defineOptions({
  name: "HoskiMap"
})

interface Option {
  label: string
  value: number
}

const amap = ref<HTMLElement>()
const tilemap = ref<HTMLElement>()
const currentMap = ref<number>(1)
const options = reactive<Option[]>([
  {
    value: 1,
    label: "高德地图"
  },
  {
    value: 2,
    label: "瓦片地图"
  }
])

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("position ===>", position)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log("Latitude: " + latitude + " Longitude: " + longitude)
        // initMap()
      },
      err => {
        console.log("err ===>", err)
      }
    )
  } else {
    console.log("Geolocation is not supported by this browser.")
  }
}
</script>
<style lang="scss">
.map {
  width: 100%;
  height: 100%;
  position: relative;
}

.select {
  position: absolute;
  right: 4rem;
  top: 4rem;
  z-index: 999;
}

.select-map {
  .select__container {
    padding: 5px 20px;
    border-radius: 6px;

    .item-border {
      border-bottom: 1px solid #f1f4f7;
    }

    &-item {
      padding: 15px 0;

      &-label {
        width: 86px;
        height: 30px;
        line-height: 30px;
        text-align: left;
        margin-right: 20px;
        border-radius: 6px;
        font-size: 14px;
        opacity: 1;
        color: #4e5969;
      }
    }
  }
}
</style>
