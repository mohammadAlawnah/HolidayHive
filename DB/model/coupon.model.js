import { Schema, Types,model } from "mongoose";

const couponSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    usedBy:[
        {
            type:Types.ObjectId,
            ref:'user',
            required:true,
        },
    ],
    expireDate : {
        type:Date,
        required:true
    }


},{
    timestamps:true,

})

const couponModel = model('coupon',couponSchema);
export default couponModel;