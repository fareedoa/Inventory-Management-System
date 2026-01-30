const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getMe,
    updatePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged-in user
 * @access  Private
 */
router.get("/me", protect, getMe);

/**
 * @route   PUT /api/auth/updatepassword
 * @desc    Update user password
 * @access  Private
 */
router.put("/updatepassword", protect, updatePassword);

module.exports = router;
