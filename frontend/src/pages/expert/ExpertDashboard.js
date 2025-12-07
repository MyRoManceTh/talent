import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { expertService } from '../../services/api';
import { toast } from 'react-toastify';

const ExpertDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [profileRes, consultationsRes] = await Promise.all([
        expertService.getProfile(),
        expertService.getConsultations(),
      ]);
      setProfile(profileRes.data);
      setConsultations(consultationsRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const pendingRequests = consultations.filter(c => c.status === 'SENT_TO_EXPERT');
  const activeConsultations = consultations.filter(c => c.status === 'ACCEPTED' || c.status === 'IN_PROGRESS');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Expert Dashboard</h1>

      {/* Profile Completion */}
      {profile && (
        <div className="card mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-2">Profile Completeness</h2>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary-600 h-4 rounded-full"
                  style={{ width: `${profile.profileCompleteness}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{profile.profileCompleteness}% complete</p>
            </div>
            <Link to="/expert/profile" className="btn-primary">
              Complete Profile
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium">Pending Requests</h3>
          <p className="text-3xl font-bold text-primary-600">{pendingRequests.length}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium">Active Consultations</h3>
          <p className="text-3xl font-bold text-green-600">{activeConsultations.length}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-600 text-sm font-medium">Total Consultations</h3>
          <p className="text-3xl font-bold text-gray-900">{profile?.totalConsultations || 0}</p>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Consultation Requests</h2>
          <Link to="/expert/consultations" className="text-primary-600 hover:text-primary-700">
            View All
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {pendingRequests.slice(0, 5).map((consultation) => (
              <div key={consultation.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">{consultation.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {consultation.problemStatement.substring(0, 150)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    From: {consultation.seeker.user.firstName} {consultation.seeker.user.lastName}
                  </span>
                  <Link
                    to="/expert/consultations"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertDashboard;
