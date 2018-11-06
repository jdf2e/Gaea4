const Metalsmith = require('metalsmith');
const Handlebars = require('handlebars');
const rm = require('rimraf').sync;
const fs = require('fs');
const path = require('path');
const minimatch = require('minimatch');
const fsExtra = require('fs-extra');
const glob =require('glob');

module.exports = function(metadata = {},src,dest='.'){
    if(!src){
        return Promise.reject(new Error(`无效的source:${src}`));
    }

    return new Promise((resolve,reject)=>{

        const metalsmith = Metalsmith(process.cwd()).metadata(metadata).clean(false).source(src).destination(dest);
        //判断是否存在ignore文件
        const ignoreFile = path.join(src,'templates.ignore');
        let ignores  = [];
        if(fs.existsSync(ignoreFile)){
            metalsmith.use((files,metalsmith,done) =>{
                const meta = metalsmith.metadata();
                ignores = Handlebars.compile(fs.readFileSync(ignoreFile).toString())(meta)
                .split('\n').filter(item=>!!item.length)
               
                Object.keys(files).forEach(fileName =>{
                    let num = 0;
                    ignores.forEach(item =>{
                        if(minimatch(fileName,item)){
                           num+=1;
                        }
                    })
                    if(num == 0){
                        delete files[fileName]
                    }
                })
                done()
            })
        }
        metalsmith.use((files, metalsmith,done) => {
            const meta = metalsmith.metadata()
            Object.keys(files).forEach(fileName => {
                let t = files[fileName].contents.toString()
                files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))
            })
            done();
        }).build(err => {
            const list = glob.sync(dest+'/'+ignores[0]);
            const folder = ignores[0].replace('/**','');
            list.filter(name =>{
                let target = name.replace(folder+'/','');
                fsExtra.copyFileSync(name,target,err=>{
                    if(err) console.error(err);
                })
            })
            rm(src)
            rm(dest+'/'+folder)
            err? reject(err):resolve()
        })
    })
}