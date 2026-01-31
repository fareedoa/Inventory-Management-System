const Product = require("../models/Product");

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res, next) => {
    try {
        // Find all products (public access)
        const products = await Product.find({})
            .populate("category", "name description")
            .sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name description")
            .populate("createdBy", "name email");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        // Handle invalid MongoDB ObjectId
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        next(error);
    }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private
 */
exports.createProduct = async (req, res, next) => {
    try {
        const { name, description, quantity, price, category, sku, image, lowStockThreshold } = req.body;

        // Validate required fields
        if (!name || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, description, and category",
            });
        }

        // Create product with authenticated user as creator
        const product = await Product.create({
            name,
            description,
            quantity: quantity || 0,
            price: price || 0,
            category,
            sku,
            image,
            lowStockThreshold: lowStockThreshold || 10,
            createdBy: req.user.id,
        });

        // Populate category details
        await product.populate("category", "name description");

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", "),
            });
        }

        // Handle duplicate SKU error
        if (error.code === 11000 && error.keyPattern?.sku) {
            return res.status(400).json({
                success: false,
                message: "A product with this SKU already exists",
            });
        }

        next(error);
    }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private
 */
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Ensure user owns this product (or is admin)
        if (product.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this product",
            });
        }

        // Update product
        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,              // Return updated document
                runValidators: true,    // Run schema validations
            }
        ).populate("category", "name description");

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", "),
            });
        }

        // Handle duplicate SKU error
        if (error.code === 11000 && error.keyPattern?.sku) {
            return res.status(400).json({
                success: false,
                message: "A product with this SKU already exists",
            });
        }

        // Handle invalid MongoDB ObjectId
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        next(error);
    }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Ensure user owns this product (or is admin)
        if (product.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this product",
            });
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: {},
        });
    } catch (error) {
        // Handle invalid MongoDB ObjectId
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        next(error);
    }
};

/**
 * @desc    Get low stock products
 * @route   GET /api/products/lowstock
 * @access  Public
 */
exports.getLowStockProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            $expr: { $lte: ["$quantity", "$lowStockThreshold"] },
            quantity: { $gt: 0 },
        }).populate("category", "name");

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get out of stock products
 * @route   GET /api/products/outofstock
 * @access  Public
 */
exports.getOutOfStockProducts = async (req, res, next) => {
    try {
        const products = await Product.find({
            quantity: 0,
        }).populate("category", "name");

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};
