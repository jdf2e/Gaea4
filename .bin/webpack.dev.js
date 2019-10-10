const web_base = require('./webpack.base.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
let devConfig = {};
devConfig = Object.assign(web_base,{
    mode:"development",
    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use: [
                    'cache-loader', 'style-loader','happypack/loader?id=css'            
                ]
            },  
            {
                test: /\.tsx?$/,              
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[
                    'cache-loader',                
                    {                  
                        loader:'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                ]              
            },  
            {
            test: /\.(png|jpg|gif|webp|woff|eot|ttf|svg)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        name:'img/[name].[ext]',
                        limit:3000
                    }
                },
                exclude:['/node_modules/']            
            },     
            {
                test:/\.vue$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:['cache-loader','vue-loader']
            }           
    ]},     
    devServer:{
        open:true,      
        proxy:{
            "/workshop/*":{
                target:"https://***.com",               
                changeOrigin: true,
                secure: false
            }
        }     
    }  
});

devConfig.plugins = [...devConfig.plugins,
    new HappyPack({
        id: 'css',
        // 如何处理 .css 文件，用法和 Loader 配置中一样
        loaders: [ 
        'css-loader',    
        'sass-loader'],
         //共享进程池
        threadPool: happyThreadPool,
        //允许 HappyPack 输出日志
        verbose: true,
    }),  
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
          title:"vue_stage",
          template:'./src/index.html'
    })   
];

module.exports= devConfig;