// const { param } = require("../../routes/web/YaoShanRouter")
const YaoShanService = require("../../services/web/YaoShanService")

const YaoShanController = {
    getList:async(req,res)=>{
        const result = await YaoShanService.getList({_id:req.params.id})
        res.send({
            ActionType:"Ok",
            data:result
        })
    },
   
    gettopList:async(req,res)=>{
        const result = await YaoShanService.gettopList({limit:req.query.limit})
        res.send({
            ActionType:"Ok",
            data:result
        })
    },
   
   
}


module.exports = YaoShanController