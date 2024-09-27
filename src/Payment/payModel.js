import mongoose from "mongoose";

const PaymentSchema = mongoose.Schema(
    {
        dealers: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "customer"
        },
        total_purchase: Number,
        pay: Number,
        balance: Number
    }
)

export const Payment = mongoose.model('payment', PaymentSchema)