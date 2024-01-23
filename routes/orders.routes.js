import express from "express"
const ordersRoutes = express.Router()
import { getAllOrders, createNewOrder, getOneOrder, EditOrderState, DeleteOrder, EditOrderData, addExcelDocument } from "../controllers/orders.controllers.js"
import multer from "multer";
const upload = multer();  

ordersRoutes.post("/newOrder", createNewOrder)
ordersRoutes.post('/addOrderWithExcel', upload.single('excelFile'), addExcelDocument);
ordersRoutes.get("/allOrders", getAllOrders)
ordersRoutes.get("/orderData/:orderId", getOneOrder)
ordersRoutes.put("/editOrderState/:orderId", EditOrderState)
ordersRoutes.put("/editOrder/:orderId", EditOrderData)
ordersRoutes.delete("/deleteOrder/:orderId", DeleteOrder)


export default ordersRoutes;



