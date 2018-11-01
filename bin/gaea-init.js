#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const download = require('../lib/download');
const generator = require('../lib/generator');
const logSymbols = require('log-symbols');
const chalk = require('chalk');

program.usage('<name>').parse(process.argv)
let projectName = program.args[0]
if(!projectName){
    program.help()
    return
}

const inquirer = require('inquirer');
const list = glob.sync('*');
let rootName = path.basename(process.cwd());
let next;
//判断是否存在该目录
if(list.length){
    if(list.filter(name =>{
        const fileName = path.resolve(process.cwd(),path.join('.',name));
        const isDir = fs.statSync(fileName).isDirectory();
        return  name.indexOf(projectName) != -1 && isDir
    }).length !== 0){
        console.error(logSymbols.error,chalk.red(`项目${projectName}已经存在`));
    }else{
        next  = Promise.resolve(projectName);
    }
}else if(rootName  === projectName){
    next = inquirer.prompt([
        {
            name:'buildInCurrent',
            message:'当前目录为空，且目录名称和项目名称相同，不需要在当前目录下创建新项目',
            type:'confirm',
            default:true
        }
    ]).then(answer =>{
        return Promise.resolve(answer.buildInCurrent ?'.':projectName);
    })

}else{
    next = Promise.resolve(projectName);
}

next && go();

function go(){
    next.then(projectRoot =>{
        if(projectRoot != '.'){
            fs.mkdirSync(projectRoot);
        }
        return inquirer.prompt([
            {
                name:'projectName',
                message:'项目名称',
                default:'gaea-init'
            },
            {
                name:'projectVersion',
                message:'项目版本号',
                default:'1.0.0'
            },
            {
                name:'projectDescription',
                message:'项目简介',
                default:`A project named gaea-init`
            },
            {
                name:'uploadHost',
                message:'上传服务器地址',
                default:`放静态资源的测试服务器地址`
            },
            {
                name:'author',
                message:'作者',
                default:`佚名`
            },
            {	
                name:'bucket',
                type:'checkbox',
                message:'第三方依赖库(多选)',
                choices:
                [{
                    name:'vue',
                    checked:true
                },{
                    name:'axios',
                    checked:true
                },{
                    name:'vue-router',
                    checked:true
                },{
                    name:'qs',
                    checked:true
                }]
            },{
                name:'features',
                type:'checkbox',
                message:'支持的功能选择',
                choices:[
                    {
                        name:'NutUI2',
                        checked:true,
                    },{
                        name:'TypeScript',
                        checked:false,
                    },{
                        name:'SMOCK',
                        checked:false,
                    },{
                        name:'PWA',
                        checked:false
                    }
                ]
            }
        ]).then(answer =>{
            
            for(let a of answer.bucket){
                answer[a] = true;
            }
            for(let b of answer.features){
                answer[b] = true;
            }
            return download(projectRoot).then(target=>{
               return {
                   name:projectName,
                   root:projectName,
                   downloadTemp:target,
                   metadata:{
                       ...answer
                   }
               }
            })
        }).then(context =>{
            //根据answer 判断什么模版路径
            return generator(context.metadata,context.downloadTemp,path.parse(context.downloadTemp).dir);
        
        }).then((res) => {
            console.log('');
            console.log(logSymbols.success,chalk.green('创建成功:)'));
            console.log('');
            console.log(logSymbols.info,'1.先编译第三方依赖库 npm run dll');
            console.log(logSymbols.info,'2.开发 npm run dev');
            console.log(logSymbols.info,'2.编译和上传 npm run build/npm run upload');
        }).catch(err=>{
            console.log('');
            console.log(logSymbols.error,chalk.red(`创建失败：${err.message}`));
            console.log('');
        })
    })
}
