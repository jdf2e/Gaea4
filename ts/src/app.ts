import Vue from 'vue'
import App from './app.vue'
import router from './router'

import { Cell, Dialog } from '@nutui/nutui'
Vue.use(Cell)
Vue.use(Dialog)

// 阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

export default new Vue({
    el: '#app',
    router,
    render: h => h(App)
})

