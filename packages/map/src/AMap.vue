<template>
  <div id="amap" />
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, reactive, ref } from "vue"
import { shallowRef } from "@vue/reactivity" //引入
import AMapLoader from "@amap/amap-jsapi-loader"

const map = shallowRef<any>(null)

/**
 * 初始化高德地图
 */
function initAmap() {
  AMapLoader.load({
    key: "36746d6997269d0c539809a3aa2be708", //此处填入我们注册账号后获取的Key
    version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.CircleEditor", // 圆形编辑器插件
      "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
      "AMap.Geocoder", // 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
      "AMap.Autocomplete",
      "AMap.PlaceSearch",
      "AMap.CitySearch"
    ] //需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then(AMap => {
      map.value = new AMap.Map("amap", {
        viewMode: "3D", //是否为3D地图模式
        zoom: 5, //初始化地图级别
        center: [105.602725, 37.076636] //初始化地图中心点位置
      })
      // 监听地图的缩放级别
      map.value.on("zoomchange", () => {
        const zoom = map.value.getZoom()
        console.log("缩放", zoom)
      })
      map.value.on("zoomend", () => {
        // console.log("缩放结束")
      })
      const marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),
        offset: new AMap.Pixel(-10, -10),
        icon: "//vdata.amap.com/icons/b18/1/2.png", //添加 icon 图标 URL
        title: "北京"
      })
      map.value.add(marker)
    })
    .catch(e => {
      console.log(e)
    })
}

onMounted(() => {
  initAmap()
})
onBeforeMount(() => {
  map.value = null
})
</script>
<style lang="scss" scoped>
#amap {
  width: 100%;
  height: 100%;
}
</style>
