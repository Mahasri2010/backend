import express from "express";
import { Lap_Details } from "./lapModel.js";
import { authentication } from "../Authentication/authentication.js";

const lapRouter = express.Router()

lapRouter.post('/add/',async(request,response)=>{
   console.log(request.body)

    let new_lap = new Lap_Details(request.body)
    await new_lap.save()

   response.json("data stored")
})

lapRouter.get('/all/',async (request,response) => {

    let lap = await Lap_Details.find({})
    response.json(lap)  
})

lapRouter.get('/:id/',async(request,response)=>{
    const {id} = request.params
    let lap_Id =  await Lap_Details.findById(id)
    response.json(lap_Id)
  
})

lapRouter.patch('/update/:id/', async(request,response)=>{

    const {id} = request.params
    await Lap_Details.findByIdAndUpdate(id,request.body)
    response.json({"message":"Data Updated"})

})

lapRouter.delete('/delete/:id/',async(request,response)=>{
    const {id}=request.params
    await Lap_Details.findByIdAndDelete(id)
    response.json({"method":"Data Deleted"})
})

export default lapRouter