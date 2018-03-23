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