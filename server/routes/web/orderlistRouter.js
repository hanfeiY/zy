var express = require('express');
const orderlistController = require('../../controllers/web/orderlistController')

var orderlistRouter = express.Router();

orderlistRouter.get("/webapi/orderlist/getall",orderlistController.getall)

orderlistRouter.post("/webapi/orderlist/insertmany",orderlistController.insertmany)
// orderlistRouter.get("/webapi/orderlist/deleteone",orderlistController.getList)


module.exports = orderlistRouter