<template>
    <div id="app">
        <div class="item item-1" :class="{'curr':currIndex == 0}">
            <div class="logo-wrap">
                <span class="logo"></span>
                <div class="percentage">{{percentage}}%</div>
                
            </div>
            <div class="jdc-logo"><s></s></div>
        </div>
        <div class="item item-2" :class="{'curr':currIndex == 1}">
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
                <a class="btn btn-start">
                    起步
                </a>
            </p>
            
        </div>
    </div>
</template>

<script>
import "./asset/css/common.scss";
import common from './asset/js/common.js';
export default {
    components: {},
    data() {
        return {
            percentage:0,
            currIndex:0,
            timer:null,
        };
    },
    created() {
        this.initPage();
    },
    mounted() {
       
    },
    destroyed() {
        this.timer = null;
    },
    methods: {
        initPage(){
            let imgList = [
                'https://h5.m.jd.com/babelDiy/Zeus/2846ykuM7PwipD9E2RzMj2BGEQpA/plugin/loading_bg2.jpg',
               '//img30.360buyimg.com/uba/jfs/t1/11994/12/3293/4055/5c1c9201E0dcd3c56/334a525e23a8eee6.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/8512/25/10120/593/5c1c9115E109b4eef/f1415fa0762a3014.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/6067/22/10147/989/5c1c916eE5ee530cf/ccdeaa5ddf9b2fd5.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/16121/33/2379/441/5c1c8e11E50c99917/857f073be9795dc3.png.webp',
               '//img11.360buyimg.com/uba/jfs/t1/22733/24/2397/496/5c1c8e65E45783616/94d722d6a5523fa5.png.webp',
               '//img13.360buyimg.com/uba/jfs/t1/7669/26/10041/496/5c1c8eb2E0ae636b7/a417d518ef0bd968.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/16121/33/2379/441/5c1c8e11E50c99917/857f073be9795dc3.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/16504/27/2349/2676/5c1c8ef3Edcae626b/08b461cb70383973.png.webp',
               '//img30.360buyimg.com/uba/jfs/t1/23754/2/2347/2772/5c1c8ef2E9a006aaa/6e87180e580f69e5.png.webp',
               
               '//img14.360buyimg.com/imagetools/jfs/t1/19377/4/2576/192/5c1e07e0E94293b87/73d33c98f6650ccf.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/26262/12/2420/1048/5c1c9492Ec7c5a266/537b25b1e2699e3f.png.webp',
               '//img30.360buyimg.com/uba/jfs/t1/26471/16/2454/278/5c1c94c5Eb76bcb5b/8222fa7601722fdc.png.webp',

               '//img10.360buyimg.com/uba/jfs/t1/9602/24/10113/134/5c1c9995Eab3e99fe/31169c2b737d4d09.png.webp',
               '//img10.360buyimg.com/uba/jfs/t1/28225/24/2324/5423/5c1c9b02E842fd815/99b84b2f440bb26e.png.webp',

               '//img20.360buyimg.com/uba/jfs/t1/20131/9/2417/463640/5c1ca308Ed3728aa1/90c6e32887118a9c.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/26657/37/2423/11120/5c1ca354E074baebf/9186b0038c901d77.png.webp',

               '//img12.360buyimg.com/imagetools/jfs/t1/17155/33/2597/24927/5c1f2e83E341c3ba1/a8b14ebec4665785.png.webp',
               '//img12.360buyimg.com/imagetools/jfs/t1/26035/2/2602/12297/5c1f23c0E54ba1b50/86ae262769c667b6.png.webp',
               '//img10.360buyimg.com/imagetools/jfs/t1/7040/7/10222/11847/5c1f23c6E16934389/fcfd4d5ee5ede772.png.webp',
               '//img13.360buyimg.com/imagetools/jfs/t1/29297/12/2540/199139/5c1f22abE7fe11159/221dd9526a072528.png.webp',
               '//img12.360buyimg.com/imagetools/jfs/t1/19974/40/2606/164078/5c1f20b3E656972ea/880b016d4fd6922f.png.webp',
               '//img13.360buyimg.com/imagetools/jfs/t1/15017/1/2705/57861/5c1f1b0eE8bd4871e/496a7478c97b8f6d.png.webp',
               '//img13.360buyimg.com/imagetools/jfs/t1/26977/18/2741/147253/5c1f1f05Ef0c4e863/6d1fea74ac3a1940.png.webp',
               '//img30.360buyimg.com/uba/jfs/t1/20111/35/2421/388982/5c1ca3bdEa46ca5a5/aca0ba87b8430d15.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/24659/10/2394/366/5c1ca436E5b109fe6/64ec462773b4903d.png.webp',
               '//img10.360buyimg.com/uba/jfs/t1/23060/11/2416/346/5c1ca462E3bb08453/4591845430d7c3f5.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/17968/9/2464/53477/5c1ca516E0532e911/acde74140cbc9420.png.webp',
               '//img11.360buyimg.com/uba/jfs/t1/19252/9/2476/60673/5c1ca55aE552971e0/f40d29f97464ad35.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/24765/26/2441/25026/5c1ca590E062ea524/f53a2f4bef74fd4d.png.webp',
               '//img13.360buyimg.com/uba/jfs/t1/21695/26/2448/29241/5c1ca5bcE51a4e0db/42b332936a18b2a4.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/22525/20/2412/70451/5c1ca5e7E2b608c2f/7a8a642e820bff19.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/21601/35/2512/306727/5c1ca668E00b42e01/f986ec063516be68.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/23319/36/2468/16711/5c1ca692E2c4d8756/9ca911383690a890.png.webp',
               '//img10.360buyimg.com/uba/jfs/t1/17541/35/2370/8177/5c1ca6b9E0c0da803/3675d2e17e70ca87.png.webp',
               '//img30.360buyimg.com/uba/jfs/t1/9207/9/10002/3155/5c1ca6e2E46b6554a/03ab2de0a731e034.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/27701/13/2478/222811/5c1ca712Ebf4b0578/fe5147128c9d0940.png.webp',
               '//img11.360buyimg.com/uba/jfs/t1/12265/6/2414/851/5c1ca733Ead427527/fa16338473148f9b.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/11995/27/3220/350699/5c1ca7ccE513813a9/d2a5a2adf82ec306.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/9767/11/10081/295011/5c1ca7f8E6153a4ab/57d7792ce445c78e.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/28384/19/2411/83530/5c1ca824E46672788/f0042e7679e616d5.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/11202/26/3199/260793/5c1ca843E85133c41/5b79e0ff1ba02632.png.webp',
               '//img11.360buyimg.com/uba/jfs/t1/9134/3/9998/421888/5c1ca865E801b6d16/2f0e0ff71cdb3e35.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/29742/9/2496/168727/5c1ca894E51923875/a6782aa1a070e1d5.png.webp',
               '//img10.360buyimg.com/uba/jfs/t1/27463/30/2424/136714/5c1caa47E16c53060/efafcbfb91681f0b.png.webp',
               '//img11.360buyimg.com/imagetools/jfs/t1/8658/36/10082/61140/5c1cdf64E88b4cb69/4f7cbbc8831ff237.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/9083/26/10088/10135/5c1caa64E4f87e2dd/dedd2da613b8b741.png.webp',
               '//img30.360buyimg.com/uba/jfs/t1/27751/15/2508/12004/5c1caa81E18605c32/ad8fabcfb9a4c0af.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/14259/20/2478/16489/5c1caa9eE9d2bba75/7201e4b41864e8e8.png.webp',
               '//img13.360buyimg.com/uba/jfs/t1/20189/3/2456/58497/5c1caadbE4f47498c/68295cdb28a22085.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/28656/8/2483/94921/5c1cab54E93b0f579/8b5cb73a5c932512.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/17024/23/2460/293/5c1cab82Ea41a0560/02d66f521be09909.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/19513/29/2431/274988/5c1cabc8E7e5eb033/293fa9bcb109e60e.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/9368/19/10012/1857/5c1cac2dEc62adb6f/ae62ecefe4bccc70.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/23612/19/2482/153871/5c1cad2eE4b42320c/954853409020266d.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/26101/11/2427/19333/5c1cad76E75cb4737/cc36536ed6fd1e0e.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/26638/23/2383/170083/5c1cad55E94f7b124/c918562f943a5eeb.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/6729/14/10290/190607/5c1cad97E5f44a742/2dfc972fbcc9aa03.png.webp',
               '//img11.360buyimg.com/uba/jfs/t1/27660/36/2451/9714/5c1cada8Ed4101c00/d74b4332c23374e2.png.webp',
               '//img20.360buyimg.com/uba/jfs/t1/8667/24/10130/11279/5c1cadbbEb8b1175f/dcbe1bcb4743721c.png.webp',
               '//img30.360buyimg.com/uba/jfs/t1/20450/11/2418/182187/5c1cae98Ec010322a/f03d0914ff9b03e8.png.webp',
               '//img30.360buyimg.com/uba/jfs/t1/28062/32/2443/8090/5c1caec0E174c972a/d596cca7f47e4d9e.png.webp',
               '//img14.360buyimg.com/uba/jfs/t1/16772/39/2455/31591/5c1caed8Eeebd07c3/ab40ad7cba9d34c9.png.webp',
               '//img12.360buyimg.com/uba/jfs/t1/14145/21/2486/41196/5c1caef1E48ac14fd/5636a591a28857c6.png.webp',
               '//img13.360buyimg.com/uba/jfs/t1/20003/16/2415/9227/5c1caf05Ef52d5254/58113fb98599a839.png.webp',
               'https://h5.m.jd.com/babelDiy/Zeus/2846ykuM7PwipD9E2RzMj2BGEQpA/plugin/result_bg_640.png',
               'https://h5.m.jd.com/babelDiy/Zeus/2846ykuM7PwipD9E2RzMj2BGEQpA/plugin/result_bg.png',
               'https://h5.m.jd.com/babelDiy/Zeus/2846ykuM7PwipD9E2RzMj2BGEQpA/plugin/HYRunYuan.ttf',
            ];
;
            common.preLoading(imgList,(percentage)=>{
                this.percentage = percentage;
                console.log(percentage);
            },()=>{
                this.percentage = 100;
                console.log('next page');
                this.timer = setTimeout(()=>{
                     this.currIndex = 1;
                },1000)

            });
        }

    }
};
</script>

<style lang="scss" scoped>
.item {
    display: none;
    opacity: 0;
    font-size: 12px;
    padding:20px 10px;
    position:absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    background:#fff;
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    a {
        color: #333;
    }
}
.item.curr{
    display: block;
    opacity: 1;
   
}

.item-1{
    .logo-wrap{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate3d(-50%,-50%,0);
    }
    .percentage{
        line-height:0.36rem;
        font-size:0.28rem;
        color:#da642e;
        padding:0.3rem 0;
    }
}
.item-2{
    
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
.jdc-logo{
    text-align: center;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translate3d(-50%,0, 0);
   
    s{
        display: inline-block;
        height:0.24rem;
        width:1.15rem;
        background:url('./asset/img/logo.png') 0 0 no-repeat;
        background-size:100% 100%;

    }
}

</style>

