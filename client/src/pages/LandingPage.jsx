import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiTrendingUp, FiAward, FiShield } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

export default function LandingPage() {
  const { user } = useAuth();

  const features = [
    {
      icon: FaBrain,
      title: 'AI-Powered Analysis',
      description: 'Automatic complaint analysis using advanced AI algorithms',
    },
    {
      icon: FiTrendingUp,
      title: 'Priority Detection',
      description: 'Smart priority assignment based on complaint severity',
    },
    {
      icon: FiShield,
      title: 'Department Routing',
      description: 'Automated routing to appropriate government departments',
    },
    {
      icon: FiAward,
      title: 'Real-time Tracking',
      description: 'Monitor complaint status with real-time updates',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Citizen',
      content: 'Amazing platform! My complaint was resolved much faster than expected.',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      name: 'Priya Sharma',
      role: 'Admin Official',
      content: 'The AI analysis saves us hours of manual work every day.',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      name: 'Amit Patel',
      role: 'Citizen',
      content: 'Transparent process and excellent customer service!',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            AI-Powered Smart Complaint Management
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Revolutionize how citizens report complaints and how governments respond. Fast, fair, and AI-intelligent.
          </p>
          <div className="flex gap-4 justify-center">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
                >
                  Go to Dashboard <FiArrowRight />
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
                >
                  Get Started <FiArrowRight />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-16 glass rounded-2xl p-8 shadow-2xl"
        >
          <div className="aspect-video bg-gradient-primary bg-opacity-20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FaBrain size={64} className="text-primary mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">AI-Powered Dashboard Preview</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need for intelligent complaint management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-6 hover:shadow-xl transition"
            >
              <feature.icon size={40} className="text-primary mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose ComplaintAI?
            </h2>
            <ul className="space-y-4">
              {[
                'Lightning-fast complaint processing',
                'AI-driven intelligent routing',
                'Real-time status tracking',
                'Secure and transparent system',
                '24/7 availability',
                'Multi-language support',
              ].map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <FiCheck className="text-primary flex-shrink-0" size={24} />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              By The Numbers
            </h3>
            <div className="space-y-6">
              {[
                { number: '10K+', label: 'Complaints Resolved' },
                { number: '98%', label: 'Satisfaction Rate' },
                { number: '45min', label: 'Avg Response Time' },
                { number: '50+', label: 'Departments Integrated' },
              ].map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold gradient-text">{stat.number}</p>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What People Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-6"
            >
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-12 bg-gradient-primary bg-opacity-10"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Transform Complaint Management?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Join thousands of satisfied citizens and officials using ComplaintAI
          </p>
          {!user && (
            <Link
              to="/signup"
              className="px-8 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
            >
              Start Free Today <FiArrowRight />
            </Link>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold gradient-text mb-4">ComplaintAI</h3>
              <p className="text-gray-400">Intelligent complaint management powered by AI</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ComplaintAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
