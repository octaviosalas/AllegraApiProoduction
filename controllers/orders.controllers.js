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
    const {id, manufacturingCost, state, orderDetail} = req.body
    try {
        const saveNewOrder = new Orders ( { 
            id: id,
            manufacturingCost: manufacturingCost,
            state: state,
            orderDetail: orderDetail,
        })
        saveNewOrder.save()
                  .then((saved) => { 
                   res.json({message: "The Order has been saved succesfully", saved})
                  })
                  .catch((err) => { 
                   console.log(err)
                  })
     } catch (error) {
       console.log(error)
     }
    
}

export const EditOrder = async (req, res) => { 
    
}

export const DeleteOrder = async (req, res) => { 
    
}


export const savePublication = async (req, res) => { 
   
    const {creatorName, creatorId, publicationDate, publicationImages, publicationTitle, typeOfPublication, creatorLocation, address, creatorProfileImage, publicationDescription, resolved} = req.body
    console.log(req.body)
    console.log("RECIBI UNA NUEVA PUBLICACION")
    

    try {
       const saveNewPub = new Publications ( { 
         creatorName: creatorName,
         creatorId: creatorId,
         publicationDate: publicationDate,
         publicationImages: publicationImages,
         publicationTitle: publicationTitle,
         typeOfPublication: typeOfPublication,
         creatorLocation: creatorLocation,
         address: address,
         creatorProfileImage: creatorProfileImage,
         publicationDescription: publicationDescription,
         resolved: resolved
       })
       saveNewPub.save()
                 .then((saved) => { 
                  res.json({message: "The Publication was Posted Succesfully!", saved})
                 })
                 .catch((err) => { 
                  console.log(err)
                 })
    } catch (error) {
      console.log(error)
    }
}