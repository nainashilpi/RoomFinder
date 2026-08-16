
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import cors from "cors";
import roommateRoutes from "./routes/roommateRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";

//config
dotenv.config();

//express app
const app = express();

//connect to database
connectDB();

//middleware
app.use(express.json());
app.use(morgan("dev"));
const allowedOrigins = [
  "http://localhost:5173",
  "https://room-finder-tau.vercel.app"
];

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


//routes
app.get("/", (req, res) => {
    res.send("API is running...");
})

app.use("/api/auth", authRouter);

app.use("/api/roommates", roommateRoutes);
app.use("/api/properties", propertyRoutes);




// TEST CLOUDINARY CONNECTION
app.get("/api/test-cloudinary", async (req, res) => {
  try {
    const cloudinary = (await import("./config/cloudinary.js")).default;

    const result = await cloudinary.api.ping();

    res.status(200).json({
      success: true,
      message: "Cloudinary connection successful",
      result,
    });
  } catch (error) {
    console.error("CLOUDINARY TEST ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
      http_code: error.http_code,
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});