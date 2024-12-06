import mongoose from 'mongoose'

const UserSchema = mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }     
    },
    {
        timestamps:true
    }
)

export const User = mongoose.model('User',UserSchema)

const RefreshTokenSchema = mongoose.Schema(
    {
        refresh_token:{
            type:String,
            required:true
        }
    }
)

export const RefreshToken = mongoose.model('RefreshToken',RefreshTokenSchema)

