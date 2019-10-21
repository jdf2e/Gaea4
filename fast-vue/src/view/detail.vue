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
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
        go(val) {
            if (val == 1) {
                this.$router.push({ path: '/detail2' })
            } else if (val == 2) {
                this.$router.push({ path: '/nutui' })
            }
        }
    }
}
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
.test{
    display: flex;
    transform: translate(30px,40px);
    font:12px;
}
</style>
