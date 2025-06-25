import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    verifyOtp:{type:String,default:''},
    verifyOtpExprirdAt:{type:Number,default:0},
    isAccountVerifed:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetOtpExpiredAT:{type:Number,default:0},
})

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;