import { Schema,Types,model } from "mongoose";

const tripSchema = new Schema({
    destinationId :{
        type:Types.ObjectId,
        ref : 'destination',
        require : true,
    },
    startDate : {
        type : Date,
        require : true
    },
    endDate : {
        type : Date,
        require : true,
    },
    price: {
        type : Types.ObjectId,
        ref :'price',
        require : true,
    },
})

const tripModel = new model('trip',tripSchema)
export default tripModel;