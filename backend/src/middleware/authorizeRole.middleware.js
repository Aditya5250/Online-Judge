const authorizeRoles= (...allowedRoles) => {
    return (req,res,next)=>{
        try{

             
            // if the user is not authenticated, it means the user is not authorized to perform this action, though it is handled by authMiddleware, but we are checking it here as well to be on the safer side
            if(!req.user){
                return res.status(401).json({
                    success:false,
                    message:"You are not authenticated!",
                })
            }


            // if the user's role is not in the allowed roles, it means the user is not authorized
            if(!allowedRoles.includes(req.user.role)){
                return res.status(403).json({
                    success:false,
                    message:"You are not authorized to perform this action",
                })
            }

            next();

        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Internal server error",
                error:err.message,
            })
        }
    }
}

export default authorizeRoles;