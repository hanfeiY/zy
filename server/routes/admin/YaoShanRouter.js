var express = require('express');
const YaoShanController = require('../../controllers/admin/YaoShanController')

var YaoShanRouter = express.Router();

const multer  = require('multer')
const upload = multer({ dest: 'public/yaoshanuploads/' })

//涉及文件上传，普通post不行，需要加上multer中间件
YaoShanRouter.post("/adminapi/yaoshan/add",upload.single("file"),YaoShanController.add)
YaoShanRouter.get("/adminapi/yaoshan/list",YaoShanController.getList)
YaoShanRouter.post("/adminapi/yaoshan/list",upload.single("file"),YaoShanController.updateList)
YaoShanRouter.get("/adminapi/yaoshan/list/:id",YaoShanController.getList)
YaoShanRouter.delete("/adminapi/yaoshan/list/:id",YaoShanController.delList)
YaoShanRouter.put("/adminapi/yaoshan/publish",YaoShanController.publish)

module.exports = YaoShanRouter