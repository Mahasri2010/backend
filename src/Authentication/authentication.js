import jwt from "jsonwebtoken";
import {config} from "dotenv"

config()

export const authentication = (request,response,next) =>{

    console.log(request.headers)

    const authHeader = request.headers['authorization']

    console.log(authHeader)

    const token = authHeader && authHeader.split(' ')[1]

    console.log()

    console.log(token, "token")

    if(token === null) return response.sendStatus(401)

        jwt.verify(token,process.env.ACCESS_TOKEN_KEY,(error,user)=>{

            console.log("error")
            
            if(error) {
                console.log(error)
                return response.sendStatus(403)
            }
            request.user = user
            next()
        })

}