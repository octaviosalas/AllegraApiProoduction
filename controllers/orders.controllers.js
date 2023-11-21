import Orders from "../models/orders.js"

export const getAllOrders = async (req, res) => { 
    Orders.find()
        .then((allOrders) => { 
        res.send(allOrders)
        })
        .catch((err) => { 
        console.log(err)
        })
}

export const getOneOrder = async (req, res) => { 
    const {orderId} = req.params

         Orders.find({_id: orderId})
                .then((theOrderSelected) => { 
                    res.json(theOrderSelected)
                })
                .catch((err) => { 
                console.log(err)
                })
}

export const createNewOrder = async (req, res) => { 
    
}

export const EditOrder = async (req, res) => { 
    
}

export const DeleteOrder = async (req, res) => { 
    
}