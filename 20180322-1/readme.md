# typescript-loader
# 安装

# npm i typescript ts-loader --save-dev

#需要配置tsconfig.json webpack.config.js

# tsconfig 配置选项   
  
  #官网 /docs/handbook/compiler-options.html

  #常用选项
   compilerOptions
   include 
   exclude


#开始配置


# 初始化项目：npm init

# 安装依赖  npm install webpack typescript ts-loader awesome-typescript-loader --save-dev

# 新建文件tsconfig.json, webpack.config.json 并配置


# tsconfig.json 配置如下：
{
    "compilerOptions":{
        "module": "common.js",
        "target": "es5",
        "allowJS":true
    },
    "include":[
        "./src/*"
    ],
    "exclude":[
        "./node_modules"
    ]
}

#webpack.config.js配置如下：
module.exports = {
    entry:{
        'app':'./src/app.ts'

    },
    output:{
        filename:'[name].bundle.js'
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                use:{
                    loader:'ts-loader'
                }
            }
        ]
    }
}


#新建文件夹src ,在下面新建文件app.ts
 #app.ts内容如下：
 const num = 45

interface Cat {
    name: String,
    sex: String
}

function touchCat(cat: Cat) {
    console.log('miao ', cat.name)
}
touchCat({
    name: "tom",
    sex: "male"
})

#执行webpack

#有的时候需要使用js，则需要安装 npm install lodash --save

#在app.ts中 引入lodash 然后执行
import * as _ from 'lodash'

console.log('_.chunk([1,2,3,4,5],2)',_.chunk([1,2,3,4,5],2))

const num = 45

interface Cat {
    name: String,
    sex: String
}

function touchCat (cat: Cat) {
    console.log('hello~ ', cat.name)
}
touchCat({
    name: "tom",
    sex: "male"
})


#声明文件,如果格式不正确，会报错

npm install @types/lodash 
npm install @types/vue


#typings  
 npm install typings

 typings install lodash






