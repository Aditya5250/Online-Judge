import jwt from "jsonwebtoken";

//function to generate a JWT token for a user
export const generateToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d", //token will expire in 7 days
        }

    );

};