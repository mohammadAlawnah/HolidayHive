import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/user.model.js'

export const roles = {
    Admin : 'Admin',
    SubAdmin : 'SubAdmin',
    User : 'User',
}

export const auth = (accessRole = [])=>{

    

    return async(req,res,next)=>{

        const {authorization} = req.headers;
        
        if(!authorization.startsWith(process.env.BERARTOKIN)){
            return res.status(400).json({message : 'invalid token'})
        }

        const token = authorization.split(process.env.BERARTOKIN)[1]

        const decoded = jwt.verify(token,process.env.LOGINSIG)

        if(!decoded){
            return res.status(400).json({message : 'Invalid token'})
        }

        const user = await userModel.findById(decoded.id).select('userName role');

        if(!user){
            return res.status(404).json({message : "usernot found"})
        }

        if(!accessRole.includes(user.role)){
            return res.json({message : 'not auth user'})
        }

        req.user = user;
        next();
    }

}