import mongoose, { Schema } from "mongoose";

const lapCategory = Schema({
    category:String
})

export const Category = mongoose.model('category',lapCategory)