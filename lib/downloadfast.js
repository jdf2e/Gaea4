

const down = require('./download');
//  模版修改方法
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const rm = require('rimraf').sync;
const path = require('path');
let generator = function(metadata = {}, source, destination = '.') {
    if (!source) {
     return Promise.reject(new Error(`无效的source：${source}`))
    }    
    return new Promise((resolve, reject) => {
        const metalsmith = Metalsmith(process.cwd())
        .metadata(metadata)
        .clean(false)
        .source(source)
        .destination(destination);
        metalsmith.use((files, metalsmith, done) => {
        Object.keys(files).forEach(fileName => {
                //遍历替换模板      
            if(fileName ==="package.json"){
            const fileContentsString = files[fileName].contents.toString() //Handlebar compile 前需要转换为字符创
            files[fileName].contents = new Buffer(Handlebars.compile(fileContentsString)(metalsmith.metadata()))
            }              
        })
        done()
    }).build(err => { // build
        rm(source)  //删除下载下来的模板文件，‘source’是路径
        if (err) {

            return reject(err)
        } else {
            return resolve()
        }
      })
    })
}


module.exports = async function(option){    
    let target = await new Promise((resolve,reject)=>{
        resolve(down(option.target,'fast'))
    })          
    let projectRoot = option.target;    
    const context = {
        name:option.projectName,
        root:option.projectName,
        downloadTemp:target,
        metadata:{
            fastmode:true,
            fastVue:true,
            projectName:option.projectName,
            projectVersion:option.projectVersion,
            projectDescription:option.projectDescription,
            author:option.author
        }
    }
    let dest = '.';
    if(projectRoot != '.'){
        dest =  path.parse(context.downloadTemp).dir;
    }
    return await generator(context.metadata,context.downloadTemp,dest)

}



