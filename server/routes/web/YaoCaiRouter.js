var express = require('express');
const YaoCaiController = require('../../controllers/web/YaoCaiController')

var YaoCaiRouter = express.Router();

// const multer  = require('multer')
// const upload = multer({ dest: 'public/yaoshanuploads/' })

//涉及文件上传，普通post不行，需要加上multer中间件

YaoCaiRouter.get("/webapi/yaocai/list",YaoCaiController.getList)

YaoCaiRouter.get("/webapi/yaocai/list/:id",YaoCaiController.getList)
YaoCaiRouter.get("/webapi/yaocai/toplist",YaoCaiController.gettopList)


module.exports = YaoCaiRouter