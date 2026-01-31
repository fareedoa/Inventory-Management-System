const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    updateUserRole,
    toggleUserStatus,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

// All routes require authentication and admin role
router.use(protect, authorize("admin"));

/**
 * @route   GET /api/users
 * @desc    Get all users (with optional filters)
 * @access  Private/Admin
 */
router.get("/", getUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get single user by ID
 * @access  Private/Admin
 */
router.get("/:id", getUser);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user details
 * @access  Private/Admin
 */
router.put("/:id", updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Private/Admin
 */
router.delete("/:id", deleteUser);

/**
 * @route   PATCH /api/users/:id/role
 * @desc    Update user role (user/admin)
 * @access  Private/Admin
 */
router.patch("/:id/role", updateUserRole);

/**
 * @route   PATCH /api/users/:id/toggle
 * @desc    Toggle user active/inactive status
 * @access  Private/Admin
 */
router.patch("/:id/toggle", toggleUserStatus);

module.exports = router;
