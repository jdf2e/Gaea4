import skeleton from "./skeleton.vue";
import skeletonCircle from "./basic/skeleton-circle.vue";
import skeletonSquare from "./basic/skeleton-square.vue";
import skeletonRow from "./layout/skeleton-row.vue";
import skeletonColumn from "./layout/skeleton-column.vue";
import "./skeleton.scss";

function install(Vue) {
    Vue.component(skeleton.name, skeleton);
    Vue.component(skeletonRow.name, skeletonRow);
    Vue.component(skeletonColumn.name, skeletonColumn);
    Vue.component(skeletonSquare.name, skeletonSquare);
    Vue.component(skeletonCircle.name, skeletonCircle);
}

const skeletonLoading = {
    install
};
export default skeletonLoading;
