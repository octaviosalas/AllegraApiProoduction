import Orders from "../models/orders.js"
import xlsx from 'xlsx';
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

export const EditOrderState = async (req, res) => {
  const { orderId } = req.params;
  const { state } = req.body;

  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      { _id: orderId },
      {
        $set: {
          state: state,
          'orderDetail.$[].orderState': state,
        },
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found!' });
    }

    res.status(200).json({ message: 'The Order has been edited successfully', orderEdited: updatedOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const EditOrderData = async (req, res) => { 
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


export const addExcelDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se ha proporcionado un archivo Excel');
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Obtener el rango de filas
    const range = xlsx.utils.decode_range(sheet['!ref']);
    const rows = range.e.r + 1;

    // Recorrer todas las filas
    for (let i = 1; i < rows; i++) {
      const manufacturingCost = sheet['A' + (i + 1)].v;
      const state = sheet['B' + (i + 1)].v;
      const orderDetailString = sheet['C' + (i + 1)].v;

      // Separar los objetos usando '|||' y '///'
      const propertiesArray = orderDetailString.split('|||');
      const orderDetail = propertiesArray.map((objString) => {
        const objProperties = objString.split('///');
        return {
          CodigoProducto: objProperties[0],
          nombre: objProperties[1],
          cantidad: parseInt(objProperties[2], 10),
          observaciones: objProperties[3],
        };
      });

      // Crear una nueva instancia del modelo Orders
      const newOrder = new Orders({
        manufacturingCost,
        state,
        orderDetail,
      });

      // Guardar en la base de datos
      await newOrder.save();
    }

    res.status(200).send('Datos almacenados exitosamente en la base de datos');
  } catch (error) {
    console.error('Error al procesar los datos:', error);
    res.status(500).send('Error interno del servidor');
  }
};