import mongoose from "mongoose";

const BillSchema = mongoose.Schema(
    {
        bill_number:{
            type:Number,
            required:true
        },
        bill_date:{
            type:String,
            required:true
        },
        dealers:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Customer"
        },
        bill_amount:Number
    }
) 

export const Bill = mongoose.model('bill',BillSchema)


const BillProductSchema = mongoose.Schema(
    {
        laptop_reference:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Lap_details"
        },
        bill_reference:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bill"
        },
        quantity:{
            type:Number,
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        gst:{
            type:Number,
            required:true
        },
        gst_amount:{
            type:Number,
            required:true
        },
        sub_total:{
            type:Number,
            required:true
        }
    }
)

export const BillProduct = mongoose.model('bill_product',BillProductSchema)