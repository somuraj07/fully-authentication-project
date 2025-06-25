import mongoose from "mongoose";
 const connectDB = async ()=>{
    mongoose.connection.on('connected',()=> console.log("daatabse connected"));
    await mongoose.connect(`${process.env.MONGODN_URL}/mern-auth`)
 }
 export default connectDB