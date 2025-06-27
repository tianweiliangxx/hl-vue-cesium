

import { Viewer } from "cesium"

let mapViewer: Viewer | null

export function onMounted(viewer: Viewer, params?: any) {
    mapViewer = viewer
    console.log(mapViewer)
}

export function onUnmounted(viewer: Viewer, params?: any) {
    mapViewer = null
}