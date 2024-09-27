import express, { request, response } from 'express'
import { Customer } from './customerModel.js'

const CustomerRouter = express.Router()

CustomerRouter.post('/add/',async(request,response)=>{
    console.log(request.body)
    let Save = new Customer(request.body)
    await Save.save()
    response.json({method:"Data Stored"})
})

CustomerRouter.get('/all/',async(request,response)=>{

    let all = await Customer.find({})
    response.json(all)
})

CustomerRouter.get('/:id/',async(request,response)=>{
    const {id} = request.params
    let c_id = await Customer.findById(id)
    response.json(c_id)
})

CustomerRouter.patch('/update/:id/',async(request,response)=>{
    const {id} = request.params
    await Customer.findByIdAndUpdate(id)
    response.json({method:"Data Updated"})
})

CustomerRouter.delete('/delete/:id/',async(request,response)=>{
    const {id} = request.params
    await Customer.findByIdAndDelete(id)
    response.json({method:"Data Deleted"})
})

export default CustomerRouter