import type { Point } from "@/api/models/Point"

import { Viewer } from "cesium"
import * as Cesium from "cesium"


let mapViewer: Viewer | null

export function onMounted(viewer: Viewer, params?: any) {
    mapViewer = viewer

    // addPoints(viewer)

    addRectangle(viewer)
}

export function onUnmounted(viewer: Viewer, params?: any) {
    mapViewer = null
}


// 添加测试点位
export function addPoints(points: Point[]) {

    console.log(points)
    points.forEach((pInfo: Point) => {
        mapViewer!.entities.add({
            id: String(pInfo.id),
            position: Cesium.Cartesian3.fromDegrees(
                Number(pInfo.longitude),
                Number(pInfo.latitude)
            ),
            label: {
                text: pInfo.psName,
                font: "18px monospace",
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                fillColor: Cesium.Color.AQUA,
                outlineWidth: 2,
                outlineColor: Cesium.Color.WHITE,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直方向以底部来计算标签的位置
                pixelOffset: new Cesium.Cartesian2(0, -30), // 偏移量
            },
            // point: {
            //     pixelSize: 5,
            //     color: Cesium.Color.RED,
            //     outlineColor: Cesium.Color.WHITE,
            //     outlineWidth: 2,
            // },
            // 图标
            billboard: {
                image: `/assets/images/point-${pInfo.type}.png`,
                // scale: 0.2
            },
        })
    })

}

// 添加立体方块
function addRectangle(viewer: any) {

    viewer.entities.add({
        name: "test rectangle",
        position: Cesium.Cartesian3.fromDegrees(117.019177, 39.102918, 100.0),
        box: {
            // new Cesium.Cartesian3(长, width, height)
            dimensions: new Cesium.Cartesian3(40.0, 100.0, 150.0),
            material: Cesium.Color.BLUE, // 配置颜色
            // material: Cesium.Color.RED.withAlpha(0.5), // 配置颜色透明度
            // fill: false, // 配置 是否填满
            // outline: true, // 配置 是否显示外边框线
            // outlineColor: Cesium.Color.YELLOW, // 配置 设置外边框线颜色
        },
    })
}