import mongoose from "mongoose";
const { Schema } = mongoose;


const ordersSchema = mongoose.Schema( { 
    manufacturingCost: { 
        type: String,
        required: true
    }, 
    state: { 
        type: String,
        required: true
    }, 
    orderDetail: { 
        type: Array,
        required: true
    }, 
   
   

})

const Orders = mongoose.model("Orders", ordersSchema)

export default Orders;

/*

Modal para agregar ordenes: 

Costo de confeccion - Numero$
Estado: Corte
orderDetail: {
 

}


*/