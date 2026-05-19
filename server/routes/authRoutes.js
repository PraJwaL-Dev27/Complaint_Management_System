const express = require('express');
const { signup, login, getProfile, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateSignup, validateLogin, validationErrorHandler } = require('../validators/validators');

const router = express.Router();

router.post('/signup', validateSignup, validationErrorHandler, signup);
router.post('/login', validateLogin, validationErrorHandler, login);
router.get('/profile', protect, getProfile);
router.get('/logout', protect, logout);

module.exports = router;
