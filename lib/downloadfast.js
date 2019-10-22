
const generator = require('./generator');
const download  = require('download-git-repo');
const ora       = require('ora');
const path      = require('path');

let down = function(target){
    target = path.join(target)
    return new Promise (function(resolve,reject){
        const url = 'direct:https://github.com/jdf2e/Gaea4.git#trunk.dev.fast-vue'
        const spinner = ora('开始下载模版')
        spinner.start('正在下载模版')
        let downloadTarget = path.resolve(process.cwd(),path.join('.',target))
        download(url,downloadTarget,{clone:true},(err)=>{
            if(err){
                spinner.fail()
                reject(err)
            }else{
                spinner.succeed('下载完成')
                resolve(target)
            }
        })
    })
}

module.exports = async function(option){    
    let target = await new Promise((resolve,reject)=>{
        resolve(down(option.target))
    })   
}

// let option = { 
//     projectName: 'test16',
//     projectVersion: '1.0.0',
//     projectDescription: 'A project named test16',
//     uploadHost: '测试服务器host地址',
//     author: '佚名',
//     target: 'test16' 
// }
// let projectRoot = option.target;
// let target = 'test16/.download-temp';

// const context = {
//     name:option.projectName,
//     root:option.projectName,
//     downloadTemp:target,
//     metadata:{
//         fastmode:true,
//         fastVue:true
//     }
// }
// let dest = '.';
// if(projectRoot != '.'){
//     dest =  path.parse(context.downloadTemp).dir;
// }
// generator(context.metadata,context.downloadTemp,dest).then(res=>{
//     console.log(res)
// })

