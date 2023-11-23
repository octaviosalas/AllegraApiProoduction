import mongoose from "mongoose";
const { Schema } = mongoose;


const usersSchema = mongoose.Schema( { 
    name: { 
        type: String,
        required: true
    }, 
    surname: { 
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    rol: { 
        type: Number, //1 - Admin 2-Confeccion 3-Corte 4-Planchado/ControlDeCalidad
        required: true
    },
})

const User = mongoose.model("Users", usersSchema)

export default User;