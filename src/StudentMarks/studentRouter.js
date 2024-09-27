import express, { request, response } from 'express'
import { Structure } from './StudentModel.js'

const studentRouter = express.Router()



studentRouter.get('/all/',async(request,response)=>{

    let all_stu = await Structure.find({})
    response.json(all_stu)
})

studentRouter.get('/:id/',async(request,response)=>{

    const {id} = request.params
   let stu_Id =  await Structure.findById(id)
   response.json(stu_Id)
})


studentRouter.post('/add/',async(request,response)=>{

    console.log(request.body)
    let add_stu = new Structure(request.body)
    await add_stu.save()
    response.json({"method":"Data Stored"})
})

studentRouter.patch('/update/:id/',async(request,response)=>{

    const {id} = request.params
    await Structure.findByIdAndUpdate(id,request.body)
    response.json({"method":"Data Updated"})

})

studentRouter.delete('/delete/:id/',async(request,response)=>{

    const {id} = request.params
    await Structure.findByIdAndDelete(id)
    response.json({"method":"Data Updated"})

})

export default studentRouter