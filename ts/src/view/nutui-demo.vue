<template>
    <div>
        <div class="wrapper" >
            <h4>NUTUI2.0 DEMO 页</h4>
            <p class="sub-title">推荐使用按需加载方式</p>
            <nut-cell title="打开日历组件" :showIcon = "true" @click.native="openDatePicker">
                
            </nut-cell>
            <nut-cell title="跳转按需加载方式(NPM版本)" :isLink="true" linkUrl="https://www.npmjs.com/package/@nutui/babel-plugin-separate-import"  :showIcon = "true"></nut-cell>
            <nut-cell title="跳转更多的NutUI2.0 DEMO" :isLink="true" linkUrl="https://nutui.jd.com/demo.html#/index"  :showIcon = "true"></nut-cell>
            <nut-cell title="跳转NutUI2.0 使用指南(PC版本)" :isLink="true" linkUrl="https://nutui.jd.com"  :showIcon = "true"></nut-cell>
           
            
            <div class="sub-title">评分组件</div>
            <nut-rate 
                @click="onRating"
            >
            </nut-rate>
            
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

<script  lang = "ts" >
import { DatePicker,Button, Rate } from '@nutui/nutui'
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({
    components: {
        'nut-button':Button,
        'nut-rate':Rate,
        'nut-datepicker': DatePicker
    }
})
export default class Demo extends Vue {
    isVisible: boolean = true
    date: any = null

    switchPicker(param: Array<String>): void {
        this[`${param}`] = !this[`${param}`]
    }

    setChooseValue(param: Array<String>): void {
        this.date = param[3]
    }

    openDatePicker(): void {
        this.isVisible = true
    }

    onRating(val): void {
        console.log(val)
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
       padding:0.4rem 0.1rem 0.1rem;
       font-size:0.36rem;
       color:#848689;
    }
    .sub-title{
        color:#333;
        font-size:0.24rem;
        line-height:0.48rem;
        text-align: center;
        

    }
</style>