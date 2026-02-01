const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a product name"],
            trim: true,
            minlength: [2, "Product name must be at least 2 characters"],
            maxlength: [100, "Product name cannot exceed 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Please provide a product description"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        quantity: {
            type: Number,
            required: [true, "Please provide product quantity"],
            min: [0, "Quantity cannot be negative"],
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: "Quantity must be a whole number",
            },
        },
        price: {
            type: Number,
            min: [0, "Price cannot be negative"],
            default: 0,
            validate: {
                validator: function (value) {
                    // Allow up to 2 decimal places
                    return /^\d+(\.\d{1,2})?$/.test(value.toString());
                },
                message: "Price must have at most 2 decimal places",
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Please provide a product category"],
        },
        sku: {
            type: String,
            unique: true,
            sparse: true, // Allow multiple null values
            trim: true,
            uppercase: true,
            match: [
                /^[A-Z0-9-]+$/,
                "SKU can only contain uppercase letters, numbers, and hyphens",
            ],
        },
        image: {
            type: String,
            trim: true,
            match: [
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                "Please provide a valid image URL",
            ],
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        lowStockThreshold: {
            type: Number,
            min: [0, "Low stock threshold cannot be negative"],
            default: 10,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient queries
productSchema.index({ name: 1, category: 1 });
productSchema.index({ quantity: 1 });

// Virtual field to check if stock is low
productSchema.virtual("isLowStock").get(function () {
    return this.quantity <= this.lowStockThreshold && this.quantity > 0;
});

// Virtual field to check if out of stock
productSchema.virtual("isOutOfStock").get(function () {
    return this.quantity === 0;
});

// Pre-save middleware to update inStock status
productSchema.pre("save", function () {
    this.inStock = this.quantity > 0;
});

// Pre-update middleware to update inStock status
productSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();

    if (update.quantity !== undefined) {
        update.inStock = update.quantity > 0;
    }
});

// Method to update quantity
productSchema.methods.updateQuantity = async function (amount) {
    this.quantity += amount;
    if (this.quantity < 0) {
        throw new Error("Insufficient stock");
    }
    return await this.save();
};

// Static method to find low stock products
productSchema.statics.findLowStock = function () {
    return this.find({
        $expr: { $lte: ["$quantity", "$lowStockThreshold"] },
        quantity: { $gt: 0 },
    });
};

// Static method to find out of stock products
productSchema.statics.findOutOfStock = function () {
    return this.find({ quantity: 0 });
};

// Enable virtuals in JSON
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
