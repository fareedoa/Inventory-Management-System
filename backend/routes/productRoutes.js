const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getLowStockProducts,
    getOutOfStockProducts,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/auth");

// Special routes (must be before /:id to avoid conflicts)
// Special routes (must be before /:id to avoid conflicts)
/**
 * @route   GET /api/products/lowstock
 * @desc    Get low stock products
 * @access  Public
 */
router.get("/lowstock", getLowStockProducts);

/**
 * @route   GET /api/products/outofstock
 * @desc    Get out of stock products
 * @access  Public
 */
router.get("/outofstock", getOutOfStockProducts);

// Main CRUD routes
/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getProducts);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private/Admin
 */
router.post("/", protect, authorize("admin"), createProduct);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", getProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Private/Admin
 */
router.put("/:id", protect, authorize("admin"), updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Private/Admin
 */
router.delete("/:id", protect, authorize("admin"), deleteProduct);

module.exports = router;

