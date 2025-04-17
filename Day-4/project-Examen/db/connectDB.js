import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/auth-api")
    .then(() => console.log("Connected"))
    .catch((err) => console.error("connection error: ", err));
};

export default connectDB;
