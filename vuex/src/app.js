import Vue from 'vue';
import App from './app.vue';
import router from './router.js';
import store from './store';


 new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
   
  }
}).$mount('#app');

