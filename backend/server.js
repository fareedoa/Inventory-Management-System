const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import configurations and middleware
const connectDB = require("./config/database");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

// Import routes
const indexRoutes = require("./routes/index");

// Initialize Express app
const app = express();

// Middleware
// CORS configuration - allows frontend to access API
const corsOptions = {
    origin: process.env.FRONTEND_URL || "*", // Allow all origins in development
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(logger); // Log all incoming requests

// Routes
app.use("/api", indexRoutes);

// Error handling middleware (must be after routes)
app.use(notFound);
app.use(errorHandler);

// Server configuration
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
        });
    } catch (error) {
        console.error("Failed to connect to database:", error.message);
        process.exit(1);
    }
};

startServer();
