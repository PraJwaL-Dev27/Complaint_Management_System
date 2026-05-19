const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['user', 'admin']).withMessage('Role must be user or admin'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

const validateComplaint = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('title').trim().notEmpty().withMessage('Complaint title is required').isLength({ max: 100 }).withMessage('Title must be less than 100 characters'),
  body('description').trim().notEmpty().withMessage('Complaint description is required').isLength({ max: 2000 }).withMessage('Description must be less than 2000 characters'),
  body('category').notEmpty().withMessage('Category is required').isIn([
    'Water Supply',
    'Electricity',
    'Sanitation',
    'Roads',
    'Public Health',
    'Transportation',
    'Other',
  ]).withMessage('Invalid category'),
  body('location').trim().notEmpty().withMessage('Location is required'),
];

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array();

    return res.status(400).json({
      success: false,
      message: formattedErrors[0].msg,
      errors: formattedErrors,
    });
  }
  next();
};

module.exports = {
  validateSignup,
  validateLogin,
  validateComplaint,
  validationErrorHandler,
};
