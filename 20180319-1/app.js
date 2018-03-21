//es6
import sum from './sum'
//commonjs
var minus = require('./minus')
console.log('sum(3,4)', sum(3, 4))

console.log('minus(24,17)', minus(24, 17))


//amd方式
require(['./muti'], function (muti) {
    console.log('muti(2,3)', muti(2, 3))
})