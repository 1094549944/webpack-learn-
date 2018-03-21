import sum from './sum'
var minus=require('./minus')
require(['./muti'],function(muti){
    console.log('muti',muti(2,3))
})
console.log('结果是',sum(23,24))
console.log('减法结果是',minus(27,22))