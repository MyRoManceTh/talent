import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { expertService } from '../../services/api';

const ExpertProfileView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await expertService.getProfile();
      if (response.data) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast.error('ไม่สามารถโหลดโปรไฟล์ได้');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดโปรไฟล์...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ยังไม่มีโปรไฟล์</h2>
          <p className="text-gray-600 mb-6">กรุณาสร้างโปรไฟล์ของคุณเพื่อเริ่มใช้งาน</p>
          <button
            onClick={() => navigate('/expert/profile/edit')}
            className="btn-primary px-6 py-3"
          >
            สร้างโปรไฟล์
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Edit Button */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">โปรไฟล์ของฉัน</h1>
            <p className="text-gray-600 mt-1">นี่คือมุมมองที่ผู้อื่นเห็นโปรไฟล์ของคุณ</p>
          </div>
          <button
            onClick={() => navigate('/expert/profile/edit')}
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            <span>✏️</span>
            <span>แก้ไขโปรไฟล์</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{profile.user?.firstName} {profile.user?.lastName}</h2>
                    <p className="text-xl text-primary-100 mt-1">{profile.headline}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  profile.availability === 'AVAILABLE' ? 'bg-green-500' :
                  profile.availability === 'BUSY' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-white mr-2"></span>
                  {profile.availability === 'AVAILABLE' && 'พร้อมให้คำปรึกษา'}
                  {profile.availability === 'BUSY' && 'ไม่ว่าง'}
                  {profile.availability === 'NOT_AVAILABLE' && 'ไม่รับงานชั่วคราว'}
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 py-8">
            {/* Quick Info */}
            <div className="grid md:grid-cols-4 gap-6 mb-8 pb-8 border-b">
              <div>
                <p className="text-sm text-gray-600 mb-1">ประสบการณ์</p>
                <p className="text-2xl font-bold text-primary-600">{profile.yearsOfExperience}+ ปี</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">อัตราค่าบริการ</p>
                <p className="text-2xl font-bold text-primary-600">
                  {profile.hourlyRate ? `฿${profile.hourlyRate}/ชม.` : 'ติดต่อสอบถาม'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">รูปแบบ</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {profile.preferredMode?.map((mode, idx) => (
                    <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {mode === 'ONLINE' && '💻 ออนไลน์'}
                      {mode === 'ONSITE' && '🏢 Onsite'}
                      {mode === 'HYBRID' && '🔄 Hybrid'}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">ที่อยู่</p>
                <p className="text-sm font-medium text-gray-900">
                  {profile.city && profile.country ? `${profile.city}, ${profile.country}` : 'ไม่ระบุ'}
                </p>
              </div>
            </div>

            {/* About / Bio */}
            <div className="mb-8 pb-8 border-b">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>👨‍💼</span>
                <span>เกี่ยวกับ</span>
              </h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{profile.bio}</p>
              
              {/* Talenter Additional Info */}
              {(profile.currentCompany || profile.currentPosition || profile.workStatus || profile.dateOfBirth || profile.contactPhone) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">ข้อมูลเพิ่มเติม</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {profile.currentCompany && (
                      <div>
                        <span className="text-gray-600">องค์กรปัจจุบัน:</span>
                        <span className="ml-2 font-medium text-gray-900">{profile.currentCompany}</span>
                      </div>
                    )}
                    {profile.currentPosition && (
                      <div>
                        <span className="text-gray-600">ตำแหน่งปัจจุบัน:</span>
                        <span className="ml-2 font-medium text-gray-900">{profile.currentPosition}</span>
                      </div>
                    )}
                    {profile.workStatus && (
                      <div>
                        <span className="text-gray-600">สถานะการทำงาน:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {profile.workStatus === 'WORKING' && 'ปฏิบัติงานอยู่'}
                          {profile.workStatus === 'RETIRED' && 'เกษียณ'}
                          {profile.workStatus === 'LOOKING' && 'กำลังหางาน'}
                          {profile.workStatus === 'FREELANCE' && 'ฟรีแลนซ์'}
                          {profile.workStatus === 'OTHER' && 'อื่นๆ'}
                        </span>
                      </div>
                    )}
                    {profile.contactPhone && (
                      <div>
                        <span className="text-gray-600">เบอร์ติดต่อ:</span>
                        <span className="ml-2 font-medium text-gray-900">{profile.contactPhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Mission Interests */}
              {profile.missionInterests && profile.missionInterests.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">ภารกิจที่สนใจ:</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.missionInterests.map((interest, idx) => (
                      <span key={idx} className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  <span>🔗</span>
                  <span>LinkedIn Profile</span>
                </a>
              )}
            </div>

            {/* Experience */}
            {((profile.experience && profile.experience.length > 0) || (profile.workExperiences && profile.workExperiences.length > 0)) && (
              <div className="mb-8 pb-8 border-b">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>💼</span>
                  <span>ประสบการณ์การทำงาน</span>
                </h3>
                <div className="space-y-6">
                  {(profile.experience || profile.workExperiences || []).map((exp, idx) => (
                    <div key={idx} className="relative pl-8 pb-6 border-l-2 border-primary-200 last:border-l-0 last:pb-0">
                      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-600 border-4 border-white"></div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{exp.position || exp.title}</h4>
                        <p className="text-primary-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {exp.startDate instanceof Date ? exp.startDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'short' }) : exp.startDate} - {exp.isCurrent ? 'ปัจจุบัน' : (exp.endDate instanceof Date ? exp.endDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'short' }) : exp.endDate)}
                        </p>
                        {exp.keyResponsibilities && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-xs font-semibold text-green-800 mb-1">🎯 จุดเน้นที่สามารถถ่ายทอด / ทักษะที่เชี่ยวชาญ:</p>
                            <p className="text-sm text-gray-700 whitespace-pre-line">{exp.keyResponsibilities}</p>
                          </div>
                        )}
                        {exp.description && (
                          <p className="text-gray-700 mt-3 whitespace-pre-line">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🎓</span>
                  <span>การศึกษา</span>
                </h3>
                <div className="space-y-4">
                  {profile.education.map((edu, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                      <p className="text-primary-600 font-medium">{edu.institution}</p>
                      {edu.fieldOfStudy && (
                        <p className="text-sm text-gray-600 mt-1">สาขา: {edu.fieldOfStudy}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        {edu.startYear} - {edu.endYear || 'ปัจจุบัน'}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-gray-700 mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="mb-8 pb-8 border-b">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>⚡</span>
                  <span>ทักษะและความเชี่ยวชาญ</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill, idx) => {
                    // Support both formats: direct skill object or nested skill.skill
                    const skillName = skill.name || skill.skill?.name || '';
                    const proficiency = skill.proficiencyLevel || skill.proficiency || 'INTERMEDIATE';
                    
                    return (
                      <div
                        key={idx}
                        className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        <span className="font-medium">{skillName}</span>
                        <span className="text-xs bg-primary-200 px-2 py-0.5 rounded-full">
                          {proficiency === 'BEGINNER' && '🌱 เริ่มต้น'}
                          {proficiency === 'INTERMEDIATE' && '⭐ ปานกลาง'}
                          {proficiency === 'ADVANCED' && '🔥 ขั้นสูง'}
                          {proficiency === 'EXPERT' && '👑 ผู้เชี่ยวชาญ'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Achievements */}
            {profile.achievements && profile.achievements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span>🏆</span>
                  <span>ผลงานและรางวัล</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.achievements.map((achievement, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">🏅</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                          {achievement.organization && (
                            <p className="text-sm text-gray-700 mt-1">{achievement.organization}</p>
                          )}
                          {achievement.date && (
                            <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                          )}
                          {achievement.description && (
                            <p className="text-sm text-gray-600 mt-2">{achievement.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-6 border-t">
              <button
                onClick={() => navigate('/expert/dashboard')}
                className="btn-secondary px-6 py-3"
              >
                ← กลับไป Dashboard
              </button>
              <button
                onClick={() => navigate('/expert/profile/edit')}
                className="btn-primary px-6 py-3"
              >
                ✏️ แก้ไขโปรไฟล์
              </button>
            </div>
          </div>
        </div>

        {/* Profile Completeness Card */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">ความสมบูรณ์ของโปรไฟล์</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ข้อมูลทั่วไป</span>
              <span className={`text-sm font-medium ${profile.headline && profile.bio ? 'text-green-600' : 'text-gray-400'}`}>
                {profile.headline && profile.bio ? '✅ เสร็จสิ้น' : '⚠️ ยังไม่สมบูรณ์'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">การศึกษา</span>
              <span className={`text-sm font-medium ${profile.education?.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                {profile.education?.length > 0 ? `✅ ${profile.education.length} รายการ` : '⚠️ ยังไม่มีข้อมูล'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ประสบการณ์การทำงาน</span>
              <span className={`text-sm font-medium ${(profile.experience?.length > 0 || profile.workExperiences?.length > 0) ? 'text-green-600' : 'text-gray-400'}`}>
                {(profile.experience?.length > 0 || profile.workExperiences?.length > 0) ? `✅ ${(profile.experience || profile.workExperiences || []).length} รายการ` : '⚠️ ยังไม่มีข้อมูล'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ทักษะ</span>
              <span className={`text-sm font-medium ${profile.skills?.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                {profile.skills?.length > 0 ? `✅ ${profile.skills.length} รายการ` : '⚠️ ยังไม่มีข้อมูล'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">ผลงาน/รางวัล</span>
              <span className={`text-sm font-medium ${profile.achievements?.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                {profile.achievements?.length > 0 ? `✅ ${profile.achievements.length} รายการ` : '⚠️ ยังไม่มีข้อมูล'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfileView;
