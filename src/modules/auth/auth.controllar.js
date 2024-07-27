import userModel from "../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,parseInt(process.env.SALTROUND))
    const user = await userModel.create(req.body)
    return res.status(201).json({message : "done"})
    
}

export const login = async(req,res)=>{

    const {email , password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(409).json({message : 'invalid data'})
    }

    if(user.status == 'NotActive'){
        return res.status.json({message : 'Youtr Acount is blocked'})
    }
    const match = await bcrypt.compare(password,user.password)

    if(!match){
        return res.status(400).json({message:"invalid data"})
    }

    const token = jwt.sign({id:user._id, role:user.role,status:user.status},process.env.LOGINSIG);

    return res.status(200).json({message : 'success',token})


}
