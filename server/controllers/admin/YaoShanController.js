// const { param } = require("../../routes/admin/YaoShanRouter")
const YaoShanService = require("../../services/admin/YaoShanService")

const YaoShanController = {
    add:async(req,res)=>{
        // console.log(req.file,req.body)
        const cover = req.file?`/yaoshanuploads/${req.file.filename}`:""
        const {title,content,category,isPublish,} = req.body
        //调用service进行添加
        await YaoShanService.add({
            title,
            content,
            category:Number(category),
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"Ok"
        })
    },
    updateList:async(req,res) =>{
        const cover = req.file?`/yaoshanuploads/${req.file.filename}`:""
        const {title,content,category,isPublish,_id} = req.body
        //调用service进行添加
        await YaoShanService.updateList({
            _id,
            title,
            content,
            category:Number(category),
            isPublish:Number(isPublish),
            cover,
            editTime:new Date()
        })
        res.send({
            ActionType:"Ok"
        })
    },
    getList:async(req,res)=>{
        const result = await YaoShanService.getList({_id:req.params.id})
        res.send({
            ActionType:"Ok",
            data:result
        })
    },
    publish:async(req,res)=>{
        await YaoShanService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType:"Ok",
        })
    },
    delList:async(req,res)=>{
        await YaoShanService.delList({_id:req.params.id})
        res.send({
            ActionType:"Ok",
        })
    }
}


module.exports = YaoShanController