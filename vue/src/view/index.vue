<template>
    <div>
        <div class="wrapper" >
            <div class="box">我是首页</div>
            <router-link to="/detail"><h3>去详情页1</h3></router-link>
            <router-link to="/detail2"><h3>去详情页2（懒加载）</h3></router-link>
            <router-link to="/nutui"><h3>去Nutui 使用的Demo 页</h3></router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
export default {
    data(){
        return{
            spread:[1,2,3,4],
            obj:{
                name:'wangnan',
                age:'30'
            }
        }
    },
    components: {
    },
    methods:{
       
    },
    created(){

    },
    mounted(){
        let m = [3,4];
        console.log([...this.spread,...m]);
        let obj = Object.assign({},this.obj); 
        console.log('23232323:'+obj);
        for(let a of m){
            console.log(a);
        }
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