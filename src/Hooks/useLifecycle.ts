/**
 * 组件中开启map.ts生命周期，在组件的map.ts中获取viewer进行相关操作
 */
import { Viewer } from "cesium"
import { inject, onBeforeMount, onBeforeUnmount } from "vue"

export default function useLifecycle(mapWork: any, params?: any): void {
    const getMapViewer = inject<any>("getMapViewer")
    // 拿到viewer
    onBeforeMount(() => {
        if (mapWork.onMounted) {
            const viewer = getMapViewer()
            mapWork.onMounted(viewer, params)
        }
    })

    // 执行组件的销毁操作
    onBeforeUnmount(() => {
        if (mapWork.onUnmounted) {
            mapWork.onUnmounted()
        }
    })
}