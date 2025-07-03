import type { Point } from "@/api/models/Point"

import { Viewer } from "cesium"
import * as Cesium from "cesium"


let mapViewer: Viewer | null
let handler: Cesium.ScreenSpaceEventHandler

export const myCustomEvt = new Cesium.Event()

export function onMounted(viewer: Viewer, params?: any) {
    mapViewer = viewer

    addRectangle(viewer)

    // 添加监听器
    addHandler(viewer)
}

export function onUnmounted(viewer: Viewer, params?: any) {
    mapViewer = null
}


// 添加测试点位
export function addPoints(points: Point[]) {
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

// 添加监听器
function addHandler(viewer: Viewer) {
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    handler.setInputAction((event: any) => {
        // 屏幕坐标转成世界坐标
        const cartesian = viewer.camera.pickEllipsoid(event.position, viewer.scene.globe.ellipsoid);

        if (cartesian) {
            // 转成地理坐标经纬度
            const cartagraphic = Cesium.Cartographic.fromCartesian(cartesian);

            // 将弧度转为度的十进制表示，保留5位小数
            const lon = Cesium.Math.toDegrees(cartagraphic.longitude).toFixed(5);
            const lat = Cesium.Math.toDegrees(cartagraphic.latitude).toFixed(5);

            flyToPoints(Number(lon), Number(lat))

            myCustomEvt.raiseEvent({
                type: "click",
                position: event.position
            })

            const scene = viewer.scene;
            scene.preRender.addEventListener(() => {

                // 将笛卡尔坐标系中的位置转换为画布坐标系中的位置。这通常用于将 HTML 元素放置在场景中对象相同的屏幕位置。
                const canvasPosition = scene.cartesianToCanvasCoordinates(cartesian, new Cesium.Cartesian2())

                if (Cesium.defined(canvasPosition)) {
                    myCustomEvt.raiseEvent({
                        type: "click",
                        position: canvasPosition
                    })
                }

                // 当前相机高度
                let n = scene.globe.ellipsoid.cartesianToCartographic(viewer.camera.position).height
                // 判断弹窗位置与相机高度的距离是否大于地球半径
                // 这里比的是相机当点位的距离，是否大于相机到地心的距离，如果大于相机到地心的距离说明，点位已经在地球的背面了
                if ((n += 1 * scene.globe.ellipsoid.maximumRadius, Cesium.Cartesian3.distance(viewer.camera.position, cartesian) > n)) {
                    myCustomEvt.raiseEvent({
                        type: "closePopup"
                    })
                } else {
                    myCustomEvt.raiseEvent({
                        type: "click",
                        position: canvasPosition
                    })
                }
            })
        }

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

// 点位定位
function flyToPoints(lon: number, lat: number) {
    const target = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(lon, lat, 100), 15000)
    if (mapViewer) {
        mapViewer.camera.flyToBoundingSphere(target)
    }
}