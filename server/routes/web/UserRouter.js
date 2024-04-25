var express = require('express');
const UserController = require('../../controllers/web/UserController');
var UserRouter = express.Router();
//图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET home page. */
UserRouter.post("/webapi/user/login",UserController.login)
// UserRouter.post("/adminapi/user/upload",upload.single('file'),
// UserController.upload)
UserRouter.post("/webapi/user/register",upload.single('file'),
UserController.register)
//实现用户列表的增删改查
// UserRouter.get("/webapi/user/list",UserController.getList)
UserRouter.get("/adminapi/user/list/:id",UserController.getList)
// UserRouter.put("/adminapi/user/list/:id",UserController.putList)
// UserRouter.delete("/adminapi/user/list/:id",UserController.delList)


module.exports = UserRouter;
