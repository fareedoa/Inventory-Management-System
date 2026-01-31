const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect routes - Verify JWT token
 * This middleware checks if a valid JWT token is provided in the Authorization header
 */
exports.protect = async (req, res, next) => {
    let token;

    // Check if token exists in Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        // Extract token from "Bearer <token>"
        token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route. Please login.",
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token (exclude password)
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists",
            });
        }

        // Check if user is active
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: "Your account has been deactivated",
            });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        // Handle token errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired. Please login again.",
            });
        }

        return res.status(401).json({
            success: false,
            message: "Not authorized to access this route",
        });
    }
};

/**
 * Authorize specific roles
 * This middleware checks if the authenticated user has the required role
 * @param  {...string} roles - Allowed roles (e.g., 'admin', 'user')
 */
exports.authorize = (...roles) => {
    return (req, res, next) => {
        // Check if user exists (should be set by protect middleware)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Not authorized to access this route",
            });
        }

        // Check if user's role is in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this route`,
            });
        }

        next();
    };
};
