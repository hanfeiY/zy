let mongoose = require('mongoose')
//使用mongoose.Schema()构造函数，创建Schema对象（我称之为约束对象），对文档进行约束
//文档中的字段必须符合模式的规定, 否则将不能正常操作

let zylistRule = new mongoose.Schema({
    zyid:{
      type:Number,
      require:true,
      unique:true
    },
    type:{
      type:String,
      require:true  
    },
    title:{
      type:String,
      require:true          
    },
    price:{
      type:Number,
      require:true       
    }
  },{collection:'zylist'})
  //暴露对象模型
  module.exports = mongoose.model('zylist',zylistRule)