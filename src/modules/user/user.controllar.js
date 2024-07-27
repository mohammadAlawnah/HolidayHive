import userModel from "../../../DB/model/user.model.js"
export const getAllUsers = async(req,res)=>{
    const users = await userModel.find({});
    return res.json({message : users})
}

export const getActiveUsers = async(req,res)=>{
    const users = await userModel.find({status: "Active"});
    return res.json({message : users})
}

export const getNotActiveUsers = async(req,res)=>{
    const users = await userModel.find({status: "NotActive"});
    return res.json({message : users})
}

export const getConfirmedUsers = async(req,res)=>{
    const users = await userModel.find({confirmEmail : true});
    return res.json({message : users})
}

export const getNotConfirmedUsers = async(req,res)=>{
    const users = await userModel.find({confirmEmail : false});
    return res.json({message : users})
}



export const updatRole = async(req,res)=>{
    const {email,role} = req.body;
    
    const user = await userModel.findOne({email});

    if(!user){
        return res.status(409).json({message : "user not found"})
    }

    if(user.role == role){
        return res.json({message : `The user is already the${role}`})
    }

    const newRoleUser = await userModel.updateOne({email},{role : role})

    return res.status(200).json({message :`user is ${role} now`})

}

