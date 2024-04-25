const orderlistService = require("../../services/web/orderlistService")

const orderlistController = {
    insertmany:async(req,res)=>{
        // console.log(req.file,req.body)
        const {title,price,num} = req.body
        //调用service进行添加
        await orderlistService.insertmany({
            title,
            price,
            num,
        })
        res.send({
            ActionType:"Ok"
        })
    },
    getall:async(req,res)=>{
        const result = await orderlistService.getall({_id:req.params.id})
        res.send({
            ActionType:"Ok",
            data:result
        })
    },
    
    // gettopList:async(req,res)=>{
    //     const result = await ProductService.gettopList({limit:req.query.limit})
    //     res.send({
    //         ActionType:"Ok",
    //         data:result
    //     })
    // },
   
   
}


module.exports =orderlistController