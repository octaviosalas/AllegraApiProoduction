import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDataBase = () => {
    mongoose.connect(process.env.MONGODB_URL)
      .then(() => { 
        console.log("Successful connection to your Allegra Production Database in the Cloud ✔");
      })
      .catch(err => {
        console.log("Error en la conexion a la base de datos en la Nube 👎");
        console.log(err); 
      });
  }
export default connectDataBase;