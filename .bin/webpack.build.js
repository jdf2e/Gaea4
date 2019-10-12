const web_base = require('./webpack.base.js');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const autoprefixer         = require('autoprefixer');
const config               = require('./../package.json');
const argv = require('yargs').argv;
const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
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
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
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
    new HappyPack({
        //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true',
      }],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: false,
    }),
    new HappyPack({
        id: 'css',
        // 如何处理 .css 文件，用法和 Loader 配置中一样
        loaders: [ 'css-loader','sass-loader'],
         //共享进程池
        threadPool: happyThreadPool,
        //允许 HappyPack 输出日志
        verbose: false,
      }),     
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/index.html'),       
        filename:path.resolve(__dirname,'../build/index.html')
    }), 
    new htmlWebpackIncludeAssetsPlugin({
        publicPath:argv.local?"":config.publicPath,
        append:true, 
    }),   
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename:'css/[id].css'    
    }),  
    new optimizeCss(),           
    new webpack.BannerPlugin('Build time : '+new Date().toString()),
];

module.exports =buildCongfig;