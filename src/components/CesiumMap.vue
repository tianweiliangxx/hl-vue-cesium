<script setup lang="ts">
import { onMounted } from "vue"
import * as Cesium from "cesium"

onMounted(() => {
    initViewer()
})

// 初始化3D地球
async function initViewer() {
    const viewer = new Cesium.Viewer("cesiumContainer", {
        // 添加地形数据
        terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(3956, {
            requestVertexNormals: true
        })
    })
}

</script>

<template>
    <div id="cesiumContainer"></div>
</template>

<style lang="less" scoped>
#cesiumContainer {
    width: 100%;
    height: 100vh;
}
</style>
