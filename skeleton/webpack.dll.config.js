const path = require("path");
const webpack = require("webpack");
const config = require('./package.json');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const moment   = require('moment');

const vendorStr = "qs,axios,vue-router";
let vendor = ['vue'];
vendor = vendor.concat(vendorStr.split(','));
let vendordev=['vue/dist/vue.esm.js'];
vendordev =vendordev.concat(vendorStr.split(','));


module.exports = {
	//你想要打包的模块数组
	entry:{
		vendor:vendor,
		vendordev:vendordev
	},
	output:{
		path:path.join(__dirname,'/static/'),
		filename:'[name].dll.js',
		library:'[name]_library'
		//vendor.dll.js 中暴露出的全局变量
		//主要是给DllPlugin中的name 使用
		//故这里需要和webpack.DllPlugin 中的 'name :[name]_libray 保持一致
	},
	plugins:[
		new CleanWebpackPlugin('static'),
		new webpack.DllPlugin({
			path:path.join(__dirname,'/static/','[name]-manifest.json'),
			name:'[name]_library',
			context:__dirname
		}),
		new webpack.BannerPlugin({
			banner:`${config.name} ${config.version} ${moment().format()}` 
		})
	]
}