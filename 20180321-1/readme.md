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




