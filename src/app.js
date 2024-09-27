import express, { json} from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import cors from 'cors'
import lapRouter from './Laptop/lapRouter.js'
import BillRouter from './Bills/billRouter.js'
import CategoryRouter from './Category/categoryRouter.js'
import CustomerRouter from './Customer/customerRouter.js'
import StockRouter from './Stock/stockRouter.js'
import UserRouter from './Authentication/userRouter.js'
import PaymentRouter from './Payment/payRouter.js'



const app = express()
app.use(json())
config()
app.use(cors())

const port = process.env.port
const mongodb = process.env.mongodb


app.use('/lapdatas/',lapRouter)
app.use('/bill/',BillRouter)
app.use('/category/',CategoryRouter)
app.use('/customer/',CustomerRouter)
app.use('/stock/',StockRouter)
app.use('/user/',UserRouter)
app.use('/pay/',PaymentRouter)






const start = async () => {

    await connect(mongodb)
    app.listen(port, console.log(`Serving on the post ${port}`))
}

start()