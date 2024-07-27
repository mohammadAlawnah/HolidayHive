import { Schema, model } from "mongoose";

const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug : {
        type : String,
        require : true,
    },

    description: {
        type: String,
        required: true,
        trim: true
    },
    image :{
        type : Object,
        require : true,
    },
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    continent: {
        type: String,
        required: true,
        enum: ['Africa', 'Asia', 'Europe', 'North America', 'South America']  
    },
    currency: {
        type: String,
        required: true,
        trim: true,
        enum: ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD']  
    },
    officialLanguage: {
        type: String,
        required: true,
        trim: true,
        enum: ['English', 'Spanish', 'Chinese', 'Hindi', 'Arabic', 'French', 'Russian', 'Portuguese', 'Japanese', 'German']  // قائمة اللغات الرسمية الممكنة
    },
    status : {
        type : String,
        default : 'Active',
        enum : ['Active','NotActive'],
    },


    // gdp: {
    //     type: Number,
    //     required: true
    // }

}, {
    timestamps: true 
});

const countryModel = model('country',countrySchema)
export default countryModel;
