import SkeletonLoading from './src/skeleton-loading.vue';
import SkeletonCircle  from './src/basic/skeleton-circle.vue';
import SkeletonSquare  from  './src/basic/skeleton-square.vue';
import row             from  './src/layout/skeleton-row.vue';
import column          from  './src/layout/skeleton-column.vue';

function install(Vue){
    Vue.component('SkeletonLoading',SkeletonLoading);
    Vue.component('SkeletonCircle',SkeletonCircle);
    Vue.component('SkeletonSquare',SkeletonSquare);
    Vue.component('row',row);
    Vue.component('column',column);
}

const VueSkeletonLoading = {
    install

}

export default VueSkeletonLoading;