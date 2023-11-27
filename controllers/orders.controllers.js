import Orders from "../models/orders.js"

export const getAllOrders = async (req, res) => { 
  console.log("Recibi una peticion")
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
    const {manufacturingCost, state, orderDetail} = req.body
    try {
        const saveNewOrder = new Orders ( { 
            manufacturingCost: manufacturingCost,
            state: state,
            orderDetail: orderDetail,
        })
        saveNewOrder.save()
                  .then((saved) => { 
                   res.status(200).json({message: "The Order has been saved succesfully", saved});
                  })
                  .catch((err) => { 
                    res.status(404).json({ message: 'Error!' });
                  })
     } catch (error) {
      res.status(500).json({ error: 'Error' });
     }
    
}

export const EditOrder = async (req, res) => { 
  const { orderId } = req.params;
  const {state, manufacturingCost} = req.body


  try {
        Orders.findByIdAndUpdate({ _id: orderId }, { 
              state: state,
              manufacturingCost: manufacturingCost,
          })
          .then((orderEdited) => {                                      
          res.status(200).json({message: "The Order has been edited succesfully", orderEdited});
          })
          .catch((err) => { 
            res.status(404).json({ message: 'Error!' });
          })

    } catch (error) {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
}





export const DeleteOrder = async (req, res) => { 
  const { orderId } = req.params;
  console.log("RECIBI:", req.params)

  try {
    const deletedOrder = await Orders.findByIdAndDelete({_id: orderId});

    if (deletedOrder) {
      res.status(200).json({ message: 'Order deleted Correctly', deleted: deletedOrder });
    } else {
      res.status(404).json({ message: 'Order doesen`t exist' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error' });
  }
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