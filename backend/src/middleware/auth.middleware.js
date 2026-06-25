import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from "../models/user.model.js";
dotenv.config();

export const authMiddleware = async (req,res,next)=>{
    try{
        
        const authHeader= req.headers.authorization || req.headers.Authorization; // getting hold of the authorization header from the request headers

        //checking if header is present or not and if present , checking if it starts with "Bearer" or not because that's the format of the token we get from user 
        if(!authHeader || !authHeader.startsWith("Bearer ")){ 
            return res.status(401).json({
                success:false,
                message:"Access denied"
            })
        }

        // if bearer token is present we get hold of it
        const token= authHeader.split(" ")[1]; //token lies at index 1 of the array after splitting the string by space

        // now we will verify if the user has this exact token in the database or not 
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user= await User.findById(decoded.id).select("-password");

        // if no user is found with this token we return 401 error
        if(!user){
            return res.status(401).json({
                success:false,
                message:"No user found with this token"
            })
        }

        req.user=user; // if user is found we attach the user object to the request object so that it can be accessed in the next middleware or route handler
        next(); // calling next() to pass control to the next middleware or route handler

        
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Internal server error",
        });
    }
}