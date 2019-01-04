import Vue from 'vue';
import App from './app.vue';
import router from './router.js';
import skeletonComp from './component/skeleton/index';
Vue.use(skeletonComp);

 new Vue({
  router,
  render: h => h(App),
  mounted () {
   
  }
}).$mount('#app');

