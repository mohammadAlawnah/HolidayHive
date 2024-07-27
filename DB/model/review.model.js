import {model,Schema,Types} from 'mongoose'

const reviewSchema = new Schema({
    comment:{
        type:String,
        require : true,
    },
    rating : {
        type : Number,
        require : true,
        min:1,
        max:5,
    },
    destinationId : {
        type : Types.ObjectId,
        ref : 'destination',
        require : true,
    },
    userID : {
        type : Types.ObjectId,
        ref : 'user',
        require : true,
    },
    image : { 
        type : Object,
    }
},{
    timestamps : true,
})

const reviewModel = model('review',reviewSchema);
export default reviewModel