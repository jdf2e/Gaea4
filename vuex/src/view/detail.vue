<template>
    <div>
        <div class="wrapper">
            <h4>详情页1</h4>
            <nut-cell
                title="跳转详情页2(懒加载)"
                :isLink="true"
                :showIcon="true"
                @click.native="go(1)"
            ></nut-cell>
            <nut-cell
                title="跳转NutUI2.0 Demo页"
                :isLink="true"
                :showIcon="true"
                @click.native="go(2)"
            ></nut-cell>
            <h4>vuex demo</h4>
            <div class="demo">a:{{ aNum }}</div>
            <div class="demo">reverseA: {{ reverseA.num }}</div>
            <div class="demo">
                <nut-button @click="addSync(1)">
                    异步增加
                </nut-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { Button } from "@nutui/nutui";
export default {
    components: {
        "nut-button": Button
    },
    data() {
        return {};
    },
    computed: {
        ...mapState({
            aNum: state => state.a.num
        }),
        ...mapGetters({
            reverseA: "a/reverseOperation"
        })
    },
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
        ...mapActions({
            addSync: "a/increase" // this.addSync 映射 this.$store.dispatch('a/increase')
        }),
        ...mapMutations({
            add: "a/INCREASE" // this.add 映射 this.$store.commit('a/INCREASE')
        }),
        go(val) {
            if (val == 1) {
                this.$router.push({ path: "/detail2" });
            } else if (val == 2) {
                this.$router.push({ path: "/nutui" });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper {
    color: #333;
    font-size: 0.24rem;
}
h4 {
    text-align: center;
    padding: 0.4rem 0.1rem;
    font-size: 0.36rem;
    color: #848689;
}
.demo {
    padding: 0.05rem 0.1rem;
    font-size: 0.28rem;
}
</style>
