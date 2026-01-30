const User = require("../models/User");

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/Admin
 */
exports.getUsers = async (req, res, next) => {
    try {
        // Optional filters
        const filter = {};

        if (req.query.role) {
            filter.role = req.query.role;
        }

        if (req.query.isActive !== undefined) {
            filter.isActive = req.query.isActive === "true";
        }

        const users = await User.find(filter)
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get single user by ID
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        next(error);
    }
};

/**
 * @desc    Update user details
 * @route   PUT /api/users/:id
 * @access  Private/Admin
 */
exports.updateUser = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Prevent updating password through this endpoint
        if (req.body.password) {
            return res.status(400).json({
                success: false,
                message: "Use the password update endpoint to change passwords",
            });
        }

        // If updating email, check for duplicates
        if (req.body.email && req.body.email !== user.email) {
            const existingUser = await User.findOne({
                email: req.body.email,
                _id: { $ne: req.params.id }
            });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "A user with this email already exists",
                });
            }
        }

        // Only allow certain fields to be updated
        const allowedUpdates = ["name", "email", "role", "isActive"];
        const updates = {};

        Object.keys(req.body).forEach(key => {
            if (allowedUpdates.includes(key)) {
                updates[key] = req.body[key];
            }
        });

        user = await User.findByIdAndUpdate(
            req.params.id,
            updates,
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", "),
            });
        }

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "A user with this email already exists",
            });
        }

        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        next(error);
    }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Prevent admin from deleting themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot delete your own account",
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: {},
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        next(error);
    }
};

/**
 * @desc    Update user role
 * @route   PATCH /api/users/:id/role
 * @access  Private/Admin
 */
exports.updateUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;

        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Please provide a role",
            });
        }

        if (!["user", "admin"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Role must be either 'user' or 'admin'",
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Prevent admin from changing their own role
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot change your own role",
            });
        }

        user.role = role;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User role updated to ${role}`,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        next(error);
    }
};

/**
 * @desc    Toggle user active status
 * @route   PATCH /api/users/:id/toggle
 * @access  Private/Admin
 */
exports.toggleUserStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Prevent admin from deactivating themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot deactivate your own account",
            });
        }

        user.isActive = !user.isActive;
        await user.save();

        res.status(200).json({
            success: true,
            message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                isActive: user.isActive,
            },
        });
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        next(error);
    }
};
