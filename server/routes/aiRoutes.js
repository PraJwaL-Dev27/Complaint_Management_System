const express = require('express');
const { protect } = require('../middleware/auth');
const aiService = require('../services/aiService');

const router = express.Router();

// @desc    Analyze complaint with AI
// @route   POST /api/ai/analyze
// @access  Private
router.post('/analyze', protect, async (req, res, next) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, and category',
      });
    }

    const analysis = await aiService.analyzeComplaint({
      title,
      description,
      category,
    });

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
