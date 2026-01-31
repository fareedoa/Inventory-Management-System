const Category = require("../models/Category");
const Product = require("../models/Product");

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
exports.getCategories = async (req, res, next) => {
    try {
        // Get all active categories by default
        const filter = req.query.includeInactive === "true" ? {} : { isActive: true };

        const categories = await Category.find(filter).sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
exports.getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Optionally get product count for this category
        const productCount = await Product.countDocuments({ category: category._id });

        res.status(200).json({
            success: true,
            data: {
                ...category.toObject(),
                productCount,
            },
        });
    } catch (error) {
        // Handle invalid MongoDB ObjectId
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        next(error);
    }
};

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please provide a category name",
            });
        }

        // Check for duplicate category name
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "A category with this name already exists",
            });
        }

        const category = await Category.create({
            name,
            description,
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
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

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A category with this name already exists",
            });
        }

        next(error);
    }
};

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
exports.updateCategory = async (req, res, next) => {
    try {
        let category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // If updating name, check for duplicates
        if (req.body.name && req.body.name !== category.name) {
            const existingCategory = await Category.findOne({
                name: { $regex: new RegExp(`^${req.body.name}$`, 'i') },
                _id: { $ne: req.params.id }
            });

            if (existingCategory) {
                return res.status(400).json({
                    success: false,
                    message: "A category with this name already exists",
                });
            }
        }

        category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            data: category,
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

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A category with this name already exists",
            });
        }

        // Handle invalid MongoDB ObjectId
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        next(error);
    }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // Check if category has products
        const productCount = await Product.countDocuments({ category: category._id });

        if (productCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete category. ${productCount} product(s) are using this category. Please reassign or delete these products first.`,
            });
        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: {},
        });
    } catch (error) {
        // Handle invalid MongoDB ObjectId
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        next(error);
    }
};

/**
 * @desc    Toggle category active status
 * @route   PATCH /api/categories/:id/toggle
 * @access  Private/Admin
 */
exports.toggleCategoryStatus = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        category.isActive = !category.isActive;
        await category.save();

        res.status(200).json({
            success: true,
            message: `Category ${category.isActive ? 'activated' : 'deactivated'} successfully`,
            data: category,
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        next(error);
    }
};
