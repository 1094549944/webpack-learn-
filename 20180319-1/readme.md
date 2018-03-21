# 全局安装webpack 安装完版本为3.11.0

#检查全局安装后的结果 npm list -g --depth 0

1.直接使用  es6方式
#新建两个文件夹 app.js  sum.js
  #sum.js 内容如下:
#export default function(a,b){
#    return a+b
#}

  #app.js 内容如下：

  #import sum from './sum'
  #console.log('sum(3,4)',sum(3,4))

  #执行代码
  # webpack app.js bundle.js  会生成bundle.js  

 # 命令行会显示 如下代码
 <!--
  ➜  20180319-1 webpack app.js bundle.js
      Hash: 09dffc61bd4d3ae10a4f
      Version: webpack 3.11.0
      Time: 69ms
      Asset     Size  Chunks             Chunk Names
      bundle.js  2.98 kB       0  [emitted]  main
      [0] ./app.js 56 bytes {0} [built]
    -->
#新建一个index.html，引入bundle.js,检查结果是否正确
 1-2 CommonJs规范
 #新建一个文件minus.js ,内容如下：
 #module.exports=function (a,b){
 #   return a-b
#}

#在app.js中引入var minus =require('./minus')   

#内容入下
#import sum from './sum'

#var minus =require('./minus')
#console.log('sum(3,4)',sum(3,4))

#console.log('minus(24,17)',minus(24,17))

 #执行代码
  # webpack app.js bundle.js  会生成bundle.js  

 # 命令行会显示 如下代码
 <!--
  ➜  20180319-1 webpack app.js bundle.js
      Hash: 09dffc61bd4d3ae10a4f
      Version: webpack 3.11.0
      Time: 69ms
      Asset     Size  Chunks             Chunk Names
      bundle.js  2.98 kB       0  [emitted]  main
      [0] ./app.js 56 bytes {0} [built]
    -->
#再次把bundle.js引入index.html,执行

#amd规范

#新建文件夹muti.js
<!-- define([

], function () {
    'use strict';
return function(a,b){
    return (a*b)
}
}); -->

#app.js中引入muti.js
<!-- //amd方式
require(['./muti'], function (muti) {
    console.log('muti(2,3)', muti(2, 3))
}) -->
#执行webpack app.js bundle.js
#显示结果
<!-- 20180319-1 webpack app.js bundle.js
Hash: 2c1dd8ad9a4c7bc3db28
Version: webpack 3.11.0
Time: 79ms
      Asset       Size  Chunks             Chunk Names
0.bundle.js  460 bytes       0  [emitted]
  bundle.js    6.72 kB       1  [emitted]  main
   [0] ./app.js 242 bytes {1} [built]
   [1] ./sum.js 47 bytes {1} [built]
   [2] ./minus.js 47 bytes {1} [built]
   [3] ./muti.js 89 bytes {0} [built] -->
   <!-- amd规范，是异步加载模块
   在require muti是，会单独形成一个thunk,并把它加载出来。所以会有2个bundle.js 0.bundle.js 和bundle.js -->

   #配置webpack.config.js
   <!-- //使用commonjs规范
module.exports={
    entry:{
        app:'./app.js'
    },
    output:{
        filename:'[name].[hash:5].js'
    }
} -->
#在命令行中，执行webpack


















  
  
  