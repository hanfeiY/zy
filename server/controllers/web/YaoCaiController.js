const YaoCaiService = require("../../services/web/YaoCaiService")

const YaoCaiController = {
    getList:async(req,res)=>{
        const result = await YaoCaiService.getList({_id:req.params.id})
        res.send({
            ActionType:"Ok",
            data:result
        })
    },
   
    gettopList:async(req,res)=>{
        const result = await YaoCaiService.gettopList({limit:req.query.limit})
        res.send({
            ActionType:"Ok",
            data:result
        })
    },
   
   
}


module.exports = YaoCaiController