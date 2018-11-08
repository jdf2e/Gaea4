const webpack              = require('webpack');
const path                 = require('path');
const config               = require('./package.json');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const autoprefixer         = require('autoprefixer');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { VueLoaderPlugin }    = require('vue-loader');
const WebpackUploadPlugin  = require('jdf2e-webpack-upload-plugin');
const htmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const AddAssetHtmlPlugin   = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin    = require('copy-webpack-plugin');
const moment               = require('moment');
const Carefree             = require('@nutui/carefree');

module.exports = (env,argv)=> {
    
    let  webpackConfig = {
        entry:{
            app:'./src/app.ts'
        },
        output:{
            path: path.resolve(__dirname, 'build' + '/' + config.version),
            publicPath: config.publicPath + '/'+config.version+'/',
            filename: 'js/[name].js'
        },
        stats: {
            entrypoints: false,
            children: false
        },
        resolve:{
            extensions:['.js','.vue','json','.ts', '.tsx'],
        },
        module:{
           rules:[
                {
                    test:/\.css$/,
                    use: [
                        MinicssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MinicssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                        "postcss-loader"
                    ],
                
                },
                {
                    test: /\.(png|jpg|gif|webp|woff|eot|ttf)$/,
                    use:{
                        loader:'url-loader',
                        options:{
                            name:'img/[name].[ext]',
                            limit:3000
                        }
                    },
                   
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader',
                },
                {
                    test:/\.vue$/,
                    use:[
                        {
                            loader:'vue-loader',
                            options: {
                                loaders:{
                                    scss:[
                                        'vue-style-loader',
                                        MinicssExtractPlugin.loader,
                                        'css-loader',
                                        'sass-loader'
                                    ]
                                },
                                postcss: [autoprefixer()]
                            },
                        }
                    ]
                },
                {
                    test:/\.js$/,
                    use:'babel-loader',
                   
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                      "babel-loader",
                      {
                        loader: "ts-loader",
                        options: { appendTsxSuffixTo: [/\.vue$/] }
                      },
                      {
                        loader: 'tslint-loader'
                      }
                    ]
                }
           ]
        },
        plugins:[
            new CleanWebpackPlugin('build'),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template:'./src/index.html'
    
            }),
            new MinicssExtractPlugin({
                filename: 'css/[name].css'
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css\.*(?!.*map)$/g,
                cssProcessorOptions: {
                    discardComments: { removeAll: true },
                    safe: true,
                    autoprefixer: false,
                },
    
            })
        ],
    }
    
    if(argv.mode === 'production'){
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new webpack.DllReferencePlugin({
                context:__dirname,
                manifest:require('./static/vendor-manifest.json')
            }),
            new htmlWebpackIncludeAssetsPlugin({
                assets:['/lib/vendor.dll.js'],
                publicPath:config.publicPath,
                append:false
                
            }),
            new CopyWebpackPlugin([
                { from: path.join(__dirname, "./static/vendor.dll.js"), to: path.join(__dirname, "./build/lib/vendor.dll.js") }
            ]),
            new webpack.BannerPlugin({
                banner:`${config.name} ${config.version} ${moment().format()}` 
            })
        ]);
        if(env && env.upload){
            webpackConfig.plugins = (webpackConfig.plugins || []).concat([
                new WebpackUploadPlugin({
                    host: '测试服务器地址',
                    source: 'build',
                    serverDir: config.ftpServer,
                    target: config.ftpTarget
                })
            ]);
        }
    
    }else{
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            new webpack.DllReferencePlugin({
                context:__dirname,
                manifest:require('./static/vendordev-manifest.json')
            }),
            new AddAssetHtmlPlugin({
                filepath: require.resolve('./static/vendordev.dll.js'),
                includeSourcemap: false
    
            })
        ]);
        if(env && env.carefree){
            webpackConfig.plugins = (webpackConfig.plugins || []).concat([
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify('carefree')
                }),
                new Carefree({
                    justUseWifi: false,
                    publicPath: '//page.jd.com/exploit/carefree-test/'+config.version+'/',
                    ftp: {
                        host: '测试服务器地址',
                        port: 3000,
                        source: 'build',
                        target: '/var/www/html/page.jd.com/exploit/carefree-test/'
                    }
                    
                })
            ]);
            webpackConfig.devtool = false;
            return webpackConfig;
        }
        webpackConfig.output.publicPath = '/';
        webpackConfig.devtool = '#cheap-module-eval-source-map';
        webpackConfig.devServer = {
            contentBase:path.resolve(__dirname,'build'),
            //host:'192.168.191.2',
            //port:8080,
            compress:true,
            historyApiFallback:true
        }
    }
    
    return webpackConfig;
 
}
    


