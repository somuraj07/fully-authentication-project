import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import userModel from '../models/userModel.js';

// new account 
export const register = async  (req,res)=> {
    const {name,email, password} = req.body;
    if(!name || !email || !password){
        return res.json({
            success:false,
            message: 'missing Details'
        })
    }


    try {
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({
                success:false,
                message: 'user already exists'
            })
        }
        const hasedPassword = await bcrypt.hash(password,10);


        const user = new userModel({
            name,
            email,
            password:hasedPassword
        });

      
        await user.save();



        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        });


        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 1000
        })
        return res.json({success:true})

    } catch (error) {
        res.json({success:false,message:error.message})
        console.log("eorror in register area")
    }
}
console.log('Current directory:', import.meta.url);

export const test = (req, res) => {
  res.send('Auth controller working');
};

// sigin in 
export const login = async (req,res)=>{
     const {email,password}= req.body;


     if(!email || !password){
        return res.json({
            success:false,
            message:"email and password requires"
        })
        }


        try {
            const user = await userModel.findOne({email});

            if(!user){
                return res.json({
                    success:false,
                    message:'invalid email'
                })
            }

            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.json({
                    success:false,
                    message:'invalid password'
                })
            }

            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
                expiresIn:'7d'
            });
    
    
            res.cookie('token',token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === 'production',
                sameSite:process.removeListener.NODE_ENV === 'production'? 'none':'strict',
                maxAge: 7 * 24 * 60 * 1000
            })


            return res.json({success:true})
        } catch (error) {
            return res.json({
            success:false,
            message:error.message
        })
        }
     }

     // logout 
export const logout = async (req,res)=>{
   try {

    res.clearCookie('token',{
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite:process.removeListener.NODE_ENV === 'production'? 'none':'strict',
    })
    return res.json({
        success:true,
        message:'loggedout'
    })
    
   } catch (error) {
    return res.json({
        success:false,
        message:error.message
    })
   }}
