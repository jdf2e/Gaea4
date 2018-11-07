import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class TestMixin extends Vue {
    testMixinValue: string = 'Hello mixin 数据'
    testMixinFun (): void {
        console.log('test mixin ')
    }
}
