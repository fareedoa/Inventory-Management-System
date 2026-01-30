const express = require("express");
const router = express.Router();
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
} = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/auth");

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get("/", getCategories);

/**
 * @route   GET /api/categories/:id
 * @desc    Get single category by ID
 * @access  Public
 */
router.get("/:id", getCategory);

/**
 * @route   POST /api/categories
 * @desc    Create new category
 * @access  Private/Admin
 */
router.post("/", protect, authorize("admin"), createCategory);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update category
 * @access  Private/Admin
 */
router.put("/:id", protect, authorize("admin"), updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete category
 * @access  Private/Admin
 */
router.delete("/:id", protect, authorize("admin"), deleteCategory);

/**
 * @route   PATCH /api/categories/:id/toggle
 * @desc    Toggle category active/inactive status
 * @access  Private/Admin
 */
router.patch("/:id/toggle", protect, authorize("admin"), toggleCategoryStatus);

module.exports = router;
