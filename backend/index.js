import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
const app = express();

dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

//middleware
app.use(cookieParser());
// app.use((req, res, next) => {
//   //when i run my app it going to be ready for any api request
//   // as soon as i run my app it going to be ready for any api request
//   // as soon as user makes api request it gonna come here and "check all routes"
//   console.log("middleware!");
//   next();
// });
app.use(express.json());

app.use("/api/auth", authRoute); //anyuri,to visit the endpoint
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  //when i run my app it going to be ready for any api request
  // as soon as i run my app it going to be ready for any api request
  // as soon as user makes api request it gonna come here and "check all routes"
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
app.listen(5500, () => {
  connect();
  console.log("Server is running on port 5500 connected to backend !");
});
