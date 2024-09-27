import express from 'express'
import { Category } from './lapCategory.js'

const CategoryRouter = express.Router()

CategoryRouter.post('/add/',async(request,response)=>{
    console.log(request.body)
    let new_cato = new Category(request.body)
    await new_cato.save()

    response.json(new_cato)

})

CategoryRouter.get('/all/',async(request,response)=>{
    let all = await Category.find({})
    response.json(all) 
})

CategoryRouter.get('/:id/',async(request,response)=>{
    const {id} = request.params
   let  Id = await Category.findById(id)
    response.json(Id)

})



CategoryRouter.delete('/delete/:id',async(request,response)=>{
    const {id} = request.params
    await Category.findByIdAndDelete(id)
    response.json({method:"Data Deleted"})

})

export default CategoryRouter