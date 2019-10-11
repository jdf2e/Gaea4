<template>
    <div>
        <div class="wrapper">
            <div class="logo-wrap">
                <span class="logo"></span>
            </div>
            <p class="intro">
                Vue技术栈单页面构建工具
            </p>
            <p class="link">
                <a href="https://github.com/jdf2e/Gaea4" class="btn">
                    GITHUB
                </a>
                <a href="https://www.npmjs.com/package/gaea-cli" class="btn">
                    NPM
                </a>
                <router-link to="/detail" class="btn btn-start">
                    起步
                </router-link>
            </p>
            <div class="jdc-logo"><s></s></div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            spread: [1, 2, 3, 4],
            obj: {
                name: 'wangnan',
                age: '30'
            }
        }
    },
    created() {},
    mounted() {
        const m = [3, 4]
        console.log([...this.spread, ...m])
        const obj = Object.assign({}, this.obj)
        console.log('23232323:' + obj)
        for (const a of m) {
            console.log(a)
        }
    },
    destroyed() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 20px 10px;
    font-size: 12px;
    a {
        color: #333;
    }
}
.intro {
    font-size: 0.36rem;
    line-height: 0.48rem;
    color: #333;
    text-align: center;
}
.link {
    text-align: center;
    padding-top: 1rem;
    .btn {
        height: 0.8rem;
        line-height: 0.8rem;
        border-radius: 0.8rem;
        border: 1px solid #da642e;
        display: inline-block;
        padding: 0 0.6rem;
        font-size: 0.28rem;
        color: #da642e;
        margin: 0.2rem;
    }
    .btn-start {
        background: #f1f2f3;
        color: #7f8c8d;
        border: 1px solid #f6f6f6;
    }
}
.logo-wrap {
    text-align: center;
    padding: 20px;
}
.logo {
    background: url("https://img14.360buyimg.com/uba/jfs/t1/14029/6/4518/6382/5c32dd25Ed88527f2/55e60f2080cc6d6b.png")
        0 0 no-repeat;
    display: inline-block;
    width: 72px;
    height: 68px;
    background-size: 100% 100%;
}
.jdc-logo {
    text-align: center;
    margin-top: 4rem;
    s {
        display: inline-block;
        height: 0.24rem;
        width: 1.15rem;
        background: url("../asset/img/logo.png") 0 0 no-repeat;
        background-size: 100% 100%;
    }
}
.webp .jdc-logo {
    s {
        background: url("../asset/img/webp/logo.webp") 0 0 no-repeat;
        background-size: 100% 100%;
    }
}
</style>
