import HoskiMap from "./map/src/map.vue"
import HoskiVideo from "./video/src/video.vue"

declare module "vue" {
  export interface GlobalComponents {
    HoskiMap: typeof HoskiMap
    HoskiVideo: typeof HoskiVideo
  }
}
