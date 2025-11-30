import User from '../Models/User.Models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey=process.env.SECRET_KEY

export const Register=async(req,res)=>{
const {name,email,password}=req.body

const user= await User.findOne({email})

if(user){
    return res.json({msg:"user already exists"})

}
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);

const newUser= await User.create({
    name,email,password:hash
})

res.json(newUser)

}


export const Login=async(req,res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email})
    if(!user){
        return res.json({msg:"user not found"})
    
    }
const compare=await bcrypt.compare(password,user.password);
if(!compare){
   return res.status(300).json({msg:"invalid password"})
}

const token= jwt.sign(
    {
        id:user._id,
        name:user.name,
        email:user.email
    },
    secretKey,
    {
        expiresIn:'30d'
    }
)

res.json({msg:"success",token,user})
}