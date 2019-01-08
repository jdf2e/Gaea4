<template>
    <div>
        <div class="wrapper" >
            <h4>详情页2(懒加载)</h4>
            <nut-cell title="跳转详情页" :isLink="true" @click.native="go(1)" :showIcon = "true"></nut-cell>
             <nut-cell title="跳转NutUI2.0 Demo页" :isLink="true" @click.native="go(2)" :showIcon = "true"></nut-cell>
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
       go(val){
           if(val == 1){
                this.$router.push({path:'/detail'});
           }else if(val == 2){
               this.$router.push({path:'/nutui'});
           }
          
       }
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
    .wrapper{
        color:#333;
        font-size:0.24rem;
    }
    h4{
       text-align: center;
       padding:0.4rem 0.1rem;
       font-size:0.36rem;
       color:#848689;

    }
</style>