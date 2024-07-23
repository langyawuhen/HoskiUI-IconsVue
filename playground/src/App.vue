<script lang="ts" setup>
import { icons } from "@hoski-ui/icons-vue/src/global";
// import { Upload } from '@element-plus/icons-vue'
// import { Apple } from "@element-plus/icons-vue";
console.log("icons ===>",icons.Apple)

</script>

<template>
  <!--  <Upload class="icon" />-->
  <!--  <Plus class="icon" />-->
  <hr />
  <component :is="Icon" v-for="(Icon, key) in icons" :key="key" class="icon" />
  <hr />
  <component
    :is="`ElIcon${key}`"
    v-for="key in Object.keys(icons)"
    :key="key"
    class="icon"
  />
</template>

<style>
.icon {
  height: 48px;
  color: #409eff;
}
</style>
