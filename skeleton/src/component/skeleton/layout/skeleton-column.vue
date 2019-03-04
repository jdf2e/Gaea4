<template>
    <div
        class="vue-skeleton-column"
        :style="{
            width: width,
            padding: padding,
            'align-items':center
        }"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "column",
    props: {
        width: {
            type: String,
            width: "auto"
        },
        padding: {
            type: String,
            default: "0 0 0 0"
        },
        center:{
            type:String,
             default:"flex-start"
        }
    },
    data() {
        return {};
    }
};
</script>
