var express = require('express');
const YaoCaiController = require('../../controllers/admin/YaoCaiController')

var YaoCaiRouter = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/yaocaiuploads/' })

//涉及文件上传，普通post不行，需要加上multer中间件
YaoCaiRouter.post("/adminapi/yaocai/add",upload.single("file"),
YaoCaiController.add)//添加药材接口

YaoCaiRouter.get("/adminapi/yaocai/list",YaoCaiController.getList)//获取药材信息接口

YaoCaiRouter.post("/adminapi/yaocai/list",upload.single("file"),
YaoCaiController.updateList)//更改药材信息接口

YaoCaiRouter.get("/adminapi/yaocai/list/:id",YaoCaiController.getList)//获取对应id药材信息接口

YaoCaiRouter.delete("/adminapi/yaocai/list/:id",YaoCaiController.delList)//删除药材信息接口

// YaoShanRouter.put("/adminapi/yaoshan/publish",YaoShanController.publish)

module.exports = YaoCaiRouter