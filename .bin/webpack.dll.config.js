const Webpack = require('webpack');
const library = '[name]_lib';
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const config = require('./../package.json');
const vendor = config.vendorDll;//需要抽离的第三方库，目前cdn已集成vue、vue-router、vuex、axios，这里根据实际需要添加
if (!vendor.length) {
    console.log('dll为空，请配置')
    process.exit(0)
}
module.exports = {
    entry: {
        vendor
    },
    mode:'production',    
    stats: 'errors-only',
    output: {
        path: path.join(__dirname,'./../static/'),
        filename: '[name].dll.js',
        library
    },
    plugins:[
        new CleanWebpackPlugin(),
        new Webpack.DllPlugin({
            path: path.join(__dirname, './../static', '[name]-manifest.json'),
            name: library,
            context: __dirname
        })
    ]
}