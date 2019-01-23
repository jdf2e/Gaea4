import Vue from "vue";
import App from "./app.vue";
import router from "./router.js";

import skeletonComp from "./component/skeleton/index";
import { Cell, Dialog } from "@nutui/nutui";
Vue.use(skeletonComp);
Vue.use(Cell);
Vue.use(Dialog);

new Vue({
    router,
    mounted() {},
    render: h => h(App)
}).$mount("#app");
