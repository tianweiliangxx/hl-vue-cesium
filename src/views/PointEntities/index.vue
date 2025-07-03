<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { getPoints } from "@/api/index"

import type { Point } from "@/api/models/Point"

import useLifecycle from '@/Hooks/useLifecycle'
import * as mapWork from './map'

import MyPopup from '@/components/MyPopup.vue'

let points: Point[]

const popupObject = reactive({
  visible: false,
  position: { x: 200, y: 200 },
  content: '弹窗测试'
})

useLifecycle(mapWork)

mapWork.myCustomEvt.addEventListener((event: {
  type: string
}) => {
  if (event.type === 'click') {
    popupObject.visible = true
    handleUpdatePopup(event)
  }
  if (event.type === "closePopup") {
    popupObject.visible = false
  }

  if (event.type === "updatePopup") {
    handleUpdatePopup(event)
  }
})


onMounted(async () => {

  await fetchData()

  mapWork.addPoints(points)
})

// 获取数据
async function fetchData() {

  const res = await getPoints()

  points = res
}

// 处理视图上的点击事件
// function handleViwerClick(event: any) {
//   popupObject.position.x = event.position.x;
//   popupObject.position.y = event.position.y;
// }

// 更新弹窗的信息
function handleUpdatePopup(event: any) {
  popupObject.position.x = event.position.x;
  popupObject.position.y = event.position.y;
}


</script>

<template>
  <main>
    <MyPopup v-if="popupObject.visible" :position="popupObject.position" :content="popupObject.content" />
  </main>
</template>
