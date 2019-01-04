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
        if(fs.existsSync(ignoreFile)){
            metalsmith.use((files,metalsmith,done) =>{
                const meta = metalsmith.metadata();
                const ignores = Handlebars.compile(fs.readFileSync(ignoreFile).toString())(meta)
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
            }).build(err=>{
                metalsmith.use((files, metalsmith,done) => {
                    const meta = metalsmith.metadata()
                    Object.keys(files).forEach(fileName => {
        
                        if(fileName.indexOf('/src/') == -1){
                            let t = files[fileName].contents.toString()
                            files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))
                        }
                       
                    })
                    done();
                }).build(err => {
                    const  templateFolder = path.basename(glob.sync(dest+'/*')[0])
                    const list = glob.sync(dest+'/'+templateFolder+'/{**,.*}')
        
                    list.forEach(fileName =>{
                        const source = fileName
                        const target = fileName.replace(templateFolder+'/','')
                        const name = path.resolve(process.cwd(),path.join('.',fileName));
                        const isDir = fs.statSync(name).isDirectory();
                        !isDir && fsExtra.moveSync(source,target,err=>{
                            if(err) console.error(err);
                        });
                    })
                    rm(src)
                    rm(dest+'/'+templateFolder)
                    err? reject(err):resolve()
                })
        
            })
        }
        
        
    })
}