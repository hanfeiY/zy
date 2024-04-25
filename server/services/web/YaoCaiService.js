const YaoCaiModel = require("../../models/YaoCaiModel")


const  YaoCaiService ={
    getList:async({_id})=>{
        return _id?YaoCaiModel.find({_id}):YaoCaiModel.find({}).sort({editTime:-1})
    },
    gettopList:async({limit})=>{
        return YaoCaiModel.find({}).sort({editTime:-1}).limit(limit)
    },
}

module.exports = YaoCaiService