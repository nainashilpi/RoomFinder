import mongoose from "mongoose";

const connectDB = async () => {
    if(!process.env.MONGO_URI){
         throw new Error("MONGO_URI is not defined in the environment variables");
    }
    if(!process.env.JWT_SECRET){
         throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
};

export default connectDB;