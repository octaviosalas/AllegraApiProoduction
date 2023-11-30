import express from "express"
const ordersRoutes = express.Router()
import { getAllOrders, createNewOrder, getOneOrder, EditOrderState, DeleteOrder, EditOrderData, addExcelDocument } from "../controllers/orders.controllers.js"

ordersRoutes.post("/newOrder", createNewOrder)
ordersRoutes.post("/addOrderWithExcel", addExcelDocument)
ordersRoutes.get("/allOrders", getAllOrders)
ordersRoutes.get("/orderData/:orderId", getOneOrder)
ordersRoutes.put("/editOrderState/:orderId", EditOrderState)
ordersRoutes.put("/editOrder/:orderId", EditOrderData)
ordersRoutes.delete("/deleteOrder/:orderId", DeleteOrder)


export default ordersRoutes;