const webpack              = require('webpack');
const path                 = require('path');
const config               = require('./package.json');
const MinicssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const autoprefixer         = require('autoprefixer');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {VueLoaderPlugin}    = require('vue-loader');

const curDate = new Date();
const curTime = curDate.getFullYear() + '/' + (curDate.getMonth() + 1) + '/' + curDate.getDate() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds();
const bannerTxt = config.name + ' ' + config.version + ' ' + curTime; 

module.exports = (env,argv)=> {

    let  webpackConfig = {
        entry:{
            app:'./src/app.js'
        },
        output:{
            path: path.resolve(__dirname, 'build' + '/' + config.version),
            publicPath: config.publicPath + '/'+config.version+'/',
            filename: 'js/[name].js'
        },
        resolve:{
            extensions:['.js','.vue','json'],
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
                    ]
                },
                {
                    test: /\.(png|jpg|gif|webp|woff|eot|ttf)$/,
                    use:{
                        loader:'url-loader',
                        options:{
                            name:'img/[name].[ext]',
                            limit:3000
                        }
                    }
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader'
                },
                {
                    test:/\.vue$/,
                    use:[
                        {
                            loader:'vue-loader',
                            options:{
                                loaders:{
                                    scss:[
                                        'vue-style-loader',
                                        MinicssExtractPlugin.loader,
                                        'css-loader',
                                        'sass-loader'
                                    ]
                                },
                                postcss: [autoprefixer()]
                            }
                        }
                    ]
                },
                {
                    test:/\.js$/,
                    use:'babel-loader',
                    exclude:/node_modules/,
                    include:path.resolve(__dirname,'src')
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
    
            }),
            new webpack.BannerPlugin(bannerTxt),
        ],
    }
    
    if(argv.mode === 'production' || argv.mode ==='upload'){
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            
        ]);
    
    }else if(argv.mode === 'upload'){
        webpackConfig.plugins = (webpackConfig.plugins || []).concat([
            
        ]);
    }else{
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
    


