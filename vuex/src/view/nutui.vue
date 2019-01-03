<template>
    <div>
        <div class="wrapper" >
            <div class="box">我是NutUI2.0 DEMO 页面，推荐使用按需加载方式使用NUTUI2.0组件,推荐使用组件挂载NUTUI，通用组件，可以选择全局挂载</div>
            <router-link to="/detail"><h3>去详情页1</h3></router-link>
            <router-link to="/detail2"><h3>去详情页2（懒加载）</h3></router-link>

            <div class="">日历组件</div>
            <nut-button 
                @click="openDatePicker"
                >
            打开日历选择组件
            </nut-button>

            <div class="">评分组件</div>
            <nut-rating 
                @click="onRating"
            >
            </nut-rating>
            
        </div>

        <nut-datepicker 
            :is-visible="isVisible"
            type="date"
            title="请选择日期" 
            :is-show-chinese="false"
            @close="switchPicker('isVisible')"
            @choose="setChooseValue"
        >
        </nut-datepicker>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import { DatePicker,Button,Rating } from '@nutui/nutui';
export default {
    data(){
        return{
             isVisible: false,
             date:null,

        }
    },
    components: {
        'nut-datepicker':DatePicker,
        'nut-button':Button,
        'nut-rating':Rating
    },
    methods:{
        switchPicker(param) {
            this[`${param}`] = !this[`${param}`];
        },
        setChooseValue(param) {
            this.date = param[3];
        },
        openDatePicker(){
            this.isVisible = true;
        },
        onRating(val){
            console.log(val);
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
        font-size:12px;
        .box{
            font-size:18px;
            padding:10px 10px;
        }
    }
</style>