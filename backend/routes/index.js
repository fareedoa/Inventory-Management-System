const express = require("express");
const router = express.Router();

// Import route modules
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const userRoutes = require("./userRoutes");

// Health check route
router.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
        timestamp: new Date().toISOString(),
    });
});

// API info route
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Inventory Management System API",
        version: "1.0.0",
    });
});

// Mount routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/users", userRoutes);

module.exports = router;
