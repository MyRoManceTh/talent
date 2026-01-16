import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyBriefs = () => {
  const navigate = useNavigate();
  const [briefs, setBriefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'inactive'

  useEffect(() => {
    fetchBriefs();
  }, [filter]);

  const fetchBriefs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const url = filter === 'all' 
        ? 'http://localhost:5000/api/briefs'
        : `http://localhost:5000/api/briefs?isActive=${filter === 'active'}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch briefs');
      }

      setBriefs(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (briefId) => {
    if (!window.confirm('คุณต้องการลบ Brief นี้หรือไม่?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/briefs/${briefId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to delete brief');
      }

      // Refresh list
      fetchBriefs();
    } catch (err) {
      alert('เกิดข้อผิดพลาด: ' + err.message);
    }
  };

  const handleViewRecommendations = (briefId) => {
    navigate(`/briefs/${briefId}/recommendations`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Briefs</h1>
          <p className="text-gray-600 mt-1">จัดการ Brief และโครงการของคุณ</p>
        </div>
        <button
          onClick={() => navigate('/briefs/create')}
          className="btn-primary"
        >
          + สร้าง Brief ใหม่
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ทั้งหมด
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'active'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ใช้งาน
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'inactive'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ไม่ใช้งาน
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Briefs List */}
      {briefs.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">ยังไม่มี Brief</h3>
          <p className="text-gray-600 mb-6">
            สร้าง Brief แรกของคุณเพื่อเริ่มค้นหาผู้เชี่ยวชาญ
          </p>
          <button
            onClick={() => navigate('/briefs/create')}
            className="btn-primary"
          >
            สร้าง Brief ใหม่
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {briefs.map((brief) => (
            <BriefCard
              key={brief.id}
              brief={brief}
              onViewRecommendations={() => handleViewRecommendations(brief.id)}
              onDelete={() => handleDelete(brief.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Brief Card Component
const BriefCard = ({ brief, onViewRecommendations, onDelete }) => {
  const navigate = useNavigate();
  const consultationCount = brief.consultations?.length || 0;

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{brief.topic}</h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {getProjectTypeLabel(brief.projectType)}
            </span>
            {brief.isActive ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                ใช้งาน
              </span>
            ) : (
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                ไม่ใช้งาน
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-3 line-clamp-2">{brief.goals}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {brief.timeframe && (
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{getTimeframeLabel(brief.timeframe)}</span>
              </div>
            )}
            {brief.format && brief.format.length > 0 && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{brief.format.map(f => getWorkModeLabel(f)).join(', ')}</span>
              </div>
            )}
            {(brief.budgetMin || brief.budgetMax) && (
              <div className="flex items-center gap-2">
                <span>💰</span>
                <span>
                  {formatBudget(brief.budgetMin, brief.budgetMax, brief.budgetCurrency)}
                </span>
              </div>
            )}
            {consultationCount > 0 && (
              <div className="flex items-center gap-2">
                <span>💼</span>
                <span>{consultationCount} คำขอ</span>
              </div>
            )}
          </div>
        </div>

        <div className="ml-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyStyle(brief.urgency)}`}>
            {getUrgencyLabel(brief.urgency)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onViewRecommendations}
          className="btn-primary text-sm"
        >
          ดูผู้เชี่ยวชาญที่แนะนำ
        </button>
        <button
          onClick={() => navigate(`/briefs/${brief.id}`)}
          className="btn-secondary text-sm"
        >
          ดูรายละเอียด
        </button>
        <button
          onClick={onDelete}
          className="text-sm px-4 py-2 text-red-600 hover:text-red-700 font-medium"
        >
          ลบ
        </button>
      </div>

      {/* Timestamps */}
      <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>สร้างเมื่อ: {new Date(brief.createdAt).toLocaleDateString('th-TH')}</span>
          {brief.lastUsedAt && (
            <span>ใช้ล่าสุด: {new Date(brief.lastUsedAt).toLocaleDateString('th-TH')}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getProjectTypeLabel = (type) => {
  const labels = {
    STRATEGY_CONSULTING: 'กลยุทธ์',
    BUSINESS_DEVELOPMENT: 'พัฒนาธุรกิจ',
    MARKETING_BRANDING: 'การตลาด',
    TECHNOLOGY_IT: 'เทคโนโลยี',
    FINANCIAL_ADVISORY: 'การเงิน',
    HR_TALENT: 'HR',
    OPERATIONS_PROCESS: 'กระบวนการ',
    LEGAL_COMPLIANCE: 'กฎหมาย',
    TRAINING_WORKSHOP: 'อบรม',
    MENTORING_COACHING: 'โค้ช',
    RESEARCH_ANALYSIS: 'วิจัย',
    OTHER: 'อื่นๆ'
  };
  return labels[type] || type;
};

const getTimeframeLabel = (timeframe) => {
  const labels = {
    IMMEDIATE: 'ภายใน 1 สัปดาห์',
    SHORT_TERM: '1-4 สัปดาห์',
    MEDIUM_TERM: '1-3 เดือน',
    LONG_TERM: '3+ เดือน',
    ONGOING: 'ระยะยาว',
    FLEXIBLE: 'ยืดหยุ่น'
  };
  return labels[timeframe] || timeframe;
};

const getWorkModeLabel = (mode) => {
  const labels = {
    ONLINE: 'ออนไลน์',
    ONSITE: 'ออนไซต์',
    HYBRID: 'ผสมผสาน'
  };
  return labels[mode] || mode;
};

const getUrgencyLabel = (urgency) => {
  const labels = {
    LOW: 'ไม่เร่งด่วน',
    MEDIUM: 'ปานกลาง',
    HIGH: 'เร่งด่วน',
    CRITICAL: 'เร่งด่วนมาก'
  };
  return labels[urgency] || urgency;
};

const getUrgencyStyle = (urgency) => {
  const styles = {
    LOW: 'bg-green-100 text-green-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    CRITICAL: 'bg-red-100 text-red-800'
  };
  return styles[urgency] || 'bg-gray-100 text-gray-800';
};

const formatBudget = (min, max, currency = 'THB') => {
  const symbol = currency === 'THB' ? '฿' : currency;
  
  if (min && max) {
    return `${symbol}${parseFloat(min).toLocaleString()} - ${symbol}${parseFloat(max).toLocaleString()}`;
  } else if (min) {
    return `${symbol}${parseFloat(min).toLocaleString()}+`;
  } else if (max) {
    return `ไม่เกิน ${symbol}${parseFloat(max).toLocaleString()}`;
  }
  return 'ต่อรองได้';
};

export default MyBriefs;
