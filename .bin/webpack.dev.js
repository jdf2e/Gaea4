const web_base = require('./webpack.base.js');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const path = require('path');
const vendordev = './../static/vendor.dll.js';
const HappyPack = require('happypack');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
let devConfig = {};
const cpus = require('os').cpus().length - 1;
devConfig = Object.assign(web_base,{
    mode:"development",
    devtool: "source-map",
    stats: 'errors-only',
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [     
                    'cache-loader', "css-loader", 
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: cpus,
                        },
                    },                 
                ]
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    'cache-loader',
                    'style-loader',
                    "css-loader",
                    'resolve-url-loader',                
                    {
                        loader: 'sass-loader',
                        options: {
                            data: `@import "@nutui/nutui/dist/styles/index.scss"; `,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: cpus,
                        },
                    },  
                ]
            },  
            {
                test: /\.ts?$/,              
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[
                    'cache-loader',
                    'babel-loader',
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: cpus,
                        },
                    },       
                    {
                        loader:'ts-loader',
                        options: {
                            happyPackMode: true ,      
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    }
                    // 'happypack/loader?id=ts'
                ]              
            },  
            {
            test: /\.(png|jpg|gif|webp|woff|otf|eot|ttf|svg)$/,
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
                use:['cache-loader','vue-loader',{
                    loader: 'thread-loader',
                    options: {
                        workers: cpus,
                    },
                }]
            }           
    ]},     
    devServer:{
        open:true,  
        noInfo: true,       
        hot: true,
        hotOnly:true,
    }  
});

devConfig.plugins = [...devConfig.plugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
          title:"vue_stage",
          template:'./src/index.html'
    })
];

if(fs.existsSync(path.join(__dirname,vendordev))) {
    devConfig.plugins = [
        ...devConfig.plugins,
        new htmlWebpackIncludeAssetsPlugin({
            assets: vendordev,
            publicPath: false,
            append:false
        })
    ];
}

module.exports= devConfig;