import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js"; // Import the user routes
import connectToDatabase from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/message", messageRoutes); // Message routes
app.use("/api/users", userRoutes); // Register user routes

// Start the server
const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
};

startServer();
