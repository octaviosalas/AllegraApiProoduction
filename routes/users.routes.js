import express from "express"
const usersRoutes = express.Router()
import { EditUserData, Login, Register, getUserData, getAllUsers } from "../controllers/users.controllers.js"

usersRoutes.post("/register", Register)
usersRoutes.post("/login", Login)
usersRoutes.get("/getUserData/:userId", getUserData)
usersRoutes.put("/editUserData/:userId", EditUserData)
usersRoutes.get("/allUsers", getAllUsers)


export default usersRoutes;