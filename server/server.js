import express from "express";
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from './routes/authRoute.js'


const app = express();
const port = process.env.port || 4000
connectDB();
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true})) 


//end point of api
app.get("/",(req,res)=>{
    res.send("api is running hello ")
})
app.use('/api/auth',authRouter)

app.listen(port,()=> console.log("server is started "));