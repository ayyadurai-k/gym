import ErrorHandler from "../utils/ErrorHandler.js";

const authenicateRole = (role) => {
    return (req,res,next)=>{
        const user = req.user;
        if(!(user.role===role)){
            return next(new ErrorHandler(`Not Aollowed ${user.role}...!`,401))
        }
        next();
    }
}

export default authenicateRole;
