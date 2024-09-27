import mongoose from "mongoose";

const lapModel = mongoose.Schema({
    brand:String,
    model:String,
    price:Number,
    cato_reference:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    os:String
})

export const Lap_Details = mongoose.model('laptops',lapModel)