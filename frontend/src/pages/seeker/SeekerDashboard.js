import React from 'react';
import { Link } from 'react-router-dom';

const SeekerDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Seeker Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link to="/briefs/create" className="card hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-xl font-semibold mb-2">สร้าง Project Brief</h2>
          <p className="text-gray-600">ระบุรายละเอียดโครงการเพื่อค้นหาผู้เชี่ยวชาญที่เหมาะสม</p>
        </Link>
        
        <Link to="/briefs" className="card hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">📁</div>
          <h2 className="text-xl font-semibold mb-2">My Briefs</h2>
          <p className="text-gray-600">จัดการ Brief และดูผู้เชี่ยวชาญที่แนะนำ</p>
        </Link>
        
        <Link to="/seeker/consultations" className="card hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">💼</div>
          <h2 className="text-xl font-semibold mb-2">My Consultations</h2>
          <p className="text-gray-600">ดูและจัดการคำขอคำปรึกษา</p>
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
