<template>
    <div>
        <div class="wrapper" >
            <div class="box">我是首页2</div>
            <router-link to="/detail"><h3>去详情页1</h3></router-link>
            <router-link to="/detail2"><h3>去详情页2（懒加载）</h3></router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
    data(){
        return{
            
        }
    },
    components: {
    },
    methods:{
       
    },
    created(){

    },
    mounted(){
       
    },
    destroyed(){

    }
}
</script>

<style lang="scss" scoped>
     .box{
        display: flex;
    }
</style>