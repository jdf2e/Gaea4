const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const chalk= require('chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
var WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const config = require('./../package.json');
const argv = require('yargs').argv;
module.exports = {    
  entry: './src/app.ts',
  output:argv.local?{
      filename: 'js/[name].js',
      path: path.resolve(__dirname, '../build'), 
    }: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, '../build'+ '/' + config.version), 
      publicPath: config.publicPath + '/'+config.version+'/' 
  }, 
  externals:{
     vue:'Vue',
    'vue-router':'VueRouter',
    'axios':'axios'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue','.svg' ]
  },  
  plugins:[     
      new VueLoaderPlugin(),
      new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',      
        clear: false, 
        width: 100
      }),
      new WebpackBuildNotifierPlugin({
        title: "My Project Webpack Build",        
        suppressSuccess: true
      })
  ] 
};