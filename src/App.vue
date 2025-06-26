<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import  CesiumMap from "@/components/CesiumMap.vue"

</script>

<template>
  <CesiumMap></CesiumMap>
  <RouterView class="box-view" />
</template>

<style scoped>
.box-view {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
