import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageExperts = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    availability: 'ALL',
    search: ''
  });

  useEffect(() => {
    fetchExperts();
  }, [filters]);

  const fetchExperts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams();
      
      if (filters.availability !== 'ALL') {
        queryParams.append('availability', filters.availability);
      }
      if (filters.search) {
        queryParams.append('search', filters.search);
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/experts?${queryParams}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch experts');

      const data = await response.json();
      setExperts(data.data);
    } catch (error) {
      console.error('Error fetching experts:', error);
      toast.error('ไม่สามารถโหลดข้อมูลผู้เชี่ยวชาญได้');
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityBadge = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return { color: 'bg-green-100 text-green-800', text: '✓ พร้อมให้คำปรึกษา' };
      case 'BUSY':
        return { color: 'bg-yellow-100 text-yellow-800', text: '⏳ ไม่ว่าง' };
      case 'NOT_AVAILABLE':
        return { color: 'bg-red-100 text-red-800', text: '✗ ไม่พร้อม' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: status };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎓 จัดการผู้เชี่ยวชาญ</h1>
        <p className="text-gray-600">ดูและจัดการผู้เชี่ยวชาญในระบบ</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 ค้นหา
            </label>
            <input
              type="text"
              placeholder="ชื่อ, ความเชี่ยวชาญ..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📊 สถานะ
            </label>
            <select
              value={filters.availability}
              onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
              className="input-field"
            >
              <option value="ALL">ทั้งหมด</option>
              <option value="AVAILABLE">พร้อมให้คำปรึกษา</option>
              <option value="BUSY">ไม่ว่าง</option>
              <option value="NOT_AVAILABLE">ไม่พร้อม</option>
            </select>
          </div>
        </div>
      </div>

      {/* Experts Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : experts.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">ไม่พบผู้เชี่ยวชาญในระบบ</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => {
            const availability = getAvailabilityBadge(expert.availability);
            return (
              <div key={expert.id} className="card hover:shadow-lg transition-shadow">
                {/* Header with Avatar */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0">
                    {expert.user?.profileImage ? (
                      <img
                        src={expert.user.profileImage}
                        alt={`${expert.user.firstName} ${expert.user.lastName}`}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-2xl text-primary-700 font-bold">
                          {expert.user?.firstName?.[0]}{expert.user?.lastName?.[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {expert.user?.firstName} {expert.user?.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">{expert.headline}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${availability.color}`}>
                    {availability.text}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">
                      {expert.yearsOfExperience || 0}
                    </p>
                    <p className="text-xs text-gray-600">ปีประสบการณ์</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">
                      {expert.rating ? expert.rating.toFixed(1) : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-600">คะแนน</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">
                      {expert.totalConsultations || 0}
                    </p>
                    <p className="text-xs text-gray-600">คำปรึกษา</p>
                  </div>
                </div>

                {/* Hourly Rate */}
                {expert.hourlyRate && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">ค่าบริการ</p>
                    <p className="text-xl font-bold text-primary-600">
                      ฿{parseFloat(expert.hourlyRate).toLocaleString()}/ชม.
                    </p>
                  </div>
                )}

                {/* Location */}
                {expert.country && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 flex items-center">
                      📍 {expert.city}, {expert.country}
                    </p>
                  </div>
                )}

                {/* Email & Phone */}
                <div className="mb-4 space-y-1">
                  <p className="text-sm text-gray-600 flex items-center">
                    📧 {expert.user?.email}
                  </p>
                  {expert.user?.phoneNumber && (
                    <p className="text-sm text-gray-600 flex items-center">
                      📱 {expert.user.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/expert/${expert.id}`}
                    className="flex-1 btn-outline text-center py-2 text-sm"
                  >
                    👁️ ดูโปรไฟล์
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageExperts;
