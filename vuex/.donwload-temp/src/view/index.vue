<template>
    <div>
        <div class="wrapper" >
            <div class="box">我是首页</div>
            <router-link to="/detail"><h3>去详情页1</h3></router-link>
            <router-link to="/detail2"><h3>去详情页2（懒加载）</h3></router-link>
        </div>
        <div>vuex demo</div>
        <div>a:{{aNum}}</div>
        <div>reverseA: {{reverseA.num}}</div>
        <div><button @click="addSync(1)" style="background:#ccc;border:1px solid #ccc;">异步增加</button></div>
    </div>
</template>

<script>
import axios from 'axios';
import Qs from 'qs';
import {mapState,mapGetters, mapActions,mapMutations} from 'vuex';
export default {
    data(){
        return{
            spread:[1,2,3,4],
            obj:{
                name:'wangnan',
                age:'30'
            }
        }
    },
    components: {
    },
    computed:{
        ...mapState({
				aNum:state=>state.a.num, 
        }),
        ...mapGetters({
            reverseA:'a/reverseOperation',
        }),
    },
    methods:{
        ...mapActions({
            addSync:'a/increase' //this.addSync 映射 this.$store.dispatch('a/increase')
        }),
        ...mapMutations({
            add:'a/INCREASE'//this.add 映射 this.$store.commit('a/INCREASE')
        })
    },
    
    created(){

    },
    mounted(){
        let m = [3,4];
        console.log([...this.spread,...m]);
        let obj = Object.assign({},this.obj); 
        console.log('23232323:'+obj);
        for(let a of m){
            console.log(a);
        }
        this.add(3);
    },
    destroyed(){

    }
}
</script>

<style lang="scss" scoped>
    .box{
        display: flex;
    }
</style>