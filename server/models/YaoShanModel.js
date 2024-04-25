const mongoose = require("mongoose")
const Schema = mongoose.Schema
//user模型===》users集合

const YaoShanType = {
    title:String,
    content:String,
    category:Number,//类别 1 2 3 4 5
    cover:String,//封面
    isPublish:Number,//未发布，已发布
    editTime:Date,
}
const YaoShanModel =  mongoose.model("yaoshan",new Schema(YaoShanType))

module.exports = YaoShanModel