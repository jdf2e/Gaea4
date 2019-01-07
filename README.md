# 欢迎使用Gaea
### vue 单页面脚手架 node>8.9.0

## 安装步骤

安装Gaea-cli  
```bash
npm install gaea-cli -g
```
初始化项目（如果项目名字和目录一致，可以在当前目录生成模版代码）
```bash      
gaea init projectName 或者 g2 init projectName 
```
安装依赖       
```bash
npm install
```
编译第三依赖方包
```bash  
npm run dll
```
开发
```bash             
npm run dev
```
编译
```bash              
npm run build
```
上传          
```bash   
npm run upload
```
真机调试        
```bash   
npm run carefree
```
骨架屏html注入   
```bash
npm run skeleton
```

## cli脚手架分支

 * master  构建工具脚本代码
 * dev     生成模版代码文件集合

## 模板demo分支

* trunk.dev.vuex    
* trunk.dev.vue     
* trunk.dev.ts      
* trunk.dev.smock
* trunk.dev.skeleton(手写骨架屏html注入)      


## 功能点
* webpack4.0 + Babel7 ✔️ 
*  支持 vuex ✔️      
*  支持 一键上传 ✔️
*  支持 TypeScript ✔️ 
*  支持 [Smock](https://smock.jd.com)    ✔️ 
*  支持 [NutUI2.0](https://nutui.jd.com)  ✔️ 
*  支持 [按需加载组件](https://www.npmjs.com/package/@nutui/babel-plugin-separate-import) ✔️
*  支持 [CareFree](https://carefree.jd.com)  ✔️ 
*  支持 Skeleton  ✔️ 
*  支持 PWA   






