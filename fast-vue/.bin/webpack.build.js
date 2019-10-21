const web_base = require('./webpack.base.js');
const webpack = require('webpack');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const config               = require('./../package.json');
const argv = require('yargs').argv;
const path = require('path');
const vendor = 'lib/vendor.dll.js';
const vendordev = './../static/vendor.dll.js';
let buildCongfig = Object.assign(web_base,{
    mode:'production', 
    stats: 'errors-only',
    optimization:{
        minimize:true,
            minimizer:[    
                new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,
                    extractComments: false,               
                    uglifyOptions:{
                        compress: {
                            drop_console: true,
                            drop_debugger: true, 
                        }                              
                    }            
                })
            ]
    },
    module:{
        rules:[
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,'happypack/loader?id=css',
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname)
                            }
                        }
                    }
                ]
            },               
            {
            test: /\.svg$/,
                loader: 'svg-sprite-loader',
                include:[path.resolve('src/asset/svgSprite')],
                options:{
                    symbolId:'icon-[name]'
                }
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
                exclude:[path.resolve('src/asset/svgSprite')]            
            },
            {
                test:/\.vue$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[
                    {
                        loader:'vue-loader',
                        options: {
                            loaders:{
                                scss:[
                                    MiniCssExtractPlugin.loader,
                                    'happypack/loader?id=css'     
                                ]
                            },
                            postcss: [require('autoprefixer')({
                                "overrideBrowserslist" : [
                                    "> 1%",
                                    "last 7 versions",
                                    "not ie <= 8",
                                    "ios >= 8",
                                    "android >= 4.0"
                                  ]
                            })]
                        },
                    }
                ]
            },
            {
                test: /\.tsx?$/,              
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[        
                    'happypack/loader?id=happyBabel',        
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
                test:/\.js$/,
                use:'happypack/loader?id=happyBabel',               
            }           
    ]}
})
buildCongfig.plugins = [
    ...buildCongfig.plugins,     
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),       
        filename:path.resolve(__dirname,'../build/index.html')
    }),
    new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename:'css/[id].css' 
    }),
    new optimizeCss(),
    new webpack.BannerPlugin('Build time : '+new Date().toString())
];

//判断dll文件是否存在
if(fs.existsSync(path.join(__dirname,vendordev))) {
    buildCongfig.plugins = [
        ...buildCongfig.plugins,
        new htmlWebpackIncludeAssetsPlugin({
            assets:vendor,
            publicPath: argv.local ? "" : config.publicPath + '/',
            append:false
        }),
        new CopyWebpackPlugin([
            { from: path.join(__dirname, vendordev), to: path.join(__dirname, "./../build/" + vendor) },
        ])
    ];
}

module.exports = buildCongfig;