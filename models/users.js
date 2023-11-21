import mongoose from "mongoose";
const { Schema } = mongoose;


const usersSchema = mongoose.Schema( { 
    name: { 
        type: String,
        required: true
    }, 
    email: { 
        type: String,
        required: true,
    },
    password: { 
        type: String,
        required: true
    },
})

const User = mongoose.model("Users", usersSchema)

export default User;