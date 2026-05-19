import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle, FiClock, FiTrendingUp, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { complaintService } from '../services/serviceApi';
import { useAuth } from '../hooks/useAuth';
import StatsCard from '../components/StatsCard';
import SkeletonLoader from '../components/SkeletonLoader';
import ComplaintCard from '../components/ComplaintCard';

export default function UserDashboard() {
  const [stats, setStats] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, complaintsRes] = await Promise.all([
        complaintService.getStats(),
        complaintService.getAll({ limit: 5, page: 1 }),
      ]);

      setStats(statsRes.data.data);
      setComplaints(complaintsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your complaints with AI-powered insights
          </p>
        </motion.div>

        {/* Quick Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title="Total Complaints"
              value={stats.total}
              icon={FiAlertCircle}
              color="primary"
            />
            <StatsCard
              title="Pending"
              value={stats.pending}
              icon={FiClock}
              color="warning"
            />
            <StatsCard
              title="In Progress"
              value={stats.inProgress}
              icon={FiTrendingUp}
              color="info"
            />
            <StatsCard
              title="Resolved"
              value={stats.resolved}
              icon={FiCheckCircle}
              color="success"
            />
          </div>
        )}

        {/* Recent Complaints */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recent Complaints
            </h2>
            <Link
              to="/register-complaint"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition"
            >
              <FiPlus /> New Complaint
            </Link>
          </div>

          {complaints.length > 0 ? (
            <div className="grid gap-6">
              {complaints.map((complaint) => (
                <Link key={complaint._id} to={`/complaint/${complaint._id}`}>
                  <ComplaintCard complaint={complaint} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass rounded-xl p-12 text-center">
              <FiAlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">No complaints yet</p>
              <Link
                to="/register-complaint"
                className="inline-block px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition"
              >
                Register Your First Complaint
              </Link>
            </div>
          )}
        </motion.div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            to="/complaints"
            className="text-primary font-semibold hover:underline flex items-center justify-center gap-2"
          >
            View All Complaints →
          </Link>
        </div>
      </div>
    </div>
  );
}
