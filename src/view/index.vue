<template>
    <div>
        <div class="wrapper">
            <div class="box">我是首页{{computedMsg}}</div>
            <router-link to="/detail"><h3>去详情页1</h3></router-link>
            <router-link to="/detail2"><h3>去详情页2（懒加载）</h3></router-link>
            <TC :param="`测试jsx`"></TC>
        </div>
    </div>
</template>
<script lang = "ts" >
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import TestMixin from '../mixins/test'
import TestComponent from '../components/test.vue'
import axios from 'axios'
import Qs from 'qs'

@Component({
    components: {
        TC: TestComponent
    }
})
export default class Index extends mixins(TestMixin) {

    // 初始化数据
    spread: number[] = [1, 2, 3, 4]
    obj: any = {
        name: 'wangnan',
        age: '30'
    }

    // 生命周期
    mounted () {
        this.init()
        let m = [3, 4]
        console.log([...this.spread, ...m])
        let obj = Object.assign({}, this.obj)
        for (let a of m) {
            console.log(a)
        }
    }

    // 计算属性
    get computedMsg (): string {
        return this.obj.name + this.obj.age
    }

    // 组件的方法
    init (): void {
        console.log(this.testMixinValue)
        this.testMixinFun()
    }
}
</script>
<style lang="scss" scoped>
    .box{
        display: flex;
    }
</style>