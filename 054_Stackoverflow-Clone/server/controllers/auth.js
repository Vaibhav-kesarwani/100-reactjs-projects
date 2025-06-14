
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import user from '../models/auth.js'

export const signup =async(req,res)=>{
    const{name,email,password}=req.body;
    
    try{
        const existinguser =await user.findOne({email});
        if(existinguser){
            console.log(existinguser,"email")
            return res.status(404).json({message:"User Already Exist"})
        }

        const hashedPassword =await bcrypt.hash(password,12)
        const newUser=await user.create({name,email,password:hashedPassword})
        const token =jwt.sign({email:newUser.email,id:newUser._id},"test",{expiresIn:'1h'});
        res.status(200).json({result:newUser,token})

    }catch(error){
        console.log("hi",error)
        res.status(500).json("Something want Wrong...")
    }
}

export const login = async(req,res)=>{
    const{email,password}=req.body;
    try{
        const existinguser =await user.findOne({email});
        if(!existinguser){
            return  res.status(404).json({message:"User Don't Exist"})
            
        }

        const isPasswordCrt =await bcrypt.compare(password,existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).jscon({message:"Invalid Password . TrY Again"})
        }
        const token =jwt.sign({email:existinguser.email , id:existinguser._id},"test",{expiresIn:'1h'});
        res.status(200).json({result:existinguser,token})
        

    }catch(error){
        res.status(500).json("Something want Wrong...")
    }

}