const express = require('express');
const {
  createComplaint,
  getComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint,
  getStats,
} = require('../controllers/complaintController');
const { protect, authorize } = require('../middleware/auth');
const { validateComplaint, validationErrorHandler } = require('../validators/validators');

const router = express.Router();

// Stats route
router.get('/stats/overview', protect, getStats);

// Complaints routes
router.post('/', protect, validateComplaint, validationErrorHandler, createComplaint);
router.get('/', protect, getComplaints);
router.get('/:id', protect, getComplaintById);
router.put('/:id', protect, updateComplaint);
router.delete('/:id', protect, deleteComplaint);

module.exports = router;
