import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
const app = express();

dotenv.config();

app.listen(3000, () => {
  console.log("Connected to backend!");
});
