<template>
  <div id="tile-map" />
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue"
import { shallowRef } from "@vue/reactivity"
import TileLayer from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import "ol/ol.css"
import { Feature, Map, View } from "ol"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Point } from "ol/geom"
import { fromLonLat } from "ol/proj"
import { Fill, Style, Text } from "ol/style"

const map = shallowRef<any>(null)
const pointLayer = ref(null)
const mapView = {
  center: fromLonLat([110.23024, 36.65505]), // 地图中心点
  zoom: 5, // 初始缩放级别
  minZoom: 5, // 最小缩放级别
  constrainResolution: true,
  maxZoom: 13 // 最大缩放级别
}
const mapUrl = `http://localhost/static/roadmap/{z}/{x}/{y}.png`

// const mapUrl2 = `http://localhost/static/roadmap/{z}/{x}/{y}.jpg`

/**
 * 初始化瓦片地图
 */
function initTileMap() {
  const tileLayer = new TileLayer({
    source: new XYZ({
      url: mapUrl
    })
  })
  // const tileLayer2 = new TileLayer({
  //   visible: true,
  //   source: new XYZ({
  //     url: mapUrl2
  //   })
  // })
  map.value = null
  map.value = new Map({
    // layers: [tileLayer2, tileLayer],
    layers: [tileLayer],
    view: new View(mapView),
    target: "tile-map", // 将地图注入到 dom 元素中
    projection: "EPSG:4326"
  })
  addPoints()
}

function addPoints(coordinate = [110.23024, 36.65505]) {
  // 设置图层
  pointLayer.value = new VectorLayer({
    source: new VectorSource()
  })
  // 添加图层
  map.value.addLayer(pointLayer.value)
  // 创建feature
  const feature = new Feature({
    geometry: new Point(fromLonLat(coordinate))
  })
  feature.setStyle(getIcon(coordinate))
  pointLayer.value.getSource().addFeatures([feature])
}

function getIcon(coordinate) {
  const styleIcon = new Style({
    // 设置图片效果
    // image: new Icon({
    //   src: require("@/assets/vue.svg"),
    //   anchor: [1, 1],
    // }),
    // text: new Text({
    //   text: "一个点位",
    //   font: "20px font-size",
    //   fill: new Fill({
    //     color: "#fff",
    //   }),
    //   offsetY: 10,
    // }),
  })
  return styleIcon
}

onMounted(() => {
  initTileMap()
})
onBeforeMount(() => {
  map.value = null
})
</script>
<style lang="scss" scoped>
#tile-map {
  width: 100%;
  height: 100%;
}
</style>
