const YaoCaiService = require("../../services/admin/YaoCaiService")

const YaoCaiController = {
    add:async(req,res)=>{
        // console.log(req.file,req.body)
        const cover = req.file?`/yaocaiuploads/${req.file.filename}`:""
        const {title,introduction,detail,inventory,price} = req.body
        //调用service进行添加
        await YaoCaiService.add({
            title,
            introduction,
            inventory,
            price,
            detail,
            cover,
            editTime:new Date(),
        })
        res.send({
            ActionType:"Ok"
        })
    },
    updateList:async(req,res) =>{
        const cover = req.file?`/yaocaiuploads/${req.file.filename}`:""
        const {title,introduction,detail,inventory,_id,price} = req.body
        //调用service进行添加
        await YaoCaiService.updateList({
            _id,
            title,
            introduction,
            inventory,
            detail,
            cover,
            price,
            editTime:new Date()
        })
        res.send({
            ActionType:"Ok"
        })
    },
    getList:async(req,res)=>{
        const result = await YaoCaiService.getList({_id:req.params.id})
        res.send({
            ActionType:"Ok",
            data:result
        })
    },
    delList:async(req,res)=>{
        await YaoCaiService.delList({_id:req.params.id})
        res.send({
            ActionType:"Ok",
        })
    },
    // publish:async(req,res)=>{
    //     await YaoShanService.publish({
    //         ...req.body,
    //         editTime:new Date()
    //     })
    //     res.send({
    //         ActionType:"Ok",
    //     })
    // },
    
}


module.exports = YaoCaiController