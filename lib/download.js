const download  = require('download-git-repo');
const ora       = require('ora');
const path      = require('path');

module.exports = function(target,isfast){
    target = path.join(target || '.','.download-temp')
    return new Promise (function(resolve,reject){
        let url = ''
        if(isfast){
            url = 'direct:https://github.com/jdf2e/Gaea4.git#trunk.dev.fast-vue'
        }else{
            url = 'direct:https://github.com/jdf2e/Gaea4.git#dev'
        }
        const spinner = ora('正在下载模版')
        spinner.start()
        let downloadTarget = path.resolve(process.cwd(),path.join('.',target))
        download(url,downloadTarget,{clone:true},(err)=>{
            if(err){
                spinner.fail()
                reject(err)
            }else{
                spinner.succeed()
                resolve(target)
            }
        })
    })
}