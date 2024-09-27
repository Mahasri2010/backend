import mongoose from "mongoose";

const studentModel = mongoose.Schema({
    studentname:String,
    studentroll:String,
    studentage:Number,
    cls:String,
    exam:String,
    tamil:Number,
    english:Number,
    maths:Number,
    science:Number,
    social:Number,
    total:Number,
    average:Number,
    result:String,
    grade:String
})

export const Structure = mongoose.model('Marklist',studentModel)