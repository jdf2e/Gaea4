#!/usr/bin/env node
const program = require('commander');
const package = require('./package.json');
const fs = require('fs');
const glob = require('glob');
const logSymbols = require('log-symbols');
const chalk = require('chalk');
const donwload = require('download-git-repo');
const ora = require('ora');
const path = require('path');
const rm = require('rimraf').sync;

program.version(package.version,'-V,--version')
       .option('-U,--update <template-name>','指定更新模板')
       .parse(process.argv)

const list = glob.sync('*')

let next;
let rootName =  path.basename(process.cwd());
if(program.update){
    let templateName = program.update
    if(list.length){
        if(list.filter( name =>{
            const fileName = path.resolve(process.cwd(),path.join('.',name))
            const isDir = fs.statSync(fileName).isDirectory()
            return name.indexOf(templateName) !=-1 && isDir
        }).length !==0 ){
            //删除该目录
            rm(templateName);
             
        }
        next = Promise.resolve(templateName)
        
    }else if(rootName === templateName){

    }else{
        next = Promise.resolve(templateName);
    }
    next.then(target =>{

        go(target)
    })


}else{
    program.help()
    return
}

//下载
function go(targetName){
    //从各个分支下载 最新的模板代码
    let target = path.join(targetName||'.','.donwload-temp')
    return new Promise((resolve,reject) =>{
        const url = `direct:https://github.com/jdf2e/Gaea4.git#trunk.dev.${targetName}`
        const spinner = ora(`正在下载最新${targetName}模板`)
        spinner.start()
        donwload(url,target,{clone:true},(err)=>{
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
//处理模板
