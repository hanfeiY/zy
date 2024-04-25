const orderlistModel = require("../../models/orderlistModel")


const  orderlistService ={
    insertmany:async({title,price,num,_id})=>{
        return orderlistModel.create({
            title,price,num,_id
        })
    },
    getall:async({_id})=>{
        return _id?orderlistModel.find({_id}):orderlistModel.find({})
    },
    
    // gettopList:async({limit})=>{
    //     return ProductModel.find({}).sort({editTime:-1}).limit(limit)
    // },
}

module.exports = orderlistService