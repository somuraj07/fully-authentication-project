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

  //verificarion otp
  export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.user.id;  
        const user = await userModel.findById(userId);

        if (user.isAccountVerifed) {
            return res.json({
                success: false,
                message: 'Account already verified',
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.verifyOtp = otp;
        user.verifyOtpExprirdAt = Date.now() + 24 * 60 * 60 * 1000;  

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify Your Account',
            text: `Hello ${user.name}, Your verification OTP is ${otp}.`,
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: 'OTP sent to your email',
        });
    } catch (error) {
        console.error("Error in sendVerifyOtp:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// verify otp
   export const verifyOtp = async (req,res)=>{
    const { otp } = req.body;
    const userId = req.user.id;
        if(!userId || !otp){
        return res.json({
            success:false,
            message:'missing details'
        })
    }
    try {
          
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({
                success:false,
                message:'user not found'
            })
        }
        if(!user.verifyOtp || user.verifyOtp.toString() !== otp.toString()){
            return res.json({
                success:false,
                message:'invalid otp'
            })
        }
        if(user.verifyOtpExprirdAt < Date.now()){
            return res.json({
                success:false,
                message:'otp expired'
            })
        }
        user.isAccountVerifed = true;
        
        user.verifyOtp = '';
        user.verifyOtpExprirdAt = 0;
        await user.save();
        return res.json({
            success:true,
            message:'account verified successfully'
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error.message
        })
    }

   }