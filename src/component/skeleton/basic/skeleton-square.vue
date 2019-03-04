<template>
    <div class="vue-skeleton-square-wrap">
        <div
            v-for="i in count"
            :key="i"
            class="vue-skeleton-square"
            :style="{
                backgroundColor: backColor,
                width: width,
                height: height,
                margin: margin
            }"
        ></div>
    </div>
</template>

<script>
export default {
    name: "skeletonSquare",
    props: {
        backColor: {
            type: String,
            default: "#f1f1f1"
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "12px"
        },
        margin: {
            type: String,
            default: "0 0 0 0"
        },
        count: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {};
    }
};
</script>
