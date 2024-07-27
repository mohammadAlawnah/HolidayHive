import { Schema,Types,model } from "mongoose";

const tripSchema = new Schema({
    userId : {
        type : Types.ObjectId,
        ref: 'user',
        require : true
    },
    destinations : [{
        destinationId : {
            type : Types.ObjectId,
            ref:'destination',
            require : true,
        },
        arrivalDate :{
            type : Date,
            require : true,
        },
        departureDate : {
            type : Date,
            require : true,
        },
        finalPriceDestination : {
            type : Number,
        },
    }],

    startDate : {
        type :Date,
        require : true,
    },
    endDate : {
        type : Date,
        require : true,
    },
    totalDuration : {
        type : Number,
        require : true,
    },
    NumperPeople : {
        type : Number,
        default : 1,
    },

    finalPrice : {
        type : Number,
        require : true,
    },




},{
    timestamps : true
})

const tripModel = new model('trip',tripSchema)
export default tripModel;