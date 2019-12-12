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
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const argv = require('yargs').argv;
const path = require('path');
const vendor = 'lib/vendor.dll.js';
const vendordev = './../static/vendor.dll.js';
const autoprefixer = require('./postcss.config');

const cpus = require('os').cpus().length - 1;
let buildCongfig = Object.assign(web_base,{
    mode:'production', 
    stats: 'errors-only',
    optimization:{
        minimize:true,
            minimizer:[    
                new UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,
                    extractComments: false, 
                    cache: true,
                    parallel: true,              
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
                    MiniCssExtractPlugin.loader,
                    "css-loader",       
                    'resolve-url-loader',                  
                    {
                        loader: 'sass-loader',
                        options: {
                            data: `@import "@nutui/nutui/dist/styles/index.scss"; `,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname)
                            }
                        }
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: cpus,
                        },
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
                }
            },
            {
                test:/\.vue$/,
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[
                    'cache-loader',
                    {
                        loader:'vue-loader',
                        options: {
                            loaders:{
                                scss:[
                                    MiniCssExtractPlugin.loader,
                                    "css-loader",                      
                                    {
                                        loader: 'sass-loader',
                                        options: {
                                            data: `@import "@nutui/nutui/dist/styles/index.scss"; `,
                                        }
                                    } 
                                ]
                            },
                            postcss: [autoprefixer.plugins[0]]
                        },
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: cpus,
                        },
                    }
                ]
            },
            {
                test: /\.tsx?$/,              
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
                use:[     
                    'cache-loader',   
                    'happypack/loader?id=happyBabel',        
                    {                  
                        loader:'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            appendTsxSuffixTo: [/\.vue$/]
                        }
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: cpus,
                        },
                    }
                ]              
            }, 
            {
                test:/\.js$/,
                use:['cache-loader','happypack/loader?id=happyBabel'],               
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
    new optimizeCss({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),           
            cssProcessorPluginOptions: {
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
                normalizeUnicode: false
            }]
        },
        canPrint: true
    }), 
    new webpack.BannerPlugin(`\n JDC ${config.name} ${config.version} Build time : `+new Date().toString()+'\n'),
   
];
if(argv.aly){
    buildCongfig.plugins.push(new BundleAnalyzerPlugin())
}
    


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