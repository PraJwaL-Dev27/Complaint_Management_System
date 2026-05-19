const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a complaint title'],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Please provide a complaint description'],
      maxlength: 2000,
    },
    category: {
      type: String,
      enum: [
        'Water Supply',
        'Electricity',
        'Sanitation',
        'Roads',
        'Public Health',
        'Transportation',
        'Other',
      ],
      required: [true, 'Please select a category'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Under Review', 'In Progress', 'Resolved', 'Closed'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium',
    },
    attachments: [
      {
        type: String,
      },
    ],
    aiAnalysis: {
      summary: String,
      department: String,
      autoResponse: String,
      sentiment: String,
      confidence: Number,
      urgencyLevel: String,
    },
    activityLog: [
      {
        action: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        details: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
