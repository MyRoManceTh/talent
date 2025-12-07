import React from 'react';

const MyConsultations = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Consultations</h1>
      <div className="card">
        <p className="text-gray-600">List of your consultation requests will be displayed here.</p>
        <p className="text-sm text-gray-500 mt-2">
          View status, matched experts, and manage your consultation requests
        </p>
      </div>
    </div>
  );
};

export default MyConsultations;
