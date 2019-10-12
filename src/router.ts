import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import("./view/index.vue") ;
const Detail = ()=> import("./view/detail.vue");
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
