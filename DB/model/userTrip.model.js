import { Schema,Types,model } from "mongoose";
const userTripSchema = new Schema({
    userId : {
        type : Types.ObjectId,
        ref: 'user',
        require : true
    },
    
    // trips : [{
    //     tripId : {
    //         type : Types.ObjectId,
    //         ref:'trip',
    //         require : true,
    //     },
    // }],

    tripId : [{
        type :Types.ObjectId,
        ref:'trip',
        require : true
    }],

    // startDate : {
    //     type :Date,
    //     require : true,
    // },
    // endDate : {
    //     type : Date,
    //     require : true,
    // },
    // totalDuration : {
    //     type : Number,
    //     require : true,
    // },
    NumperPeople : {
        type : Number,
        default : 1,
    },

},{
    timestamps : true
})

const userTripModel = new model('userTrip',userTripSchema)
export default userTripModel;
