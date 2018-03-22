# 学习目的 babel babel-presets babel-plugin


# babel 

# npm init 生成package.json

#之后安装babel-loader babel-core
npm install --save-dev babel-loader babel-core

安装完毕后新建app.js,index.html,webpack.config.js

在webpack.config.js中配置
module.exports={
    entry:{
        app:'app.js'//入口
    },
    output:{
        filename:'[name].[hash:8].js'//打包文件
    },
    //
    module:{
        //规则,rules下的每一项都是一个规则
        rules:[{
            test:/\.js$/,//规则，给js文件使用
            use:'babel-loader',//使用loader来处理js文件
            exclude:'/node_modules/'//排除不需要编译的文件
        }]
    }
}
# presets 指定js按照那种规范来打包 比如 es2015 es2016 es2017  开发使用env  业内自定义 babel-preset-react  babel-preset-stage 0-3

# 安装presets  npm install babel-preset-env --save-dev

# 安装完以后修改webpack.config.js

module.exports={
    entry:{
        app:'app.js'
    },
    output:{
        filename:'[name].[hash:8].js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:{//添加options,参数，指定presets
                loader:'babel-loader',
                options:{
                    presets:['env']
                }
            },
            exclude:'/node_modules/'
        }]
    }
}

babel presets

targets
targets.browsers //指定浏览器环境
targets.browsers:"last 2 versions"或者
targets.browsers:">1%"

数据 从 browserlist 开源项目中来

数据从 Can I use ,搜索是否被浏览器使用

# 配置 babel-preset  在webpack.config.js中，配置babel-preset
代码如下
module.exports={
    entry:{
        app:'./app.js'
    },
    output:{
        filename:'[name].[hash:8].js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:{
                loader:'babel-loader',
                options:{
                    presets: [
                        ['env',{
                            targets:{
                                browsers:['>1%','last 2 versions']//支持浏览器版本
                            }
                        }]
                    ]
                }
            },
            exclude:'/node_modules/'
        }]
    }
}
参考文档如下：https://www.npmjs.com/package/babel-preset-env

#编译，执行代码如下：

<!-- ➜  20180321-1 git:(master) ✗ webpackHash: 25a9150e174b52f6a847
Version: webpack 3.11.0Time: 673ms
          Asset     Size  Chunks             Chunk Namesapp.25a9150e.js  2.68 kB       0  [emitted]  app
   [0] ./app.js 186 bytes {0} [built] -->
   
   #此时查看打包后的代码发现箭头函数已经被转化成function
<!-- (function(module, exports, __webpack_require__) {

"use strict";


var func = function func() {};
var NUM = 45;
var arr = [1, 2, 4];
var arrB = arr.map(function (item) {
  return item * 2;
});

console.log('new Set(arrB)', new Set(arrB));

/***/ }) -->


# 如果改变webpack.config.js中的targets设置
<!-- module.exports={
    entry:{
        app:'./app.js'
    },
    output:{
        filename:'[name].[hash:8].js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:{
                loader:'babel-loader',
                options:{
                    presets: [
                        ['env',{
                            targets:{
                               chrome:'52'
                            }
                        }]
                    ]
                }
            },
            exclude:'/node_modules/'
        }]
    }
} -->
# 再次执行webpack，则会出现
 <!-- webpack
Hash: 1d69de93da5e0814297dVersion: webpack 3.11.0
Time: 1242ms          Asset     Size  Chunks             Chunk Names
app.1d69de93.js  2.65 kB       0  [emitted]  app
   [0] ./app.js 156 bytes {0} [built] -->
#箭头函数没有转换过来

<!-- (function(module, exports, __webpack_require__) {

"use strict";


let func = () => {};
const NUM = 45;
let arr = [1, 2, 4];
let arrB = arr.map(item => item * 2);

console.log('new Set(arrB)', new Set(arrB));

/***/ }) -->

# 因为chrome本身是支持箭头函数的语法的



#介绍 Babel Polyfill 和Babel Runtime Transform

在一些较低的浏览器中，无法识别new Set() 或者 includes 这些语法，需要借助Babel Polyfill 或者babel Runtime Transform

比如在app.js 中写入如下代码：

<!-- let func = () => {

}
const NUM = 45
let arr = [1,2,4]
let arrB= arr.map(item => item*2)

console.log('new Set(arrB)',new Set(arrB))

arr.includes(8) -->

webpack.config.js中的代码如下：
<!-- module.exports={
    entry:{
        app:'./app.js'
    },
    output:{
        filename:'[name].[hash:8].js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:{
                loader:'babel-loader',
                options:{
                    presets: [
                        ['env',{
                            targets:{
                                browsers:['>1%','last 2 versions']
                            }
                        }]
                    ]
                }
            },
            exclude:'/node_modules/'
        }]
    }
} -->
编译后，代码：
<!-- (function(module, exports, __webpack_require__) {

"use strict";


var func = function func() {};
var NUM = 45;
var arr = [1, 2, 4];
var arrB = arr.map(function (item) {
  return item * 2;
});

console.log('new Set(arrB)', new Set(arrB));

arr.includes(8);

/***/ }) -->

显示，new Set() 和includes 的方法无法编译,低版本浏览器，是不存在解释这些函数和方法的，


# babel-loader babel-core babel-presets 针对语法，不能解决函数和方法。需要借助 Babel Polyfill 和Babel Runtime Transform


#比如：Generator,
#new Set() 
#includes,
#Array.from
#Array.prototype.includes
  等方法和函数



#Babel Polyfill   垫片，各个浏览器对标准实现的不一样，所以需要一个垫片，保证同样的api
# 这个垫片是全局的。为开发应用准备的

# npm install babel-polyfill --save 
# 引入 import "babel-polyfill"

# Babel Runtime Transform 
# 局部垫片 为开发框架准备  

# npm install babel-plugin-transform-runtime --save-dev
# npm install babel-runtime --save
# 不会污染全局  
# 使用：新建一个.babelrc 在里面配置相关的代码


# 安装插件    npm install babel-polyfill babel-runtime --save    
#            npm install babel-plugin-transform-runtime --save-dev

更改app.js

<!-- require("babel-polyfill")

let func = () => {

}
const NUM = 45
let arr = [1,2,4]
let arrB= arr.map(item => item*2)

console.log('new Set(arrB)',new Set(arrB))

arr.includes(8)

function* func() {
    
} -->

webpack.config.js 中配置：
<!-- module.exports={
    entry:{
        app:'./app.js'
    },
    output:{
        filename:'[name].[hash:8].js'
    },
    module:{
        rules:[{
            test:/\.js$/,
            use:{
                loader:'babel-loader',
                options:{
                    presets: [
                        ['env',{
                            targets:{
                                browsers:['>1%','last 2 versions']
                               
                            }
                        }]
                    ]
                }
            },
            exclude:'/node_modules/'
        }]
    }
} -->

执行代码，发现 function* func(){}已经编译，但是new includes 方法没有编译


# babel-run-time

配置.babelrc
<!-- {
    "presets": [
        ["env",{
            "targets":{
                "browsers":[">1%','last 2 versions"]
               
            }
        }]
    ],
    "plugins":["transform-runtime"]
}
app.js中写入
let func = () => {

}
const NUM = 45
let arr = [1,2,4]
let arrB= arr.map(item => item*2)

console.log('new Set(arrB)',new Set(arrB))

arr.includes(8)

function* func() {
    
}
这样使用的是transform-runtime -->


总结：安装有：
npm install --save-dev babel-loader babel-core

npm install babel-preset-env --save-dev

npm install babel-polyfill babel-runtime --save  
  
npm install babel-plugin-transform-runtime --save-dev

























