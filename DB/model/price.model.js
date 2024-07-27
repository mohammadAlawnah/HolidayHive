import { Schema,Types,model } from "mongoose";
const priceSchema = new Schema({
    amount : {
        type : Number,
        require : true,
        min:1
    },
    currency:{
        type : String,
        require : true,
        default : 'USD',
        enum: ['USD', 'EUR', 'GBP', 'JPY']
    },
    duration : {
        type : Number,
        require : true,
        min:1,
        default : 1
    },
    durationUnit:{
        type : String,
        require : true,
        enum: ['day', 'week', 'month'],
        default : 'day'
    },
});

const priceModel = model('price',priceSchema)
export default priceModel;