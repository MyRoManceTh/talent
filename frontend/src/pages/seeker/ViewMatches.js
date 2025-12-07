import React from 'react';

const ViewMatches = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">AI-Matched Experts</h1>
      <div className="card">
        <p className="text-gray-600">AI-matched expert recommendations will be displayed here.</p>
        <p className="text-sm text-gray-500 mt-2">
          Shows top 3 experts with matching scores, rationale, and ability to send connection requests
        </p>
      </div>
    </div>
  );
};

export default ViewMatches;
