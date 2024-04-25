const UserService = require("../../services/web/UserService")

const JWT = require("../../util/JWT")

const UserController = {
    login:async(req,res)=>{
        //req.body
        console.log(req.body)
        var result = await UserService.login(req.body)

        if(result.length===0){
            res.send({
                code:"-1",
                error:"用户名密码不匹配"
            })
        }else{

            //生成token
            const token = JWT.generate({
                _id:result[0]._id,
                username:result[0].username
            },"1d")

            res.header("Authorization",token)
            res.send({
                ActionType:"OK",
                data:{ 
                    username:result[0].username,
                    // gender:result[0].gender?result[0].gender:0,//性别 0 1 2
                }
            })
        }
    },
    register:async(req,res)=>{
        // console.log(req.body,req.file)
        const {username,gender,password} = req.body
        const avatar = req.file?`/avataruploads/${req.file.filename}`:""
        await UserService.register({username,
            gender:Number(gender),avatar,password})
        res.send({
            ActionType:"OK",
        })
    },
    getList:async(req,res)=>{
        const result = await UserService.getList(req.params)
        res.send({
         ActionType:"OK",
         data:result
         })
     },
    
    
}
module.exports = UserController