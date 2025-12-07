import React from 'react';
import { Link } from 'react-router-dom';

const SeekerDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Seeker Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Link to="/seeker/create-consultation" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Create New Consultation Request</h2>
          <p className="text-gray-600">Describe your business challenge and find the perfect expert</p>
        </Link>
        
        <Link to="/seeker/consultations" className="card hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">My Consultations</h2>
          <p className="text-gray-600">View and manage your consultation requests</p>
        </Link>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <p className="text-gray-600">Your recent consultations will appear here.</p>
      </div>
    </div>
  );
};

export default SeekerDashboard;
