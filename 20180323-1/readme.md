# 提取公用代码

 # 减少代码冗余 ，提高用户加载速度  

 # CommonsChunkPlugin

 # webpack 有内置的插件。webpack.optimize.CommonsChunkPlugin

 #配置

 # options.name or options.names

 # options.filename

 # options.minChunks

 # options.chunks

 # options.children

 # options.deepChildren

 # options.async

 #场景

 # 单页应用

 # 单页应用 + 第三方依赖

 # 多页应用 + 第三方依赖 + webpack生成代码


 # npm install webpack --save-dev


 #新建文件webpack.config.js

<!-- module.exports = {
    entry: {
        'pageA': './src/pageA'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2
        })
    ]
} -->


在src文件夹下面新建文件
moduleA.js
export default 'moduleA'


pageA.js
import './subPageA' 

import './subPageB'

export default 'pageA'


subPageA.js

import './moduleA'

export default 'subPageA'


subPageB.js

import './moduleA'

export default 'subPageB'


#之后执行代码
<!-- ➜  20180323-1 git:(master) ✗ webpack
Hash: a479ff5f81590622e458
Version: webpack 3.11.0
Time: 65ms
           Asset     Size  Chunks             Chunk Names
 pageA.bundle.js  1.21 kB       0  [emitted]  pageA
common.bundle.js  3.84 kB       1  [emitted]  common
   [0] ./src/moduleA.js 24 bytes {0} [built]
   [1] ./src/pageA.js 65 bytes {0} [built]
   [2] ./src/subPageA.js 45 bytes {0} [built]
   [3] ./src/subPageB.js 45 bytes {0} [built] -->


#检查 dist 文件中的pageA.bundle.js 发现公共代码，moduleA.js并没有提取出来。
#这个是因为没有设置多entry，如果是一个entry，则不会起作用。



#新建pageB.js   里面内容同pageA.js

# 在webpack.config.js中配置entry，entry入口有2个。这样才能提炼公共代码


var webpack = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB':'./src/pageB'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2
        })
    ]
}
# 执行webpack ,发现已经打包出来了，公共模块已经提取成功


# 引入第三方
# 安装lodash  
# npm install lodash --save

# 分别在pageA.js,pageB.js中，引入lodash


#pageA.js

import './subPageA' 
import './subPageB'

import * as _ from 'lodash'

export default 'pageA'

#pageB.js


import './subPageA' 
import './subPageB'

import * as _ from 'lodash'

export default 'pageB'



#  更改webpack.config.js
var webpack = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB':'./src/pageB',
        'vendor':['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            minChunks:Infinity
        })
    ]
}

# 更改entry中，增加vendor,表示引入的第三方的包，是个数组，把第三方，单独打包，
# 更改plugins ,CommonsChunkPlugin，新增minChunks，表示任何情况下都允许，
# 此时是第三方代码和生成的代码打包到了一起，


#此时打包

<!-- ➜  20180323-1 git:(master) ✗ webpack
Hash: 5002e810e5ac39711b52
Version: webpack 3.11.0
Time: 472ms
           Asset     Size  Chunks                    Chunk Names
 pageB.bundle.js  1.47 kB       0  [emitted]         pageB
 pageA.bundle.js  1.44 kB       1  [emitted]         pageA
vendor.bundle.js   545 kB       2  [emitted]  [big]  vendor
   [0] ./src/moduleA.js 24 bytes {0} {1} [built]
   [1] ./src/subPageA.js 45 bytes {0} {1} [built]
   [2] ./src/subPageB.js 45 bytes {0} {1} [built]
   [4] ./src/pageA.js 93 bytes {1} [built]
   [5] (webpack)/buildin/global.js 509 bytes {2} [built]
   [6] (webpack)/buildin/module.js 517 bytes {2} [built]
   [7] ./src/pageB.js 93 bytes {0} [built]
   [8] multi lodash 28 bytes {2} [built]
    + 1 hidden module -->
# 如果想把第三方代码和生成的代码不打包在一起，把webpack生成的代码独立出来
# 需要更改webpack.config.js的plugins的配置
var webpack = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB':'./src/pageB',
        'vendor':['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            minChunks:Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'manifest',
            minChunks:Infinity
        })
    ]
}

# 之后执行webpack
<!-- webpack
Hash: 50dd6f4d70e3e04b71aa
Version: webpack 3.11.0
Time: 422ms
             Asset     Size  Chunks                    Chunk Names
   pageB.bundle.js  1.47 kB       0  [emitted]         pageB
   pageA.bundle.js  1.44 kB       1  [emitted]         pageA
  vendor.bundle.js   541 kB       2  [emitted]  [big]  vendor
manifest.bundle.js  3.84 kB       3  [emitted]         manifest
   [0] ./src/moduleA.js 24 bytes {0} {1} [built]
   [1] ./src/subPageA.js 45 bytes {0} {1} [built]
   [2] ./src/subPageB.js 45 bytes {0} {1} [built]
   [4] ./src/pageA.js 93 bytes {1} [built]
   [5] (webpack)/buildin/global.js 509 bytes {2} [built]
   [6] (webpack)/buildin/module.js 517 bytes {2} [built]
   [7] ./src/pageB.js 93 bytes {0} [built]
   [8] multi lodash 28 bytes {2} [built]
    + 1 hidden module -->
# 成功生成新加的一个文件



# 把pageA 和pageB 中的公共文件提取出来

# 在webpack.config.js 中，配置plugins

var webpack = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB':'./src/pageB',
        'vendor':['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            minChunks:Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'manifest',
            minChunks:Infinity
        })
    ]
}


# 更改webpack配置，解决webpack 打包报错问题


var webpack = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB':'./src/pageB',
        'vendor':['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2,
            chunks:['pageA','pageB']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
            minChunks:Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'manifest',
            minChunks:Infinity
        })
    ]
}
# 解决第三方，打包问题，通过制定的chunks，来解决打包报错的问题

# 如果一个配置中，只是name 不一致，可以合并，变成names,执行后，效果不变


var webpack = require('webpack')

var path = require('path')

module.exports = {
    entry: {
        'pageA': './src/pageA',
        'pageB':'./src/pageB',
        'vendor':['lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename:'[name].bundle.js',
        chunkFilename:'[name].chunk.js'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            minChunks:2,
            chunks:['pageA','pageB']
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names:['vendor','manifest'],
            minChunks:Infinity
        })
       
    ]
}







