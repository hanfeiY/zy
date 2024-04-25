//主要用于连接数据库，判断数据库链接状态
const mongoose = require('mongoose')

const DB_NAME = 'zhongyao'
const PORT = '27017'
const IP = '127.0.0.1'

//连接数据库

function connectMongo(callback){
    mongoose.connect(`mongodb://${IP}:${PORT}/${DB_NAME}`)
    mongoose.connection.on("connected",function(err){
        if(err){
            console.log('数据库连接失败',err)
        }else{
            console.log('数据库连接成功')
            callback()
        }
    })
}

module.exports = connectMongo