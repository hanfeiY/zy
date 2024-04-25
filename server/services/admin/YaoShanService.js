const YaoShanModel = require("../../models/YaoShanModel")


const YaoShanService ={
    add:async({title,content,category,cover,isPublish,editTime})=>{
        return YaoShanModel.create({
            title,content,category,cover,isPublish,editTime
        })
    },
    updateList:async({ _id,title,content,category,cover,isPublish,editTime})=>{
        if(cover){
            return YaoShanModel.updateOne({_id},{
                title,content,category,isPublish,covereditTime
            })
        }else{
            return YaoShanModel.updateOne({_id},[
                title,content,category,isPublish,editTime
            ])
        }
    },
    getList:async({_id})=>{
        return _id?YaoShanModel.find({_id}):YaoShanModel.find({})
    },
    delList:async({_id})=>{
        return YaoShanModel.deleteOne({
            _id
        })
    },
    publish:async({_id,isPublish,editTime})=>{
        return YaoShanModel.updateOne({
            _id
        },{
            isPublish,
            editTime
        })
    },
    
}

module.exports = YaoShanService