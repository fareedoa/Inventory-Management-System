

const {
    validateRequiredFields,
    validateEmail,
    validateObjectId,
    validatePassword,
    validateNumericFields,
    validateStringLength,
    validateEnum,
    sanitizeInput,
    validateBodySize,
    customValidation
} = require('../middleware/validate');
module.exports.validateRequiredFields = validateRequiredFields;
module.exports.validateEmail = validateEmail;
module.exports.validateObjectId = validateObjectId;
module.exports.validatePassword = validatePassword;
module.exports.validateNumericFields = validateNumericFields;
module.exports.validateStringLength = validateStringLength;
module.exports.validateEnum = validateEnum;
module.exports.sanitizeInput = sanitizeInput;
module.exports.validateBodySize = validateBodySize;
module.exports.customValidation = customValidation;

// Group exports for convenience
module.exports.validators = {
    validateRequiredFields,
    validateEmail,
    validateObjectId,
    validatePassword,
    validateNumericFields,
    validateStringLength,
    validateEnum,
    sanitizeInput,
    validateBodySize,
    customValidation
};
