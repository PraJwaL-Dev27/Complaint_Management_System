import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiTrendingUp, FiMessageSquare } from 'react-icons/fi';

export default function AIAnalysisPanel({ analysis, loading }) {
  if (loading) {
    return <div className="glass rounded-xl p-6 animate-pulse h-40" />;
  }

  if (!analysis) {
    return (
      <div className="glass rounded-xl p-6 text-center text-gray-500">
        <FiAlertCircle size={32} className="mx-auto mb-2 opacity-50" />
        <p>No AI analysis available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">AI Analysis</h3>
        {analysis.provider && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Source: {analysis.provider === 'openrouter' ? 'OpenRouter AI' : 'Local fallback analysis'}
          </p>
        )}

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <FiTrendingUp className="text-primary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Urgency Level</p>
              <p className="text-gray-900 dark:text-white font-bold">{analysis.urgencyLevel}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiMessageSquare className="text-secondary flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Recommended Department</p>
              <p className="text-gray-900 dark:text-white font-bold">{analysis.department}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FiCheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Sentiment</p>
              <p className="text-gray-900 dark:text-white font-bold">{analysis.sentiment}</p>
            </div>
          </div>

          {analysis.confidence > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">AI Confidence</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.confidence}%` }}
                  transition={{ duration: 1 }}
                  className="bg-gradient-primary h-2 rounded-full"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{analysis.confidence}%</p>
            </div>
          )}
        </div>

        {analysis.summary && (
          <div className="mt-6 p-4 bg-gradient-primary bg-opacity-10 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">AI Summary</p>
            <p className="text-sm text-gray-900 dark:text-gray-100">{analysis.summary}</p>
          </div>
        )}

        {analysis.autoResponse && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">Automated Response</p>
            <p className="text-sm text-blue-900 dark:text-blue-100">{analysis.autoResponse}</p>
          </div>
        )}

        {analysis.note && (
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            {analysis.note}
          </p>
        )}
      </div>
    </motion.div>
  );
}
