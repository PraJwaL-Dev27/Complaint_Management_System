const Complaint = require('../models/Complaint');
const aiService = require('../services/aiService');

// @desc    Create a new complaint
// @route   POST /api/complaints
// @access  Private
exports.createComplaint = async (req, res, next) => {
  try {
    const { name, email, title, description, category, location } = req.body;

    // Get AI Analysis
    let aiAnalysis = {};
    try {
      aiAnalysis = await aiService.analyzeComplaint({
        title,
        description,
        category,
      });
    } catch (aiError) {
      console.error('AI Analysis failed:', aiError);
      // Continue without AI analysis
      aiAnalysis = {
        urgencyLevel: 'Medium',
        department: 'Other',
        summary: description.substring(0, 200),
        autoResponse: 'Thank you for your complaint. We will review it and get back to you soon.',
        sentiment: 'Neutral',
        confidence: 0,
      };
    }

    const complaint = await Complaint.create({
      userId: req.user.id,
      name,
      email,
      title,
      description,
      category,
      location,
      priority: aiAnalysis.urgencyLevel,
      aiAnalysis,
      activityLog: [
        {
          action: 'Created',
          details: 'Complaint registered and AI analysis completed',
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all complaints
// @route   GET /api/complaints
// @access  Private
exports.getComplaints = async (req, res, next) => {
  try {
    const { status, category, priority, search, sortBy = '-createdAt', limit = 10, page = 1 } = req.query;

    let filter = {};

    // Apply filters
    if (req.user.role === 'user') {
      filter.userId = req.user.id;
    }

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (priority) filter.priority = priority;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;
    const total = await Complaint.countDocuments(filter);

    const complaints = await Complaint.find(filter)
      .sort(sortBy)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('userId', 'name email');

    res.status(200).json({
      success: true,
      count: complaints.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: complaints,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single complaint
// @route   GET /api/complaints/:id
// @access  Private
exports.getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('userId', 'name email');

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Check authorization
    if (req.user.role === 'user' && complaint.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this complaint' });
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update complaint
// @route   PUT /api/complaints/:id
// @access  Private
exports.updateComplaint = async (req, res, next) => {
  try {
    let complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Check authorization
    if (req.user.role === 'user' && complaint.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this complaint' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner = complaint.userId.toString() === req.user.id;

    // Only allow admin to update status
    if (req.body.status && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Only admin can update complaint status' });
    }

    const { status, name, email, title, description, category, location } = req.body;

    if (status) {
      complaint.status = status;
      complaint.activityLog.push({
        action: 'Status Updated',
        details: `Status changed to ${status}`,
      });
    }

    if (isOwner && !isAdmin) {
      const editableFields = { name, email, title, description, category, location };
      let changedFields = [];

      Object.entries(editableFields).forEach(([field, value]) => {
        if (typeof value === 'string' && value.trim() && complaint[field] !== value.trim()) {
          complaint[field] = value.trim();
          changedFields.push(field);
        }
      });

      if (changedFields.length > 0) {
        complaint.activityLog.push({
          action: 'Updated',
          details: `Updated ${changedFields.join(', ')}`,
        });
      }
    }

    complaint = await complaint.save();

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private/Admin
exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ success: false, message: 'Complaint not found' });
    }

    // Check authorization
    if (req.user.role === 'user' && complaint.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this complaint' });
    }

    await Complaint.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Complaint deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get complaint statistics
// @route   GET /api/complaints/stats/overview
// @access  Private
exports.getStats = async (req, res, next) => {
  try {
    let filter = {};

    if (req.user.role === 'user') {
      filter.userId = req.user.id;
    }

    const total = await Complaint.countDocuments(filter);
    const pending = await Complaint.countDocuments({ ...filter, status: 'Pending' });
    const resolved = await Complaint.countDocuments({ ...filter, status: 'Resolved' });
    const inProgress = await Complaint.countDocuments({ ...filter, status: 'In Progress' });

    const categoryStats = await Complaint.aggregate([
      { $match: filter },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const priorityStats = await Complaint.aggregate([
      { $match: filter },
      { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        resolved,
        inProgress,
        categoryStats,
        priorityStats,
      },
    });
  } catch (error) {
    next(error);
  }
};
