import xlsx from 'xlsx';
import Orders from '../models/orders.js';


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






const formatManufacturingCost = (cost) => {
  const numericCost = parseFloat(cost);

  if (!isNaN(numericCost) && typeof numericCost === 'number') {
    const formattedCost = `${numericCost.toLocaleString("es-AR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    })} ARS`;

    return formattedCost;
  } else {
    return cost;
  }
};





export const createNewOrder = async (req, res) => {
  const { manufacturingCost, state, orderDetail } = req.body;

  try {
    // Formatear manufacturingCost antes de guardarlo
    const formattedManufacturingCost = formatManufacturingCost(manufacturingCost);

    const saveNewOrder = new Orders({
      manufacturingCost: formattedManufacturingCost,
      state: state,
      orderDetail: orderDetail,
    });

    saveNewOrder.save()
      .then((saved) => {
        res.status(200).json({ message: "The Order has been saved successfully", saved });
      })
      .catch((err) => {
        res.status(404).json({ message: 'Error!' });
      });
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};







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
  console.log('Datos recibidos en el servidor:', req.file, req.body);
  try {
    if (!req.file) {
      return res.status(400).send('No se ha proporcionado un archivo Excel');
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const range = xlsx.utils.decode_range(sheet['!ref']);
    const rows = range.e.r + 1;

    for (let i = 1; i < rows; i++) {
      const manufacturingCost = sheet[`F${i + 1}`].v;
      const state = sheet[`E${i + 1}`].v;
      const orderDetailString = sheet[`A${i + 1}`].v;

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

      const newOrder = new Orders({
        manufacturingCost,
        state,
        orderDetail,
      });

      await newOrder.save();
    }

    res.status(200).json({ message: 'Datos almacenados exitosamente en la base de datos' });
  } catch (error) {
    console.error('Error al procesar los datos:', error);
    res.status(500).send('Error interno del servidor');
  }
};

