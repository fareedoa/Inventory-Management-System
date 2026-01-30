const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a category name"],
            unique: true,
            trim: true,
            minlength: [2, "Category name must be at least 2 characters"],
            maxlength: [50, "Category name cannot exceed 50 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster name lookups
// Index for faster name lookups - REMOVED (already indexed via unique: true)

// Virtual field to get products in this category
categorySchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "category",
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
