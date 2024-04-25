const mongoose = require("mongoose")
const Schema = mongoose.Schema
//user模型===》users集合

const YaoCaiType = {
    title:String,//药材名
    introduction:String,//供应商
    inventory:String,//库存数量
    price:Number,
    detail:String,//内容
    cover:String,//封面
    editTime:Date,//更新时间
    count:Number
}
const YaoCaiModel =  mongoose.model("yaocai",new Schema(YaoCaiType))

module.exports = YaoCaiModel