import couponModel from "../../../DB/model/coupon.model.js"
export const create = async(req,res)=>{
    
    if(await couponModel.findOne({name : req.body.name})){

        return res.status(409).json({message : 'coupon already exist'})
    }

    req.body.expierDate = new Date(req.body.expierDate);

    const coupon = await couponModel.create(req.body);

    return res.json({message : 'success', coupon})
}

export const getAll = async(req,res)=>{
    const coupon = await couponModel.find({})

    return res.status(209).json({message : coupon})
}

export const getCoupon = async(req,res)=>{
    const {id} = req.params;

    const coupon = await couponModel.findById(id);

    if(!coupon){
        return res.status(409).json({message : 'coupon not found'})
    }

    if(coupon.expireDate < new Date()){
        return res.json({message : 'coupon expierd',coupon})
    }

    return res.status(209).json({message : coupon})

}

export const update = async(req,res)=>{
    const {id} = req.params;
    


}