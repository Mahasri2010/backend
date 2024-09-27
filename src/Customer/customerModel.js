import moongose from 'mongoose'

const customer = moongose.Schema({
    company_name:String,
    customer_name:String,
    customer_phno:Number,
    customer_email:String,
    customer_address:String
}) 

export const Customer = moongose.model('customer',customer)