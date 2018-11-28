<template>
    <div class="vue-skeleton-square-wrap">
        <div class="vue-skeleton-square"
            v-for=" i in count"
            :key="i"
            :style="{
                'backgroundColor':backColor,
                'width':width,
                'height':height,
                'margin':margin
            }"
        >
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        props:{
            backColor:{
                type:String,
                default:'#efefef'
            },
            width:{
                type:String,
                default:'100%'
            },
            height:{
                type:String,
                default:'0.25rem',
            },
            margin:{
                type:String,
                default:'0 0 0 0'
            },
            count:{
                type:Number,
                default:1
            }
        }
    }

</script>
<style lang="scss">
    .vue-skeleton-square-wrap{
      
        justify-content: center;
       // align-items:center;
        display: flex;
        flex-direction: column;
        .vue-skeleton-square{
            width:100%;
        }
    }

</style>