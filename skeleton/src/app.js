import Vue from 'vue';
import App from './app.vue';
import router from './router.js';
import skeleton from './component/skeleton/index';
Vue.use(skeleton);

 new Vue({
  router,
  render: h => h(App),
  mounted () {
   
  }
}).$mount('#app');

