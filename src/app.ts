import Vue from 'vue'
import App from './app.vue'
import router from './router'
// import { Dialog } from '@nutui/nutui';
// Dialog.install(Vue);

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false
export default new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

