import React from 'react';
import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="space-y-4"
    >
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass rounded-lg p-4 h-20 animate-pulse" />
      ))}
    </motion.div>
  );
}
