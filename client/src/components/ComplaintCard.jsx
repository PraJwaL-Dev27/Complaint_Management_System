import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAward, FiTrendingUp, FiShield } from 'react-icons/fi';

export default function ComplaintCard({ complaint, onClick }) {
  const priorityColors = {
    Low: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    High: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    Critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
  };

  const statusColors = {
    Pending: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    'Under Review': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    'In Progress': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    Resolved: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    Closed: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl p-6 cursor-pointer hover:shadow-xl transition"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {complaint.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {complaint.category} • {complaint.location}
          </p>
        </div>
        <FiArrowRight className="text-primary" />
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {complaint.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[complaint.priority]}`}>
          {complaint.priority}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[complaint.status]}`}>
          {complaint.status}
        </span>
      </div>

      {complaint.aiAnalysis?.summary && (
        <div className="bg-gradient-primary bg-opacity-10 rounded-lg p-3 mb-3">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            <FiAward className="inline mr-1" />
            AI Analysis: {complaint.aiAnalysis.summary.substring(0, 50)}...
          </p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
        {complaint.aiAnalysis?.department && (
          <span className="flex items-center gap-1">
            <FiShield size={14} /> {complaint.aiAnalysis.department}
          </span>
        )}
      </div>
    </motion.div>
  );
}
