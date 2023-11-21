import express from "express"
const ordersRoutes = express.Router()
import { getAllOrders, createNewOrder, getOneOrder, EditOrder, DeleteOrder } from "../controllers/orders.controllers.js"

ordersRoutes.post("/newOrder", createNewOrder)
ordersRoutes.get("/allOrders", getAllOrders)
ordersRoutes.get("/orderData/:orderId", getOneOrder)
ordersRoutes.put("/editOrder/:orderId", EditOrder)
ordersRoutes.delete("/deleteOrder/:orderId", DeleteOrder)


export default ordersRoutes;