<script setup lang="ts">
import { onMounted } from "vue"
import * as Cesium from "cesium"

onMounted(() => {
    initViewer()
})

// 初始化3D地球
async function initViewer() {
    const viewer = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false, // 隐藏图层选择器
        geocoder: false, // 隐藏搜索框
        navigationHelpButton: false, // 隐藏帮助按钮
        homeButton: false, // 隐藏Home按钮
        sceneModePicker: false, // 隐藏3D/2D切换按钮
        animation: false, // 隐藏动画控制按钮
        timeline: false, // 隐藏时间轴
        fullscreenButton: false, // 隐藏全屏按钮
        scene3DOnly: true, // 强制3D模式
        sceneMode: 3, // 初始场景模式 3D
        // 添加地形数据
        terrainProvider: await Cesium.CesiumTerrainProvider.fromIonAssetId(3956, {
            requestVertexNormals: true
        })
    })

    loadTDT(viewer, "1")

    defaultView(viewer)
}

// 加载天地图
function loadTDT(viewer: Cesium.Viewer, type: "1") {
    const tk = "d8255def31f95147c63972c3023775f3";

    let option = {
        tileMatrixSetID: "w",
        layer: "cva",
        style: "default",
        format: "tiles",
        minimumLevel: 0,
        maximumLevel: 18,
        subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
    }

    // 地图标注图层
    const imageryProvider_cva = new Cesium.WebMapTileServiceImageryProvider({
        url: `http://{s}.tianditu.gov.cn/cva_w/wmts?tk=${tk}`,
        ...option
    })

    // 添加地图标注
    viewer.imageryLayers.addImageryProvider(imageryProvider_cva)
}

// 默认视角
const defaultView = (viewer: Cesium.Viewer) => {
    const boundingSphere = new Cesium.BoundingSphere(
        Cesium.Cartesian3.fromDegrees(117.033801, 39.106866, 100),
        1500
    )

    viewer.camera.flyToBoundingSphere(boundingSphere, {
        duration: 2 // 单位是秒
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
