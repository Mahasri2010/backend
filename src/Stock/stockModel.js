import mongoose from 'mongoose';


const StockSchema = mongoose.Schema({
    laptop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lap_Details"
    },
    stock: Number
})


export const Stocks = mongoose.model('Stock', StockSchema);
