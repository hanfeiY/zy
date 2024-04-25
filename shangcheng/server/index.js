//zyList API
const mongoose = require('mongoose')
//引入数据库连接函数
const connectDB = require('./db/conn_mongo')
//导入express接口
const express=require('express')


const router =require('./router/index.js')
// 创建服务器
const app= express();
//导入跨域共享中间件
const cors = require('cors')

//使用跨域共享中间件
app.use(cors())

//引入路由
const zyListRouter = require('./routes/zylist')
const orderlistRouter = require('./routes/orderlist')

app.use('/zylist',zyListRouter)
app.use('/orderlist',orderlistRouter)

app.use('/',router);

app.get('/',(req,res)=>{
    res.send(`
        <h3>欢迎访问中药信息API</h3>
    `)
})


connectDB(()=>{
    //创建并启动服务器
    const server = app.listen(2024,()=>{
        console.log("服务器成功启动了,可以访问http://127.0.0.1:2024/")
    })
})