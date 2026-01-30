/**
 * Validation Middleware
 * Provides reusable validation functions for request validation
 */

/**
 * Validate required fields in request body
 * @param {Array<string>} fields - Array of required field names
 * @returns {Function} Express middleware function
 */
exports.validateRequiredFields = (fields) => {
    return (req, res, next) => {
        const missingFields = [];

        fields.forEach(field => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }

        next();
    };
};

/**
 * Validate email format
 * @param {string} fieldName - Name of the email field (default: 'email')
 * @returns {Function} Express middleware function
 */
exports.validateEmail = (fieldName = 'email') => {
    return (req, res, next) => {
        const email = req.body[fieldName];

        if (!email) {
            return next();
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address',
            });
        }

        next();
    };
};

/**
 * Validate MongoDB ObjectId format
 * @param {string} paramName - Name of the parameter containing the ID
 * @returns {Function} Express middleware function
 */
exports.validateObjectId = (paramName = 'id') => {
    return (req, res, next) => {
        const id = req.params[paramName];

        // MongoDB ObjectId is 24 hex characters
        const objectIdRegex = /^[0-9a-fA-F]{24}$/;

        if (!objectIdRegex.test(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format',
            });
        }

        next();
    };
};

/**
 * Validate password strength
 * @param {Object} options - Password validation options
 * @param {number} options.minLength - Minimum password length (default: 6)
 * @param {boolean} options.requireUppercase - Require uppercase letter (default: false)
 * @param {boolean} options.requireLowercase - Require lowercase letter (default: false)
 * @param {boolean} options.requireNumbers - Require numbers (default: false)
 * @param {boolean} options.requireSpecialChars - Require special characters (default: false)
 * @returns {Function} Express middleware function
 */
exports.validatePassword = (options = {}) => {
    const {
        minLength = 6,
        requireUppercase = false,
        requireLowercase = false,
        requireNumbers = false,
        requireSpecialChars = false,
    } = options;

    return (req, res, next) => {
        const password = req.body.password || req.body.newPassword;

        if (!password) {
            return next();
        }

        const errors = [];

        if (password.length < minLength) {
            errors.push(`Password must be at least ${minLength} characters`);
        }

        if (requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (requireNumbers && !/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }

        if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: errors.join(', '),
            });
        }

        next();
    };
};

/**
 * Validate numeric fields
 * @param {Object} fieldConfig - Configuration for numeric fields
 * @example validateNumericFields({ price: { min: 0 }, quantity: { min: 0, integer: true } })
 * @returns {Function} Express middleware function
 */
exports.validateNumericFields = (fieldConfig) => {
    return (req, res, next) => {
        const errors = [];

        Object.keys(fieldConfig).forEach(fieldName => {
            const value = req.body[fieldName];
            const config = fieldConfig[fieldName];

            if (value === undefined || value === null) {
                return;
            }

            const numValue = Number(value);

            if (isNaN(numValue)) {
                errors.push(`${fieldName} must be a number`);
                return;
            }

            if (config.min !== undefined && numValue < config.min) {
                errors.push(`${fieldName} must be at least ${config.min}`);
            }

            if (config.max !== undefined && numValue > config.max) {
                errors.push(`${fieldName} must be at most ${config.max}`);
            }

            if (config.integer && !Number.isInteger(numValue)) {
                errors.push(`${fieldName} must be a whole number`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: errors.join(', '),
            });
        }

        next();
    };
};

/**
 * Validate string length
 * @param {Object} fieldConfig - Configuration for string fields
 * @example validateStringLength({ name: { min: 2, max: 50 }, description: { max: 500 } })
 * @returns {Function} Express middleware function
 */
exports.validateStringLength = (fieldConfig) => {
    return (req, res, next) => {
        const errors = [];

        Object.keys(fieldConfig).forEach(fieldName => {
            const value = req.body[fieldName];
            const config = fieldConfig[fieldName];

            if (!value) {
                return;
            }

            if (typeof value !== 'string') {
                errors.push(`${fieldName} must be a string`);
                return;
            }

            const length = value.trim().length;

            if (config.min !== undefined && length < config.min) {
                errors.push(`${fieldName} must be at least ${config.min} characters`);
            }

            if (config.max !== undefined && length > config.max) {
                errors.push(`${fieldName} must be at most ${config.max} characters`);
            }
        });

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: errors.join(', '),
            });
        }

        next();
    };
};

/**
 * Validate enum values
 * @param {string} fieldName - Name of the field to validate
 * @param {Array} allowedValues - Array of allowed values
 * @returns {Function} Express middleware function
 */
exports.validateEnum = (fieldName, allowedValues) => {
    return (req, res, next) => {
        const value = req.body[fieldName];

        if (!value) {
            return next();
        }

        if (!allowedValues.includes(value)) {
            return res.status(400).json({
                success: false,
                message: `${fieldName} must be one of: ${allowedValues.join(', ')}`,
            });
        }

        next();
    };
};

/**
 * Sanitize input - trim whitespace from string fields
 * @param {Array<string>} fields - Array of field names to sanitize
 * @returns {Function} Express middleware function
 */
exports.sanitizeInput = (fields) => {
    return (req, res, next) => {
        fields.forEach(field => {
            if (req.body[field] && typeof req.body[field] === 'string') {
                req.body[field] = req.body[field].trim();
            }
        });

        next();
    };
};

/**
 * Validate request body size
 * @param {number} maxFields - Maximum number of fields allowed
 * @returns {Function} Express middleware function
 */
exports.validateBodySize = (maxFields = 20) => {
    return (req, res, next) => {
        const fieldCount = Object.keys(req.body).length;

        if (fieldCount > maxFields) {
            return res.status(400).json({
                success: false,
                message: `Too many fields in request body. Maximum ${maxFields} allowed.`,
            });
        }

        next();
    };
};

/**
 * Custom validation function wrapper
 * @param {Function} validationFn - Custom validation function that receives (req, res, next)
 * @returns {Function} Express middleware function
 */
exports.customValidation = (validationFn) => {
    return async (req, res, next) => {
        try {
            await validationFn(req, res, next);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message || 'Validation failed',
            });
        }
    };
};
