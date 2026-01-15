import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { expertService } from '../../services/api';

const ExpertProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Profile State
  const [profile, setProfile] = useState({
    // ข้อมูลส่วนตัว
    bio: '',
    headline: '',
    hourlyRate: '',
    yearsOfExperience: '',
    availability: 'AVAILABLE',
    linkedinUrl: '',
    country: '',
    city: '',
    timezone: '',
    preferredMode: [],
    languages: [],
    
    // การศึกษา
    education: [],
    
    // ประสบการณ์การทำงาน
    experience: [],
    
    // ทักษะ
    skills: [],
    
    // ผลงาน/รางวัล
    achievements: []
  });

  // Temporary states for adding new items
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startYear: '',
    endYear: '',
    description: ''
  });

  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    isCurrent: false
  });

  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'TECHNICAL',
    proficiencyLevel: 'INTERMEDIATE'
  });

  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
    date: '',
    organization: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await expertService.getProfile();
      if (response.data) {
        setProfile(prev => ({
          ...prev,
          ...response.data,
          education: response.data.education || [],
          experience: response.data.experience || [],
          skills: response.data.skills || [],
          achievements: response.data.achievements || []
        }));
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Education handlers
  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree) {
      toast.error('กรุณากรอกสถาบันและระดับการศึกษา');
      return;
    }
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { ...newEducation, id: Date.now() }]
    }));
    setNewEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      description: ''
    });
    toast.success('เพิ่มข้อมูลการศึกษาแล้ว');
  };

  const removeEducation = (id) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Experience handlers
  const addExperience = () => {
    if (!newExperience.company || !newExperience.position) {
      toast.error('กรุณากรอกบริษัทและตำแหน่ง');
      return;
    }
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { ...newExperience, id: Date.now() }]
    }));
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false
    });
    toast.success('เพิ่มประสบการณ์การทำงานแล้ว');
  };

  const removeExperience = (id) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  // Skills handlers
  const addSkill = () => {
    if (!newSkill.name) {
      toast.error('กรุณากรอกชื่อทักษะ');
      return;
    }
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, { ...newSkill, id: Date.now() }]
    }));
    setNewSkill({
      name: '',
      category: 'TECHNICAL',
      proficiencyLevel: 'INTERMEDIATE'
    });
    toast.success('เพิ่มทักษะแล้ว');
  };

  const removeSkill = (id) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  // Achievements handlers
  const addAchievement = () => {
    if (!newAchievement.title) {
      toast.error('กรุณากรอกชื่อผลงาน');
      return;
    }
    setProfile(prev => ({
      ...prev,
      achievements: [...prev.achievements, { ...newAchievement, id: Date.now() }]
    }));
    setNewAchievement({
      title: '',
      description: '',
      date: '',
      organization: ''
    });
    toast.success('เพิ่มผลงานแล้ว');
  };

  const removeAchievement = (id) => {
    setProfile(prev => ({
      ...prev,
      achievements: prev.achievements.filter(ach => ach.id !== id)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data with proper type conversion and filtering
      const profileData = {
        headline: profile.headline,
        bio: profile.bio,
        linkedinUrl: profile.linkedinUrl || null,
        yearsOfExperience: profile.yearsOfExperience ? parseInt(profile.yearsOfExperience, 10) : null,
        hourlyRate: profile.hourlyRate ? parseFloat(profile.hourlyRate) : null,
        availability: profile.availability,
        country: profile.country || null,
        city: profile.city || null,
        timezone: profile.timezone || null,
        preferredMode: profile.preferredMode.length > 0 ? profile.preferredMode : [],
        languages: profile.languages.length > 0 ? profile.languages : [],
      };

      console.log('Sending profile data:', profileData);
      await expertService.updateProfile(profileData);
      toast.success('บันทึกโปรไฟล์สำเร็จ!');
      navigate('/expert/dashboard');
    } catch (error) {
      console.error('Profile save error:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || error.message || 'เกิดข้อผิดพลาดในการบันทึก');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">สร้างโปรไฟล์ผู้เชี่ยวชาญ</h1>
          <p className="mt-2 text-gray-600">กรอกข้อมูลของคุณให้ครบถ้วนเพื่อให้ AI สามารถจับคู่คุณกับโอกาสที่เหมาะสมได้</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">
                    {step === 1 && 'ข้อมูลทั่วไป'}
                    {step === 2 && 'การศึกษา'}
                    {step === 3 && 'ประสบการณ์'}
                    {step === 4 && 'ทักษะ'}
                    {step === 5 && 'ผลงาน'}
                  </span>
                </div>
                {step < 5 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: ข้อมูลทั่วไป */}
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">ข้อมูลทั่วไป</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline (คำอธิบายตัวคุณแบบสั้น) *
                </label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => handleProfileChange('headline', e.target.value)}
                  placeholder="เช่น: Digital Transformation Expert | Ex-CTO | 15+ years experience"
                  className="w-full input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เกี่ยวกับคุณ (Bio) *
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
                  rows={6}
                  placeholder="เล่าเกี่ยวกับตัวคุณ ความเชี่ยวชาญ และสิ่งที่คุณสามารถช่วยเหลือได้..."
                  className="w-full input-field"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  ข้อมูลนี้จะถูกใช้โดย AI ในการจับคู่กับผู้ที่ต้องการคำปรึกษา
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประสบการณ์ (ปี) *
                  </label>
                  <input
                    type="number"
                    value={profile.yearsOfExperience}
                    onChange={(e) => handleProfileChange('yearsOfExperience', e.target.value)}
                    min="0"
                    placeholder="เช่น: 15"
                    className="w-full input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อัตราค่าบริการ (บาท/ชั่วโมง)
                  </label>
                  <input
                    type="number"
                    value={profile.hourlyRate}
                    onChange={(e) => handleProfileChange('hourlyRate', e.target.value)}
                    min="0"
                    placeholder="เช่น: 2500"
                    className="w-full input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สถานะ
                </label>
                <select
                  value={profile.availability}
                  onChange={(e) => handleProfileChange('availability', e.target.value)}
                  className="w-full input-field"
                >
                  <option value="AVAILABLE">พร้อมให้คำปรึกษา</option>
                  <option value="BUSY">ไม่ว่าง</option>
                  <option value="NOT_AVAILABLE">ไม่รับงานชั่วคราว</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปแบบการทำงาน
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferredMode.includes('ONLINE')}
                      onChange={(e) => {
                        const modes = e.target.checked
                          ? [...profile.preferredMode, 'ONLINE']
                          : profile.preferredMode.filter(m => m !== 'ONLINE');
                        handleProfileChange('preferredMode', modes);
                      }}
                      className="mr-2"
                    />
                    <span className="text-gray-700">ออนไลน์</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferredMode.includes('ONSITE')}
                      onChange={(e) => {
                        const modes = e.target.checked
                          ? [...profile.preferredMode, 'ONSITE']
                          : profile.preferredMode.filter(m => m !== 'ONSITE');
                        handleProfileChange('preferredMode', modes);
                      }}
                      className="mr-2"
                    />
                    <span className="text-gray-700">ที่สถานที่จริง</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profile.preferredMode.includes('HYBRID')}
                      onChange={(e) => {
                        const modes = e.target.checked
                          ? [...profile.preferredMode, 'HYBRID']
                          : profile.preferredMode.filter(m => m !== 'HYBRID');
                        handleProfileChange('preferredMode', modes);
                      }}
                      className="mr-2"
                    />
                    <span className="text-gray-700">ผสม (Hybrid)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={profile.linkedinUrl}
                  onChange={(e) => handleProfileChange('linkedinUrl', e.target.value)}
                  placeholder="https://www.linkedin.com/in/yourprofile"
                  className="w-full input-field"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ประเทศ
                  </label>
                  <input
                    type="text"
                    value={profile.country}
                    onChange={(e) => handleProfileChange('country', e.target.value)}
                    placeholder="เช่น: ไทย"
                    className="w-full input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เมือง
                  </label>
                  <input
                    type="text"
                    value={profile.city}
                    onChange={(e) => handleProfileChange('city', e.target.value)}
                    placeholder="เช่น: กรุงเทพฯ"
                    className="w-full input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={profile.timezone}
                    onChange={(e) => handleProfileChange('timezone', e.target.value)}
                    placeholder="เช่น: Asia/Bangkok"
                    className="w-full input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: การศึกษา */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">การศึกษา</h2>

              {/* Existing Education List */}
              {profile.education.length > 0 && (
                <div className="space-y-4">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.institution}</p>
                          {edu.fieldOfStudy && (
                            <p className="text-sm text-gray-600">สาขา: {edu.fieldOfStudy}</p>
                          )}
                          <p className="text-sm text-gray-500">
                            {edu.startYear} - {edu.endYear || 'ปัจจุบัน'}
                          </p>
                          {edu.description && (
                            <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Education Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">เพิ่มข้อมูลการศึกษา</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      สถาบัน *
                    </label>
                    <input
                      type="text"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                      placeholder="เช่น: จุฬาลงกรณ์มหาวิทยาลัย"
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ระดับการศึกษา *
                    </label>
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                      placeholder="เช่น: ปริญญาเอก"
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    สาขาวิชา
                  </label>
                  <input
                    type="text"
                    value={newEducation.fieldOfStudy}
                    onChange={(e) => setNewEducation({...newEducation, fieldOfStudy: e.target.value})}
                    placeholder="เช่น: วิทยาการคอมพิวเตอร์"
                    className="w-full input-field"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ปีที่เริ่ม
                    </label>
                    <input
                      type="number"
                      value={newEducation.startYear}
                      onChange={(e) => setNewEducation({...newEducation, startYear: e.target.value})}
                      placeholder="2010"
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ปีที่จบ
                    </label>
                    <input
                      type="number"
                      value={newEducation.endYear}
                      onChange={(e) => setNewEducation({...newEducation, endYear: e.target.value})}
                      placeholder="2014"
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    รายละเอียดเพิ่มเติม
                  </label>
                  <textarea
                    value={newEducation.description}
                    onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                    rows={2}
                    placeholder="GPA, โครงงาน, หรือรายละเอียดอื่นๆ"
                    className="w-full input-field"
                  />
                </div>

                <button
                  type="button"
                  onClick={addEducation}
                  className="w-full bg-primary-100 text-primary-700 py-2 rounded-lg hover:bg-primary-200 font-medium"
                >
                  + เพิ่มการศึกษา
                </button>
              </div>
            </div>
          )}

          {/* Step 3: ประสบการณ์การทำงาน */}
          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">ประสบการณ์การทำงาน</h2>

              {/* Existing Experience List */}
              {profile.experience.length > 0 && (
                <div className="space-y-4">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-gray-700">{exp.company}</p>
                          <p className="text-sm text-gray-500">
                            {exp.startDate} - {exp.isCurrent ? 'ปัจจุบัน' : exp.endDate}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">{exp.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Experience Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">เพิ่มประสบการณ์การทำงาน</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      บริษัท *
                    </label>
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                      placeholder="เช่น: LINE Thailand"
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ตำแหน่ง *
                    </label>
                    <input
                      type="text"
                      value={newExperience.position}
                      onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                      placeholder="เช่น: Chief Technology Officer"
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันที่เริ่ม
                    </label>
                    <input
                      type="month"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value})}
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันที่สิ้นสุด
                    </label>
                    <input
                      type="month"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value})}
                      disabled={newExperience.isCurrent}
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newExperience.isCurrent}
                    onChange={(e) => setNewExperience({...newExperience, isCurrent: e.target.checked})}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">ยังทำงานอยู่ที่นี่</label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    รายละเอียดงาน
                  </label>
                  <textarea
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                    rows={4}
                    placeholder="บรรยายหน้าที่ความรับผิดชอบ ผลงาน และความสำเร็จที่เกิดขึ้น..."
                    className="w-full input-field"
                  />
                </div>

                <button
                  type="button"
                  onClick={addExperience}
                  className="w-full bg-primary-100 text-primary-700 py-2 rounded-lg hover:bg-primary-200 font-medium"
                >
                  + เพิ่มประสบการณ์
                </button>
              </div>
            </div>
          )}

          {/* Step 4: ทักษะ */}
          {currentStep === 4 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">ทักษะและความเชี่ยวชาญ</h2>

              {/* Existing Skills */}
              {profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center bg-primary-100 text-primary-800 px-4 py-2 rounded-full"
                    >
                      <span className="font-medium">{skill.name}</span>
                      <span className="mx-2 text-primary-600">•</span>
                      <span className="text-sm">
                        {skill.proficiencyLevel === 'BEGINNER' && 'เริ่มต้น'}
                        {skill.proficiencyLevel === 'INTERMEDIATE' && 'ปานกลาง'}
                        {skill.proficiencyLevel === 'ADVANCED' && 'ขั้นสูง'}
                        {skill.proficiencyLevel === 'EXPERT' && 'ผู้เชี่ยวชาญ'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        className="ml-3 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Skill Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">เพิ่มทักษะใหม่</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อทักษะ *
                  </label>
                  <input
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                    placeholder="เช่น: Digital Marketing, Machine Learning, Cloud Computing"
                    className="w-full input-field"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      หมวดหมู่
                    </label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
                      className="w-full input-field"
                    >
                      <option value="TECHNICAL">เทคนิค</option>
                      <option value="BUSINESS">ธุรกิจ</option>
                      <option value="CREATIVE">สร้างสรรค์</option>
                      <option value="LEADERSHIP">ภาวะผู้นำ</option>
                      <option value="COMMUNICATION">การสื่อสาร</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ระดับความชำนาญ
                    </label>
                    <select
                      value={newSkill.proficiencyLevel}
                      onChange={(e) => setNewSkill({...newSkill, proficiencyLevel: e.target.value})}
                      className="w-full input-field"
                    >
                      <option value="BEGINNER">เริ่มต้น</option>
                      <option value="INTERMEDIATE">ปานกลาง</option>
                      <option value="ADVANCED">ขั้นสูง</option>
                      <option value="EXPERT">ผู้เชี่ยวชาญ</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addSkill}
                  className="w-full bg-primary-100 text-primary-700 py-2 rounded-lg hover:bg-primary-200 font-medium"
                >
                  + เพิ่มทักษะ
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 <strong>คำแนะนำ:</strong> เพิ่มทักษะให้ครบถ้วน เพราะ AI จะใช้ข้อมูลนี้ในการจับคู่คุณกับผู้ที่ต้องการความช่วยเหลือในด้านที่คุณเชี่ยวชาญ
                </p>
              </div>
            </div>
          )}

          {/* Step 5: ผลงาน/รางวัล */}
          {currentStep === 5 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">ผลงานและรางวัล</h2>

              {/* Existing Achievements */}
              {profile.achievements.length > 0 && (
                <div className="space-y-4">
                  {profile.achievements.map((achievement) => (
                    <div key={achievement.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                          {achievement.organization && (
                            <p className="text-gray-700">{achievement.organization}</p>
                          )}
                          {achievement.date && (
                            <p className="text-sm text-gray-500">{achievement.date}</p>
                          )}
                          {achievement.description && (
                            <p className="text-sm text-gray-600 mt-2">{achievement.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAchievement(achievement.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          ลบ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Achievement Form */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">เพิ่มผลงาน/รางวัล</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ชื่อผลงาน/รางวัล *
                  </label>
                  <input
                    type="text"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement({...newAchievement, title: e.target.value})}
                    placeholder="เช่น: รางวัล Innovation Award 2023"
                    className="w-full input-field"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      องค์กรผู้มอบ
                    </label>
                    <input
                      type="text"
                      value={newAchievement.organization}
                      onChange={(e) => setNewAchievement({...newAchievement, organization: e.target.value})}
                      placeholder="เช่น: สภาอุตสาหกรรมแห่งประเทศไทย"
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      วันที่
                    </label>
                    <input
                      type="month"
                      value={newAchievement.date}
                      onChange={(e) => setNewAchievement({...newAchievement, date: e.target.value})}
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    รายละเอียด
                  </label>
                  <textarea
                    value={newAchievement.description}
                    onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
                    rows={3}
                    placeholder="บรรยายผลงานหรือรางวัลนี้..."
                    className="w-full input-field"
                  />
                </div>

                <button
                  type="button"
                  onClick={addAchievement}
                  className="w-full bg-primary-100 text-primary-700 py-2 rounded-lg hover:bg-primary-200 font-medium"
                >
                  + เพิ่มผลงาน
                </button>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  ✅ <strong>เกือบเสร็จแล้ว!</strong> กรอกผลงานและรางวัลเพื่อเพิ่มความน่าเชื่อถือให้กับโปรไฟล์ของคุณ
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              ← ย้อนกลับ
            </button>

            <div className="flex gap-3">
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
                >
                  ถัดไป →
                </button>
              )}
              
              {currentStep === totalSteps && (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400"
                >
                  {loading ? 'กำลังบันทึก...' : '✓ บันทึกโปรไฟล์'}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Summary Preview (on last step) */}
        {currentStep === 5 && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">สรุปโปรไฟล์</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">ประสบการณ์:</p>
                <p className="font-semibold">{profile.yearsOfExperience} ปี</p>
              </div>
              <div>
                <p className="text-gray-600">การศึกษา:</p>
                <p className="font-semibold">{profile.education.length} รายการ</p>
              </div>
              <div>
                <p className="text-gray-600">ประสบการณ์การทำงาน:</p>
                <p className="font-semibold">{profile.experience.length} ตำแหน่ง</p>
              </div>
              <div>
                <p className="text-gray-600">ทักษะ:</p>
                <p className="font-semibold">{profile.skills.length} ทักษะ</p>
              </div>
              <div>
                <p className="text-gray-600">ผลงาน:</p>
                <p className="font-semibold">{profile.achievements.length} รายการ</p>
              </div>
              <div>
                <p className="text-gray-600">อัตราค่าบริการ:</p>
                <p className="font-semibold">
                  {profile.hourlyRate ? `฿${profile.hourlyRate}/ชม.` : 'ไม่ระบุ'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpertProfile;
