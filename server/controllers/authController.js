import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';

// new account 
export const register = async  (req,res)=> {
    
    const {name ,email, password} = req.body;
    if(!name || !email || !password){
        return res.json({
            success:false,
            message: 'missing Details'
        })
    }


    try {
        console.log('Incoming data:', req.body);
        const existingUser = await userModel.findOne({email})
        console.log('Existing user check:', existingUser);

        if(existingUser){
            return res.json({
                success:false,
                message: 'user already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        console.log('Hashed password:', hashedPassword);


        const user = new userModel({
            name,
            email,
            password: hashedPassword

        });

      
        await user.save();
        console.log('User saved:', user);



        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:'7d'
        });


        res.cookie('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 1000
        })
       // sending mail
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to my Purple world ,Your Registration Successful',
            text: `Hello ${name},welcome to my Purple world! Your registration was successful. your account has been created with the email: ${email}.`,
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true})

    } catch (error) {
        console.error("Error in register area:", error);
        return res.status(500).json({success:false, message: 'Internal server error'});
    }
}



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


   export const sendVerifyOtp = async (req,res)=>{

   }