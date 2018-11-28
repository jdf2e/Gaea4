<template>
    <div class="vue-skeleton-loading">
        <div class="skeleton-bac-animation"></div>
        <div class="skeleton-bac-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import skeletonCircle from './basic/skeleton-circle.vue';
    import skeletonSquare from './basic/skeleton-square.vue';
    export default {
        data(){
            return{
                
            }
        },
        components: {
            skeletonCircle,
            skeletonSquare
        },
    }
</script>

<style lang="scss">
    .vue-skeleton-loading{
        position:fixed;
        top:0;
        right:0;
        bottom:0;
        left:0;
        z-index:99999;
        font-size: 12px;
        background:#fff;
        @keyframes backpos{
           
           from {
               background-position-x:-200px;
           }
           to{
              background-position-x:calc(200px + 100%);
           }
        }
        .skeleton-bac-animation {
            position:absolute;
            z-index:auto;
            width:100%;
            height:100%;
            background:linear-gradient(to right,rgba(255,255,255,0),rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 80%);
            background-size:30% 100%;
            background-repeat: no-repeat;
            -webkit-animation: backpos 0.9s ease-in-out 0s infinite;
            animation: backpos 0.9s ease-in-out 0s infinite;
        }
        .skeleton-bac-content{
            overflow: hidden;
        }
    }

</style>