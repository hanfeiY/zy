const WebUserModel = require("../../models/WebUserModel")

const UserService = {
    login:async(username,password)=>{
        return WebUserModel.find(
            username,
            password
        )
    },
    register:async({username,gender,avatar,password})=>{
        return WebUserModel.create({
            username,
            gender,
            avatar,
            password
        })
    }, 
    getList:async({id})=>{
        return id?WebUserModel.find({_id:id},["username","password"])
        :WebUserModel.find({},["username","avatar","gender"])
    },  
}

module.exports = UserService