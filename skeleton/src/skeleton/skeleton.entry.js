import Vue from "vue";
import skeleton from "./skeleton.vue";
import skeletonComp from "../component/skeleton/index";
Vue.use(skeletonComp);

export default new Vue({
    components: {
        skeleton
    },
    template: "<skeleton />"
});
