const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const rm = require('rimraf').sync;
const fs = require('fs');

module.exports = function(metadata = {},src,dest='.'){
    if(!src){
        return Promise.reject(new Error(`无效的source:${src}`));
    }
    return new Promise((resolve,reject)=>{
        const metalsmith = Metalsmith(process.cwd()).metadata(metadata).clean(false).source(src).destination(dest);
        //判断是否存在ignore文件
        const ignoreFile = path.join(src,'templates.ignore');
        if(fs.existsSync(ignoreFile)){

        }

        metalsmith.use((files, metalsmith,done) => {
            const meta = metalsmith.metadata()
            Object.keys(files).forEach(fileName => {
                
            })
        })
    })
}