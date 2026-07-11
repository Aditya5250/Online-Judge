import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";



export const signup = async (req, res) => {
    try {
        //getting hold of the user data from the request body
        const { fullname, username, email, password } = req.body;

        //checking if all the fields are entered by the user
        if (!fullname || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const duplicateUser = await User.findOne({ $or: [{ username }, { email }] });

        //checking if the user already exists in the database, we return 409 status code..
        if (duplicateUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists!!",
            })
        }
        //hashing the user entered password before saving it to the database
        const hash_password = await bcrypt.hash(password, 10);

        //creating a new user instance with the user data and hashed password
        const newUser = new User({
            fullname: fullname,
            username: username,
            email: email,
            password: hash_password,
        })

        //saving the new user to the database
        await newUser.save();

        //sending a success response to the client
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    }
    catch (err) { //catching any errors that occur during the user creation process and sending a 500 status code with the error message
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}

export const login =async (req,res)=>{
    
        const {email,password}=req.body; // getting hold of the email and password from the request body

        //checking if both email and password are provided by the user
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Both email and password are required"
            });
        }

        //checking if the user exists in the database by searching for the email

        const user= await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!!",
            })
        }


        // if user exists , we compare the provided password with the hashed password stored in the database using bcrypt.compare() method

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials!!",
            })
        }

        // if password matches, we generate a JWT token fot the user and send it back to the client along with a success message
        const token=generateToken(user._id);
        return res.status(200).json({
            success:true,
            token:token,
            message:"User logged in successfully",
        })
    
  
}