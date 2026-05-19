import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiAlertCircle, FiCheckCircle, FiClock } from 'react-icons/fi';

export default function StatsCard({ title, value, icon: Icon, color = 'primary', trend }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass rounded-xl p-6 shadow-lg hover:shadow-xl transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 flex items-center gap-1 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              <FiTrendingUp size={16} /> {trend > 0 ? '+' : ''}{trend}%
            </p>
          )}
        </div>
        <div className={`p-4 rounded-xl bg-gradient-primary bg-opacity-10`}>
          <Icon size={32} className="text-primary" />
        </div>
      </div>
    </motion.div>
  );
}
