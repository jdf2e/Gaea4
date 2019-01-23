import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import a from "./modules/a";

/*
 * modlues 是vuex 对state 的模块化管理，便于代码的组装而不是所有的state都堆在一起
 */

Vue.use(Vuex);
const debug = process.env.NODE_ENV != "production";

export default new Vuex.Store({
    modules: {
        a
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
