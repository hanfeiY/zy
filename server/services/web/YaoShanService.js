const YaoShanModel = require("../../models/YaoShanModel")


const YaoShanService ={
    getList:async({_id})=>{
        return _id?YaoShanModel.find({_id,isPublish:1}):YaoShanModel.find({
            isPublish:1
        }).sort({editTime:-1})
    },
    gettopList:async({limit})=>{
        return YaoShanModel.find({
            isPublish:1
        }).sort({editTime:-1}).limit(limit)
    },
    
    
}

module.exports = YaoShanService