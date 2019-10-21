const web_base = require('./webpack.base.js');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const path = require('path');
const vendordev = './../static/vendor.dll.js';
let devConfig = {};
devConfig = Object.assign(web_base,{
    mode:"development",
    devtool: "source-map",
    stats: 'errors-only',
    module:{
        rules:[
            {
                test:/\.css$/,
                use: [                  
                    'cache-loader',"css-loader",                   
                ]
            },
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    'cache-loader', 'style-loader','happypack/loader?id=css'
                ]
            },  
            {
                test: /\.tsx?$/,              
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[
                    'cache-loader','happypack/loader?id=happyBabel',                
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
        noInfo: true,       
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