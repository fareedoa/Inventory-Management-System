import { VALIDATION } from './constants';

/**
 * Validate email format
 */
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return 'Invalid email format';
  }
  return '';
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`;
  }
  return '';
};

/**
 * Validate name
 */
export const validateName = (name) => {
  if (!name) {
    return 'Name is required';
  }
  if (name.length < VALIDATION.NAME_MIN_LENGTH) {
    return `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`;
  }
  return '';
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};

/**
 * Validate number field
 */
export const validateNumber = (value, fieldName, min = 0) => {
  if (value === '' || value === null || value === undefined) {
    return `${fieldName} is required`;
  }
  const num = Number(value);
  if (isNaN(num)) {
    return `${fieldName} must be a number`;
  }
  if (num < min) {
    return `${fieldName} must be at least ${min}`;
  }
  return '';
};

/**
 * Validate price
 */
export const validatePrice = (price) => {
  return validateNumber(price, 'Price', VALIDATION.PRICE_MIN);
};

/**
 * Validate quantity
 */
export const validateQuantity = (quantity) => {
  return validateNumber(quantity, 'Quantity', VALIDATION.QUANTITY_MIN);
};

/**
 * Validate product form
 */
export const validateProductForm = (formData) => {
  const errors = {};

  const nameError = validateRequired(formData.name, 'Product name');
  if (nameError) errors.name = nameError;

  const priceError = validatePrice(formData.price);
  if (priceError) errors.price = priceError;

  const quantityError = validateQuantity(formData.quantity);
  if (quantityError) errors.quantity = quantityError;

  const categoryError = validateRequired(formData.category, 'Category');
  if (categoryError) errors.category = categoryError;

  return errors;
};

/**
 * Validate login form
 */
export const validateLoginForm = (formData) => {
  const errors = {};

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};

/**
 * Validate register form
 */
export const validateRegisterForm = (formData) => {
  const errors = {};

  const nameError = validateName(formData.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(formData.email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(formData.password);
  if (passwordError) errors.password = passwordError;

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

/**
 * Check if form has errors
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
