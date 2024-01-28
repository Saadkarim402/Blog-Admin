import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Server is connnected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

//useing it to make json useble
app.use(express.json());
app.listen(3000, () => {
  console.log("server is listening to port 3000");
});


// any incoming requests with paths starting with "/api/user" will be directed to the userRoutes handlers
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

//middleware
// Error-handling middleware is typically placed at the end of your middleware and route definitions.
// middleware functions have a specific signature with parameters (req, res, next)
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message||'internal server error';
  res.status(statusCode).json({
    succes:false,
    statusCode,
    message,
  })
})
