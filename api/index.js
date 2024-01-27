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

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
