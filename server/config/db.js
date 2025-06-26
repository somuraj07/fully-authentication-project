import mongoose from "mongoose";
 const connectDB = async ()=>{
    mongoose.connection.on('connected',()=> console.log("daatabse connected"));
    await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
 }
 export default connectDB