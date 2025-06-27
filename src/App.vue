<script setup lang="ts">
import { ref, provide } from 'vue';
import {Viewer} from "cesium"

import { RouterLink, RouterView } from 'vue-router'
import  CesiumMap from "@/components/CesiumMap.vue"

let mapViewer: Viewer | null = null

// 只有他的子组件能注入到信息
provide("getMapViewer", () => {
    return mapViewer
})

const load = ref(false)

function viewerLoad(viewer: Viewer) {
  mapViewer = viewer

  load.value = true
}
</script>

<template>
  <CesiumMap @onLoad="viewerLoad"></CesiumMap>
  <RouterView v-if="load" class="box-view" />
</template>

<style scoped>
.box-view {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
