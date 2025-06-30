<script setup lang="ts">
import { onMounted } from "vue"
import { getPoints } from "@/api/index"

import type { Point } from "@/api/models/Point"

import useLifecycle from '@/Hooks/useLifecycle'
import * as mapWork from './map'

useLifecycle(mapWork)

let points: Point[]
onMounted(async() => {

  await fetchData()

  mapWork.addPoints(points)
})

// 获取数据
async function fetchData() {
  
  const res = await getPoints()

  points = res
}


</script>

<template>
  <main>
    <h2>123</h2>
  </main>
</template>
