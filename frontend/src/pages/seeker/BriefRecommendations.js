import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BriefRecommendations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, [id]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/briefs/${id}/recommendations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ limit: 10 })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch recommendations');
      }

      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContactExpert = (expertId) => {
    // Navigate to consultation request page with brief and expert pre-filled
    navigate(`/consultations/create?briefId=${id}&expertId=${expertId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังหาผู้เชี่ยวชาญที่เหมาะสม...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">เกิดข้อผิดพลาด</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={() => navigate('/briefs')}
          className="mt-4 btn-secondary"
        >
          กลับไปหน้ารายการ Brief
        </button>
      </div>
    );
  }

  const { brief, recommendations } = data || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Brief Summary */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">ผู้เชี่ยวชาญที่แนะนำ</h1>
          <button
            onClick={() => navigate('/briefs')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← กลับ
          </button>
        </div>

        {brief && (
          <div className="card">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{brief.topic}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {getProjectTypeLabel(brief.projectType)}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{brief.goals}</p>
                
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
                  {brief.languages && brief.languages.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span>🗣️</span>
                      <span>{brief.languages.join(', ')}</span>
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
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          พบผู้เชี่ยวชาญ {recommendations?.length || 0} คน
        </h2>
        <p className="text-gray-600">
          เราได้คัดสรรผู้เชี่ยวชาญที่เหมาะสมกับความต้องการของคุณแล้ว
        </p>
      </div>

      {recommendations && recommendations.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((expert) => (
            <ExpertCard
              key={expert.id}
              expert={expert}
              onContact={() => handleContactExpert(expert.id)}
            />
          ))}
        </div>
      ) : (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">ไม่พบผู้เชี่ยวชาญที่ตรงกับเงื่อนไข</h3>
          <p className="text-gray-600 mb-6">
            ลองปรับเกณฑ์การค้นหาหรือติดต่อทีมงานเพื่อหาผู้เชี่ยวชาญที่เหมาะสม
          </p>
          <button
            onClick={() => navigate(`/briefs/${id}/edit`)}
            className="btn-primary"
          >
            แก้ไข Brief
          </button>
        </div>
      )}
    </div>
  );
};

// Expert Card Component
const ExpertCard = ({ expert, onContact }) => {
  const { user, matchingScore, headline, bio, yearsOfExperience, hourlyRate, rating, totalConsultations, skills, industries, languages, preferredMode } = expert;

  return (
    <div className="card hover:shadow-xl transition-shadow">
      {/* Matching Score Badge */}
      {matchingScore !== undefined && (
        <div className="absolute top-4 right-4">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {Math.round(matchingScore)}% Match
          </div>
        </div>
      )}

      {/* Expert Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {user?.firstName?.charAt(0) || 'E'}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {user?.firstName} {user?.lastName}
          </h3>
          {headline && (
            <p className="text-gray-600 text-sm mb-2">{headline}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {yearsOfExperience && (
              <span>📅 {yearsOfExperience} ปี</span>
            )}
            {rating && (
              <span>⭐ {parseFloat(rating).toFixed(1)}</span>
            )}
            {totalConsultations > 0 && (
              <span>💼 {totalConsultations} งาน</span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{bio}</p>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">ทักษะ</p>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 5).map((expertSkill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
              >
                {expertSkill.skill?.name}
              </span>
            ))}
            {skills.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{skills.length - 5}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Industries */}
      {industries && industries.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 mb-2">อุตสาหกรรม</p>
          <div className="flex flex-wrap gap-2">
            {industries.slice(0, 3).map((expertIndustry, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full"
              >
                {expertIndustry.industry?.name}
              </span>
            ))}
            {industries.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{industries.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-200">
        {languages && languages.length > 0 && (
          <div>
            <span className="font-medium">🗣️ ภาษา:</span> {languages.join(', ')}
          </div>
        )}
        {preferredMode && preferredMode.length > 0 && (
          <div>
            <span className="font-medium">📍 รูปแบบ:</span> {preferredMode.map(m => getWorkModeLabel(m)).join(', ')}
          </div>
        )}
      </div>

      {/* Pricing & Contact */}
      <div className="flex items-center justify-between">
        <div>
          {hourlyRate && (
            <div className="text-2xl font-bold text-gray-900">
              ฿{parseFloat(hourlyRate).toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/ชม.</span>
            </div>
          )}
        </div>
        <button
          onClick={onContact}
          className="btn-primary"
        >
          ติดต่อ
        </button>
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

export default BriefRecommendations;
