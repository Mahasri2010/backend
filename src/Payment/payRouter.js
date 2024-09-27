import express, { request, response } from 'express'
import { Payment } from './payModel.js'

const PaymentRouter = express.Router()

PaymentRouter.post('/add',async(request,response)=>{
    console.log(request.body)
    let pay = new Payment(request.body)
    await pay.save()

    response.json(pay)
})

PaymentRouter.get('/all',async(request,response)=>{

    let all = await Payment.find({})
    response.json(all)
})

PaymentRouter.get('/:id',async(request,response)=>{

    const {id} = request.params
    let pay_Id =  await Payment.findById(id)
    response.json(pay_Id)
})

PaymentRouter.patch('/update/:id',async(response,request)=>{

    const {id} = request.params
    await Payment.findByIdAndUpdate(id,request.body)
    response.json("Data Updated")
})

PaymentRouter.delete('/delete/:id',async(request,response)=>{

    const {id} = request.params
    await Payment.findByIdAndDelete(id,request.body)
    response.json("Data Updated")
})

export default PaymentRouter
