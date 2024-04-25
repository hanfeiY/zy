const YaoCaiModel = require("../../models/YaoCaiModel")


const YaoCaiService ={
    add:async({title,introduction,inventory,detail,cover,editTime,price})=>{
        return YaoCaiModel.create({
            title,introduction,inventory,detail,cover,editTime,price
        })
    },
    updateList:async({ title,introduction,inventory,detail,cover,editTime,_id,price})=>{
        if(cover){
            return YaoCaiModel.updateOne({_id},{
                title,introduction,inventory,detail,cover,editTime,price
            })
        }else{
            return YaoCaiModel.updateOne({_id},[
                title,introduction,inventory,detail,editTime,price
            ])
        }
    },
    getList:async({_id})=>{
        return _id?YaoCaiModel.find({_id}):YaoCaiModel.find({})
    },
    delList:async({_id})=>{
        return YaoCaiModel.deleteOne({
            _id
        })
    },
    // publish:async({_id,isPublish,editTime})=>{
    //     return YaoShanModel.updateOne({
    //         _id
    //     },{
    //         isPublish,
    //         editTime
    //     })
    // },
    
}

module.exports = YaoCaiService