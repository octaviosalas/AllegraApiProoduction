import mongoose from "mongoose";
const { Schema } = mongoose;


const ordersSchema = mongoose.Schema( { 
    id: { 
        type: String,
        required: true
    }, 

})

const Orders = mongoose.model("Orders", ordersSchema)

export default Orders;