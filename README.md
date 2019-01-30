# Gaea
![Gaea](https://img14.360buyimg.com/uba/jfs/t1/14029/6/4518/6382/5c32dd25Ed88527f2/55e60f2080cc6d6b.png)
> Vue技术栈单页面构建工具

## Getting Started
Gaea构建工具是基于Node.js、Webpack模版工程等的Vue技术栈的整套解决方案，包含了开发、调试、打包上线完整的工作流程

### Prerequisites
请先安装node，版本大于8.9.0，如果没有安装，请前往[安装](https://nodejs.org/zh-cn/)

### Installing
1. `npm i gaea-cli -g` 全局安装
2. `g2 init projectName（gaea init projectName)` 初始化项目,项目名字和目录名字一致会默认在当前文件下生成模版
3. `npm i` 安装依赖
4. `npm run dll` 编译第三方库

### Npm Scripts
- `npm run dev` 开发
- `npm run build` 打包编译
- `npm run upload` 上传
- `npm run lint` 代码格式
- `npm run carefree` 真机调试
- `npm run skeleton` 骨架屏注入

## Feature
* Webpack4.0 + Babel7
* [Vuex](https://vuex.vuejs.org/zh/guide/)
* [一键上传](https://www.npmjs.com/package/@nutui/upload)
* [TypeScript](https://www.typescriptlang.org/)
* [Smock](https://smock.jd.com)
* [NutUI2.0](https://nutui.jd.com)
* [按需加载组件](https://www.npmjs.com/package/@nutui/babel-plugin-separate-import)
* [CareFree](https://carefree.jd.com)
* Skeleton
* ESlint、Prettier
* TinyPNG图片压缩、Webp转换

## Usage
安装后，使用之前还需要配置上线路径、项目信息等

### `webpack.config.js` 配置上传
配置上传测试服务器地址和路径，具体可[参看](https://www.npmjs.com/package/@nutui/upload)，配置上传的host、用户名username、密码password、上传地址target
example
```bash
new WebpackUploadPlugin({
    source:'build',
    ignoreRegexp:/node_moudles/,
    httpOption:{
        host:'测试服务器地址',
        port:3000,
        username:'',
        password:'',
        target:`/var/www/html/${config.ftpServer}/${config.ftpTarget}`
   }
})
```

### `webpack.config.js` 配置真机调试
配置carefree真机调试，具体可[参看](https://carefree.jd.com/)，例如：我们将开发阶段的代码打包上传至测试域名page.jd.com，用于真机扫二维码调试
example
```bash
new Carefree({
    justUseWifi: false,
    publicPath: '//page.jd.com/'+config.ftpTarget+'/'+config.version+'/',
    ftp: {
        host: '测试服务器地址',
        port: 3000,
        source: 'build',
        target: '/var/www/html/page.jd.com/'+config.ftpTarget+'/'
    }
})
```

### `webpack.dll.config.js` 配置第三库依赖
目前的第三方库有 vue、qs、axios、vue-router等，如果增加和删除的话，可以更改字符串："vue,qs,axios,vue-router" ;重新执行npm run dll 

### `package.json` 配置项目信息

* name 项目名称
* version 项目版本，控制上线静态资源版本 例如： `https://static.360buyimg.com/exploit/mtelink/1.0.0/js/app.js`
* publicPath  项目上线 html 中静态资源的路径地址前缀 例如：`//static.360buyimg.com/exploit/mtelink` 如果是html和静态资源都交给后端，那么这个值设置成空就行。
* ftpServer  项目上传根目录 例如：misc.360buyimg.com |  static.360buyimg.com
* ftpTarget 项目上传的文件目录 例如：exploit/test | exploit/mtelink 不要以 / 开头，否则会被认为是服务器的根目录。
* tinypngkey 使用TinyPNG 需要去[官网](https://tinypng.com/developers)注册KEY，填入这个字段，后续就可以用`npm run compress`压缩图片。
* vendorVersion  第三方依赖库的版本控制，提供第三库在上线后，也需要加版本号上线兜底方案 例如：`https://static.360buyimg.com/exploit/mtelink/lib/vendor.dll.js` |  `https://static.360buyimg.com/exploit/mtelink/lib/1.0.0/vendor.dll.js`


## Catalog 

1. src目录下的文件功能如下：
* index.html  页面模板
* app.js  入口文件
* app.vue  渲染最高级路由匹配到的组件用的出口vue文件
* router.js  路由文件，在此文件中配置路由信息
2. src子目录功能如下：
* view  存放用作页面视图的vue文件
* component  存放用作组件的vue文件
* asset  在其中的css、js、img目录存放css/js/图片文件
* build目录  存放构建出的文件
  1.0.0 是业务代码版本上线文件夹，lib/vendor.js 是静态文件第三库，不会随着业务代码更改而变化的。
3. webpack.config.js 是开发和编译项目的配置文件
4. webpack.dll.config.js 是编译抽离第三方库的配置文件
5. static/vendor.dll.js 和 static/vendor-manifest.json 是 npm run dll 生成的第三方库静态文件和索引文件

## Other Features

### 图片压缩篇
采用TinyPNG node.js API 进行在线压缩图片，并且转换Webp格式文件，需要去[官网](https://tinypng.com/developers)注册KEY，填入`package.json`文件
`tinypngkey`字段。每个账号每个月有500次的免费上传压缩限制。

### 路由篇

文件router.js 配置了脚手架的相关路由信息，推荐使用【history】路由。脚手架支持history路由和hash路由。在 router.js 中默认是history路由。它是真实的路由地址，所以需要后台那帮你配置重定向。

比如首页的路由是 http://telink.jd.com/index。那么你的路由的首页也是/index 。
比如搜索页/search 是不存在后端服务器上的。所以需要你让后端把其余的单页面的路由都重定指向首页的vm。

对于carefree，上传到测试服务器page.jd.com 默认是hash路由，方便大家进行测试
```bash
const router = new VueRouter({
    mode:carefree?'hash':'history',
    routes
});
```

### 骨架屏篇

脚手架提供了vue的骨架屏注入方案，在命令行工具选择骨架屏，就会下载骨架屏相对应的模板。

src/skeleton 就是基于[vue-server-renderer](https://github.com/vuejs/vue/tree/dev/packages/vue-server-renderer)服务端渲染，抽取手写骨架屏的css 和 html 注入到 打包的html中。

src/skeleton/skeleton.vue 文件就是手写的骨架屏组件，推荐只渲染入口页首屏骨架
npm run skeleton 就会将src/skeleton/index.html  生成到外层src/index.html
注入完成后，就可以后续正常开发

### SMOCK篇

smock 是开发阶段基于swagger的自动化mock假数据工具，需要配置参数如下：
修改package.json 中字段，具体可以[参看](https://smock.jd.com/)

```bash
"smock": {
      "host": "",
      "domain": "",
      "projectName": ""
}
```

## Note
* 上线逻辑，前后端分离上线，lib/vendor.js 属于第三方库会发生变动机会比较小，所以在后续迭代可以不需要上线，只需要上线1.0.0/或者1.0.1/版本的文件
* 如果是覆盖上线，需要统一一次刷新cdn所有静态资源路径，因为整个build包是一个整体。如果是流量较高的业务，建议新增版本上线，覆盖版本上线有小风险。
* 使用carefree时候，注意自己的cmd等是黑色背景主体，不然二维码是反的。

## Plan
[开发计划](https://github.com/jdf2e/Gaea4/blob/master/PLANS.md)

## Change Log
[更新日志](https://github.com/jdf2e/Gaea4/blob/master/CHANGELOG.md)

## License
MIT License - [LICENSE](./LICENSE)








