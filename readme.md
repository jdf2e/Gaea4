### 命令:
* upload 保持不变  
* build 保持不变
* dev 不在对css增加前缀 和js 进行es6转es5
* dev:low 增加css前缀 和js 进行转换 对低版本进行兼容
* build:local 打包路径为本地路径，即不增加域名
* upload:view 上传路径为测试环境 ，但是 文件相对路径不变
* lint 全部代码格式化 git push 前请执行

### 功能性:
* 增加了 dev 环境的缓存  ok
* 增加构建过程中 部分loader多线程执行 ok
* 增加了 构建进度 ok
* 缩小了loader 处理文件范围 ok
* dev 不在对css增加前缀 和js 进行es6转es5 ok
* dev:low 增加css前缀 和js 进行转换 对低版本进行兼容
* build:local 打包路径为本地路径，即不增加域名
* upload:view 上传路径为测试环境 ，但是 文件相对路径不变
* cdn:vue 不在对vue 进行打包，直接引用公司服务器中的vue
* 增加构建完成提示 ok
* 增加代码格式化功能 并有详细注释 ok

### 希望
2. 增加 dll  
2. dev:low es5 6 postcsss

