<template>
    <div>
        <div class="wrapper" >
            <div class="box">我是详情2</div>
            <router-link to="/detail"><h3>去详情页1</h3></router-link>
            <router-link to="/detail2"><h3>去详情页2（懒加载）</h3></router-link>
        </div>
    </div>
</template>

<script lang = "ts" >
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Detail2 extends Vue {
    // 生命周期
    mounted () {
        console.log('detail2')
    }
}
</script>

<style lang="scss" scoped>
     .box{
        display: flex;
    }
</style>