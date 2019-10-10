import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from "./view/index.vue";
import Detail from "./view/detail.vue";
const Detail2 = () => import("./view/detail2.vue");

Vue.use(VueRouter)

const routes = [
    { path: "/", component: Index },
    { path: "/detail", component: Detail },
    { path: "/detail2", component: Detail2 }, 
];
const router = new VueRouter({
    mode:'hash',
    routes
})

export default router
