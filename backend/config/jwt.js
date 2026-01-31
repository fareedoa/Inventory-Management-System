const jwt = require("jsonwebtoken");

// Validate required environment variables
if (!process.env.JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined in environment variables.");
    process.exit(1);
}

if (!process.env.JWT_EXPIRE) {
    console.warn("WARNING: JWT_EXPIRE is not defined. Using default: 1d");
}

// JWT Configuration
const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRE || "1d",

    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRE || "3d",
};

/**
 * Generate JWT access token
 * @param {string} userId - User ID to encode in token
 * @returns {string} Signed JWT token
 */
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );
};

/**
 * Generate refresh token (for future implementation)
 * @param {string} userId - User ID to encode in token
 * @returns {string} Signed refresh token
 */
const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId, type: "refresh" },
        jwtConfig.refreshTokenSecret,
        { expiresIn: jwtConfig.refreshTokenExpiresIn }
    );
};

/**
 * Verify JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid token");
        }
        if (error.name === "TokenExpiredError") {
            throw new Error("Token expired");
        }
        throw error;
    }
};

/**
 * Verify refresh token (for future implementation)
 * @param {string} token - Refresh token to verify
 * @returns {Object} Decoded token payload
 * @throws {Error} If token is invalid or expired
 */
const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, jwtConfig.refreshTokenSecret);
        if (decoded.type !== "refresh") {
            throw new Error("Invalid token type");
        }
        return decoded;
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            throw new Error("Invalid refresh token");
        }
        if (error.name === "TokenExpiredError") {
            throw new Error("Refresh token expired");
        }
        throw error;
    }
};

/**
 * Decode token without verification (useful for debugging)
 * @param {string} token - JWT token to decode
 * @returns {Object} Decoded token payload (unverified)
 */
const decodeToken = (token) => {
    return jwt.decode(token);
};

module.exports = {
    jwtConfig,
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken,
    decodeToken,
};
