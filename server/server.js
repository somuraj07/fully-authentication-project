// index.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// ✅ Use correct PORT 
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// ✅ Allow both local and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",
  "https://fully-authentication-project.vercel.app"
];

app.use(express.json());
app.use(cookieParser());

// ✅ Setup CORS properly
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// ✅ API routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// Start server
app.listen(port, () => console.log(` Server running on port ${port}`));
