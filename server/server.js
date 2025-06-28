import express from "express";
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from './routes/authRoute.js'
import userRouter from "./routes/userRoutes.js";


const app = express();
const port = process.env.port || 4000
connectDB();
const allowedOrigin = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));


//end point of api
app.get("/",(req,res)=>{
    console.log(req.body);
    res.send("api is running hello ")
})
app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)


app.listen(port,()=> console.log("server is started "));