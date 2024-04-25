var express = require('express');
const ProductController = require('../../controllers/web/ProductController')

var ProductRouter = express.Router();

// const multer  = require('multer')
// const upload = multer({ dest: 'public/yaoshanuploads/' })

//涉及文件上传，普通post不行，需要加上multer中间件

ProductRouter.get("/webapi/product/list",ProductController.getList)

ProductRouter.get("/webapi/product/list/:id",ProductController.getList)
ProductRouter.get("/webapi/product/toplist",ProductController.gettopList)


module.exports = ProductRouter