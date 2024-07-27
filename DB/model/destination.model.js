import { Schema,Types,model } from "mongoose";
const destinationSchema = new Schema({
    name : {
        type : String,
        require : true,
    },
    slug : {
        type : String,
        require : true,
    },
    description : {
        type : String,
        require : true,
    },
    country :{
        type : Types.ObjectId,
        ref : 'country',
        require : true,
    },
    location : { 
        type : String,
        require : true,
    },
    ratings : {
        type : Number,
        require : true,
        min : 1,
        max : 5,
        default : 1,
    },
    mainImage : {
        type : Object,
        require : true,
    },
    subImages : {
        type : Object,
    },
    bestTimesToVisit : {
        type: [String],
        enum : ['summer','autumn','winter'],
        require : true

    },
    activities: {
        type: String,
    },
    price: {
        type : Types.ObjectId,
        ref :'price',
        require : true,
    },    
})
const destinationModel = model('destination',destinationSchema)
export default destinationModel;