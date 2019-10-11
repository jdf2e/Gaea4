
rules：也就是之前的loaders，
test ： 正则表达式，匹配编译的文件，
exclude：排除特定条件，如通常会写node_modules，即把某些目录/文件过滤掉，
include：它正好与exclude相反，
use -loader ：必须要有它，它相当于是一个 test 匹配到的文件对应的解析器，babel-loader、style-loader、sass-loader、url-loader等等，
use - options：它与loader配合使用，可以是一个字符串或对象，它的配置可以直接简写在loader内一起，它下面还有presets、plugins等属性；
具体来看一下示例：

```
module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env',
                            {
                                targets: {
                                browsers: CSS_BROWSERS,
                            },
                        }],'react', 'es2015', 'stage-0'
                        ],
                        plugins: [
                            'transform-runtime',
                            'add-module-exports',
                        ],
                    },
                },
            ],
        },
        {
            test: /\.(scss|css)$/,
            use: [
                'style-loader',
                {loader: 'css-loader',options:{plugins: [require('autoprefixer')({browsers: CSS_BROWSERS,}),],sourceMap: true}},
                {loader: 'postcss-loader',options:{plugins: [require('autoprefixer')({browsers: CSS_BROWSERS,}),],sourceMap: true}},
                {loader: 'sass-loader',options:{sourceMap: true}}
            ]
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'url-loader?limit=12&name=images/[name].[hash:8].[ext]',
                },
            ],
        },
        {
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'file-loader?name=fonts/[name].[hash:8].[ext]',
                },
            ],
        },
    ],
},
```

babel-loader、awesome-typescript-loader js*/ts编译，
css-loader、postcss-loader、sass-loader、less-loader、style-loader 等css样式处理
file-loader、url-loader、html-loader等图片/svg/html等的处理，。

plugins/loader 区别
loader的作用在于解析文件，比如把ES6转换成es5,甚至ES3,毕竟还有万恶的IE嘛；把Sass、Less解析成CSS，给CSS自动加上兼容的前缀；对图片进行一个解析等等；
plugins呢？它在干啥？它在吹水、喝茶、嗑瓜子聊天，当然这是loader在没有把项目做完之前，loader下班时间就是plugins苦难的开始，它要对loader干的事情进行优化分类、提取精华(公共代码提取)、做压缩处理(js/css/html压缩)、输出指定的目录等……，反正也是很苦逼！


webpack-dev-server
这个有些老生常谈了，就不说了
contentBase ：告诉服务(dev server)在哪里查找文件，默认不指定会在是当期项目根目录，
historyApiFallback:可以是boolean、 object，默认响应的入口文件，包括404都会指向这里，object见下面示例：
compress：启用 gzip 压缩，
publicPath：它其实就是 output.publicPath，当你改变了它，即会覆盖了output的配置，
stats： 可以自定控制要显示的编译细节信息，
proxy：它其实就是http-proxy-middleware，可以进行处理一些代理的请求。

webpack4删除的点：
module.loaders
NoErrorsPlugin
CommonsChunkPlugin
DefinePlugin
OccurenceOrderPlugin
