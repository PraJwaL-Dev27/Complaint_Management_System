import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiClock, FiDelete, FiEdit } from 'react-icons/fi';
import { complaintService } from '../services/serviceApi';
import AIAnalysisPanel from '../components/AIAnalysisPanel';
import SkeletonLoader from '../components/SkeletonLoader';
import { useAuth } from '../hooks/useAuth';

const categories = [
  'Water Supply',
  'Electricity',
  'Sanitation',
  'Roads',
  'Public Health',
  'Transportation',
  'Other',
];

export default function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    title: '',
    description: '',
    category: '',
    location: '',
  });

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const setComplaintState = (complaintData) => {
    setComplaint(complaintData);
    setNewStatus(complaintData.status);
    setEditForm({
      name: complaintData.name || '',
      email: complaintData.email || '',
      title: complaintData.title || '',
      description: complaintData.description || '',
      category: complaintData.category || 'Other',
      location: complaintData.location || '',
    });
  };

  const fetchComplaint = async () => {
    try {
      const response = await complaintService.getById(id);
      setComplaintState(response.data.data);
    } catch (error) {
      console.error('Error fetching complaint:', error);
      setError(error.response?.data?.message || 'Failed to load complaint');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (newStatus === complaint.status) return;

    setUpdating(true);
    setError('');
    try {
      const response = await complaintService.update(id, { status: newStatus });
      setComplaintState(response.data.data);
    } catch (error) {
      console.error('Error updating complaint:', error);
      setError(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setError('');
    setComplaintState(complaint);
  };

  const handleEditSave = async () => {
    const payload = {
      name: editForm.name.trim(),
      email: editForm.email.trim(),
      title: editForm.title.trim(),
      description: editForm.description.trim(),
      category: editForm.category,
      location: editForm.location.trim(),
    };

    if (!payload.name || !payload.email || !payload.title || !payload.description || !payload.category || !payload.location) {
      setError('Please fill all required fields');
      return;
    }

    setUpdating(true);
    setError('');
    try {
      const response = await complaintService.update(id, payload);
      setComplaintState(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating complaint:', error);
      setError(error.response?.data?.message || 'Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) return;

    setError('');
    try {
      await complaintService.delete(id);
      navigate('/complaints');
    } catch (error) {
      console.error('Error deleting complaint:', error);
      setError(error.response?.data?.message || 'Failed to delete complaint');
    }
  };

  if (loading) return <SkeletonLoader />;
  if (!complaint) return <div className="p-8 text-center">Complaint not found</div>;

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

  const complaintOwnerId = complaint.userId?._id || complaint.userId;
  const isOwner = user?.id === complaintOwnerId;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:underline mb-8 font-semibold"
        >
          <FiArrowLeft /> Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass rounded-xl p-8">
              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900 rounded-lg text-red-700 dark:text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      maxLength={100}
                      className="w-full px-4 py-2 mb-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition text-2xl font-bold"
                      required
                    />
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {complaint.title}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        {complaint.category} - {complaint.location}
                      </p>
                    </>
                  )}
                </div>

                {(isOwner || isAdmin) && (
                  <div className="flex gap-2">
                    {isOwner && !isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                        title="Edit complaint"
                      >
                        <FiEdit size={20} />
                      </button>
                    )}
                    <button
                      onClick={handleDelete}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition"
                      title="Delete complaint"
                    >
                      <FiDelete size={20} />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColors[complaint.priority]}`}>
                  {complaint.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[complaint.status]}`}>
                  {complaint.status}
                </span>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      maxLength={2000}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</label>
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                        required
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={editForm.location}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleEditSave}
                      disabled={updating}
                      className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
                    >
                      {updating ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleEditCancel}
                      disabled={updating}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</p>
                    <p className="text-gray-900 dark:text-white leading-relaxed">{complaint.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</p>
                      <p className="text-gray-900 dark:text-white">{complaint.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</p>
                      <p className="text-gray-900 dark:text-white">{complaint.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Registered</p>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Updated</p>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(complaint.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isAdmin && (
              <div className="glass rounded-xl p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Update Status
                </h3>
                <div className="flex gap-4">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary dark:bg-gray-800 dark:text-white transition"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStatusUpdate}
                    disabled={updating || newStatus === complaint.status}
                    className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:opacity-90 transition disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Update'}
                  </motion.button>
                </div>
              </div>
            )}

            {complaint.activityLog && complaint.activityLog.length > 0 && (
              <div className="glass rounded-xl p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Activity Log
                </h3>
                <div className="space-y-3">
                  {complaint.activityLog.map((log, idx) => (
                    <div key={idx} className="flex gap-4 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <FiClock className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{log.action}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{log.details}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {complaint.aiAnalysis && (
              <AIAnalysisPanel analysis={complaint.aiAnalysis} loading={false} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
