import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        required:[true,"Full name is required"],
        trim:true,
    },
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        trim:true,
        minlength:[3,"Username must be at least 3 characters long"],
        maxlength:[20,"Username must be at most 20 characters long"],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at least 6 characters long"],
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    },
},
{
    timestamps:true,
}

);

const User=mongoose.model("User",userSchema);

export default User;