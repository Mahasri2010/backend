import express from 'express'
import {Stocks} from './stockModel.js' 

const StockRouter = express.Router()

StockRouter.post('/add/',async(request,response)=>{
    console.log(request.body)
    let stock = new Stocks(request.body)
    await stock.save()

    response.json({method:"Data Stored"})
})


StockRouter.get('/all/',async (request,response) => {

    let lap = await Stocks.find({})
    response.json(lap)  
})

StockRouter.get('/:id/',async(request,response)=>{
    const {id} = request.params
    let lap_Id =  await Stocks.findById(id)
    response.json(lap_Id)
  
})

StockRouter.patch('/update/:id/',async(request,response)=>{

    const {id} = request.params
    await Stocks.findByIdAndUpdate(id,request.body)
    response.json({"message":"Data Updated"})

})

StockRouter.delete('/delete/:id/',async(request,response)=>{
    const {id}=request.params
    await Stocks.findByIdAndDelete(id)
    response.json({"method":"Data Deleted"})
})


export default StockRouter;