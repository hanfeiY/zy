const ProductModel = require("../../models/ProductModel")


const  ProductService ={
    getList:async({_id})=>{
        return _id?ProductModel.find({_id}):ProductModel.find({}).sort({editTime:-1})
    },
    gettopList:async({limit})=>{
        return ProductModel.find({}).sort({editTime:-1}).limit(limit)
    },
}

module.exports = ProductService