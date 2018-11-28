<template>
    <div
        class="vue-skeleton-row"
        :style="{
            width:width,
            padding:padding,

        }"    
    >
        <slot></slot>

    </div>

</template>
<script>
    export default{
        data(){
            return{

            }
        },
        props:{
            width:{
                type:String,
                default:"100%"
            },
            padding:{
                type:String,
                default:"0 0 0 0"
            }
        },

    }

</script>

<style lang="scss">
    .vue-skeleton-row{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

</style>

