const web_build = require('./webpack.build.js');
const WebpackUploadPlugin  = require('@nutui/upload/webpackUploadPlugin');
const config               = require('./../package.json');
const path = require('path');
let buildCongfig = Object.assign(web_build,{})
buildCongfig.plugins = [
    ...buildCongfig.plugins, 
    new WebpackUploadPlugin({
        source:'dist',
        ignoreRegexp:/node_moudles/,
        httpOption: {
            host: '192.168.181.73',
            port: 3000,
            username: '',
            password: '',
            target: `/var/www/html/${config.ftpServer}/${config.ftpTarget}`
          }
    })
     
];

module.exports =buildCongfig;