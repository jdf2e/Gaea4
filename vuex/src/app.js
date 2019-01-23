import Vue from "vue";
import App from "./app.vue";
import router from "./router.js";

import store from "./store";
import { Cell, Dialog } from "@nutui/nutui";
Vue.use(Cell);
Vue.use(Dialog);

new Vue({
    router,
    store,
    mounted() {},
    render: h => h(App)
}).$mount("#app");
