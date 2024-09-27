import express from 'express'
import { Bill } from "./billModel.js"
import { BillProduct } from "./billModel.js"
import { Lap_Details } from "../Laptop/lapModel.js"
import { Stocks } from '../Stock/stockModel.js'
import { authentication } from '../Authentication/authentication.js'


const BillRouter = express.Router()


BillRouter.post('/', async (request, response) => {
    console.log(request.body)

    const bill_details = request.body[0] // parent Model

    const bill_product = request.body[1] // child model

    const new_bill = new Bill(bill_details) // Bill-parent model
    await new_bill.save()

    let grand_total = 0

    for (let product of bill_product) {

        let laptop = await Lap_Details.findById(product.laptop_reference)

        let amount = Number(product.quantity) * Number(laptop.price)

        let gst_amount = (amount * Number(product.gst)) / 100

        let sub_total_amount = amount + gst_amount

        grand_total = grand_total + sub_total_amount

        const new_bill_product = new BillProduct(  // BillProduct - child model
            {
                laptop_reference: product.laptop_reference,
                bill_reference: new_bill._id,
                quantity: product.quantity,
                amount: amount,
                gst: product.gst,
                gst_amount: gst_amount,
                sub_total: sub_total_amount

            }
        )

        await new_bill_product.save()

    }

    await Bill.findByIdAndUpdate(new_bill._id, { bill_amount: grand_total })

    response.json({ "message": "Data Received" })
})



BillRouter.get('/all', async (request, response) => {
    const all_bill = await Bill.find({}) // parent

    let all_data = []

    for (let bill of all_bill) {
        const product_of_bill = await BillProduct.find({ "bill_reference": bill._id }) // child

        let single_data = {

            bill_data: bill,
            product_data: product_of_bill
        }
        all_data.push(single_data)
    }
    console.log(all_data)
    response.json(all_data)

})

BillRouter.get('/:id/', async (request, response) => {

    const { id } = request.params
    const bill = await Bill.findById(id)
    const product_of_bill = await BillProduct.find({ "bill_reference": bill._id })

    let single_data = {

        bill_data: bill,
        product_data: product_of_bill
    }
    response.json(single_data)
})



BillRouter.patch('/:id/',async(request,response)=>{
    const {id} = request.params

    console.log(request.body)

    const bill_details = request.body[0]
    const bill_products = request.body[1]

    await Bill.findByIdAndUpdate(id, bill_details)

    let grand_total = 0

    for (let product of bill_products) {

        if (product.new === true) {

            let stock_value = 0
            let stockdata = await Stocks.findOne({laptop:product.laptop_reference})
            stock_value = stockdata.stock - (product.quantity)

            await Stocks.findByIdAndUpdate(stockdata._id,{stock:stock_value})


            let laptop = await Lap_Details.findById(product.laptop_reference)

            let amount = Number(product.quantity) * Number(laptop.price)

            let gst_amount = (amount * Number(product.gst)) / 100
            
            let sub_total_amount = amount + gst_amount

            grand_total = grand_total + sub_total_amount

            const new_bill_product = new BillProduct(
                {
                    laptop_reference: product.laptop_reference,
                    bill_reference: id,
                    quantity: product.quantity,
                    amount: amount,
                    gst: product.gst,
                    gst_amount : gst_amount,
                    sub_total: sub_total_amount
                }
            )

            await new_bill_product.save()

        }

        else if (product.update === true) {

            let stock_value = 0

            let existing = (await BillProduct.findById(product._id)).quantity

            let stockdata = await Stocks.findOne({laptop:product.laptop_reference})

            console.log(stockdata,"stock")
            console.log(existing,"existing")
            console.log(product,"product")

            if(existing<product.quantity){
                let stocky = Number(product.quantity) - Number(existing)
                stock_value = stockdata.stock-stocky
            }
            else{
                let stocky = Number(product.quantity) - Number(existing)
                stock_value = stockdata.stock + stocky
            }
            console.log(stock_value,"stockvalue")

            await Stocks.findByIdAndUpdate(stockdata._id,{stock:stock_value})

            let laptop = await Lap_Details.findById(product.laptop_reference)

            let amount = Number(product.quantity) * Number(laptop.price)

            console.log(amount)

            let gst_amount = (amount * Number(product.gst)) / 100
            
            let sub_total_amount = amount + gst_amount

            grand_total = grand_total + sub_total_amount

            const new_bill_product = {
                    laptop_reference: product.laptop_reference,
                    bill_reference: id,
                    quantity: product.quantity,
                    amount: amount,
                    gst: product.gst,
                    gst_amount : gst_amount,
                    sub_total: sub_total_amount
                }

            await BillProduct.findByIdAndUpdate(product._id, new_bill_product)


        }

        else if (product.delete === true) {

            let stock_value = 0

            let existing = (await BillProduct.findById(product._id)).quantity

            let stockdata = await Stocks.findOne({laptop:product.laptop_reference})

            stock_value = stockdata.stock + (product.quantity)

            await Stocks.findByIdAndUpdate(stockdata._id,{stock:stock_value})

            await BillProduct.findByIdAndDelete(product._id)
        }

        else {
            grand_total = grand_total + product.sub_total
        }
    }

    await Bill.findByIdAndUpdate(id, {bill_amount: grand_total})

    response.json("Data Updated")
    
    
})



BillRouter.delete('/:id/', async (request, response) => {

    const { id } = request.params
    const product_of_bill = await BillProduct.find({ "bill_reference": id })

    for (let product of product_of_bill) {
        await BillProduct.findByIdAndDelete(product._id)
    }
    await Bill.findByIdAndDelete(id)

    response.json({ "method": "Data Deleted" })

})





export default BillRouter