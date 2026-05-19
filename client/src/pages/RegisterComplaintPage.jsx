import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiSend, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { complaintService, aiService } from '../services/serviceApi';
import { useAuth } from '../hooks/useAuth';
import AIAnalysisPanel from '../components/AIAnalysisPanel';

export default function RegisterComplaintPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    category: 'Other',
    location: '',
  });
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    setFormData(prev => ({
      ...prev,
      name: prev.name || user.name || '',
      email: prev.email || user.email || '',
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const analyzeWithAI = async () => {
    if (!formData.title || !formData.description || !formData.category) {
      setError('Please fill title, description, and category first');
      return;
    }

    setAiLoading(true);
    try {
      const response = await aiService.analyze({
        title: formData.title,
        description: formData.description,
        category: formData.category,
      });
      setAiAnalysis(response.data.data);
    } catch (err) {
      console.error('AI Analysis failed:', err);
      setError(err.response?.data?.message || 'AI analysis failed');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const complaintData = {
      ...formData,
      name: (formData.name || user?.name || '').trim(),
      email: (formData.email || user?.email || '').trim(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      location: formData.location.trim(),
    };

    if (
      !complaintData.name ||
      !complaintData.email ||
      !complaintData.title ||
      !complaintData.description ||
      !complaintData.category ||
      !complaintData.location
    ) {
      setError('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await complaintService.create(complaintData);

      navigate('/complaints', { state: { message: 'Complaint registered successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to register complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Register a New Complaint
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Submit your complaint and get AI-powered analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass rounded-xl p-8 space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-red-50 dark:bg-red-900 rounded-lg flex items-start gap-3"
                >
                  <FiAlertCircle className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || user?.name || ''}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || user?.email || ''}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                    required
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Complaint Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Brief title of your complaint"
                  maxLength="100"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100</p>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of your complaint"
                  maxLength="2000"
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/2000</p>
              </div>

              {/* Category and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                    required
                  >
                    <option value="Water Supply">Water Supply</option>
                    <option value="Electricity">Electricity</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Roads">Roads</option>
                    <option value="Public Health">Public Health</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Area or address"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={analyzeWithAI}
                  disabled={aiLoading}
                  className="flex-1 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
                >
                  {aiLoading ? (
                    <>
                      <FiLoader className="animate-spin" /> Analyzing...
                    </>
                  ) : (
                    <>🤖 Get AI Analysis</>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <FiSend /> Submit Complaint
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>

          {/* AI Analysis Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AIAnalysisPanel analysis={aiAnalysis} loading={aiLoading} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
