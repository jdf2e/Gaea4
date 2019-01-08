import Vue from 'vue';
import App from './app.vue';
import router from './router.js';

import skeletonComp from './component/skeleton/index';
Vue.use(skeletonComp);
import { Cell,Dialog } from '@nutui/nutui';
Vue.use(Cell);
Vue.use(Dialog);

 new Vue({
  router,
  render: h => h(App),
  mounted () {
   
  }
}).$mount('#app');

