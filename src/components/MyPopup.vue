<script lang="ts" setup>

const props = defineProps<{
    position: {
        x: number,
        y: number
    },
    content: string
}>()

</script>

<template>
    <div class="popup-content" :style="{ left: props.position.x + 'px', top: props.position.y + 'px' }">
        <h1 class="text">{{ content }}</h1>
    </div>
</template>

<style lang="less" scoped>
.popup-content {
    position: absolute;
    top: 0;
    left: 0;
    // width: 200px;
    // height: 100px;
    background: #fff;

    .text {
        padding: 10px;
         white-space: nowrap;
    }
}
</style>