import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import usersRoutes from "./routes/users.routes.js"
import ordersRoutes from "./routes/orders.routes.js"
import connectDataBase from "./database/connectDataBase.js"

const app = express()
const port = 4000

app.use(express.json())
app.use(express.text())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({type:"*/*"}))
app.use(express.urlencoded({extended:true}))

app.use(usersRoutes)
app.use(ordersRoutes)


app.get('/', (req, res) => {
    res.send('Allegra Production Sever Gotten Up')
  })
  
app.listen(port, () => {
    console.log(`Allegra Production Sever is Gotten Up on Port: ${port} ✔✔`)   
    connectDataBase()
  })