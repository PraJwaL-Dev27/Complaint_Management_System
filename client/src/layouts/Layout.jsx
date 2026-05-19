import React from 'react';
import Navbar from '../components/Navbar';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-light dark:bg-dark">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
