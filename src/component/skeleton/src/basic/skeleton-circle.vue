<template>
    <div class="vue-skeleton-circle"
         ref="vueSkeletonCircle"
         :style="{
             'backgroundColor':backColor,
             'width':diameter,
             'height':diameter,
             'border-radius':'50%',
             'margin':margin
         }"
    >
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
            diameter:{
                type:String,
                default:'1rem'
            },
            margin:{
                type:String,
                default:'0 0 0 0'
            }
        }

    }

</script>

<style lang="scss">
    .vue-skeleton-circle{
      
       
    }
</style>