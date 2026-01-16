import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalExperts: 0,
    totalSeekers: 0,
    totalConsultations: 0,
    pendingConsultations: 0,
    totalBriefs: 0,
    loading: true
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats({
        ...data.data,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  if (stats.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔧 Admin Dashboard</h1>
        <p className="text-gray-600">ระบบจัดการหลังบ้าน Talent Thailand</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Users</p>
              <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
            </div>
            <div className="text-5xl opacity-80">👥</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm mb-1">Total Experts</p>
              <h3 className="text-3xl font-bold">{stats.totalExperts}</h3>
            </div>
            <div className="text-5xl opacity-80">🎓</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Total Seekers</p>
              <h3 className="text-3xl font-bold">{stats.totalSeekers}</h3>
            </div>
            <div className="text-5xl opacity-80">🔍</div>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Consultations</p>
              <h3 className="text-3xl font-bold">{stats.totalConsultations}</h3>
              <p className="text-green-100 text-xs mt-1">{stats.pendingConsultations} pending</p>
            </div>
            <div className="text-5xl opacity-80">💼</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">⚡ Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            to="/admin/users" 
            className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">👥</div>
              <div>
                <h3 className="font-semibold text-gray-900">จัดการผู้ใช้งาน</h3>
                <p className="text-sm text-gray-600">ดู แก้ไข และลบผู้ใช้</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/experts" 
            className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🎓</div>
              <div>
                <h3 className="font-semibold text-gray-900">จัดการผู้เชี่ยวชาญ</h3>
                <p className="text-sm text-gray-600">อนุมัติและตรวจสอบโปรไฟล์</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/consultations" 
            className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">💼</div>
              <div>
                <h3 className="font-semibold text-gray-900">จัดการ Consultations</h3>
                <p className="text-sm text-gray-600">ดูและจัดการคำขอทั้งหมด</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/briefs" 
            className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📋</div>
              <div>
                <h3 className="font-semibold text-gray-900">จัดการ Project Briefs</h3>
                <p className="text-sm text-gray-600">ดูและตรวจสอบโครงการ</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/reports" 
            className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">📊</div>
              <div>
                <h3 className="font-semibold text-gray-900">รายงาน</h3>
                <p className="text-sm text-gray-600">สถิติและวิเคราะห์ข้อมูล</p>
              </div>
            </div>
          </Link>

          <Link 
            to="/admin/settings" 
            className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="text-4xl">⚙️</div>
              <div>
                <h3 className="font-semibold text-gray-900">การตั้งค่า</h3>
                <p className="text-sm text-gray-600">ตั้งค่าระบบและการแจ้งเตือน</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">📈 Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">🆕</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New expert registered</p>
              <p className="text-xs text-gray-600">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">💼</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New consultation request</p>
              <p className="text-xs text-gray-600">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl">📋</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New project brief created</p>
              <p className="text-xs text-gray-600">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
