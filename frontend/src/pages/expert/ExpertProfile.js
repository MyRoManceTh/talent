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
    city: '',
    preferredMode: [],
    languages: [],
    
    // Talenter Fields
    dateOfBirth: '',
    currentCompany: '',
    currentPosition: '',
    workStatus: 'WORKING',
    contactPhone: '',
    missionInterests: [],
    
    // การศึกษา
    education: [],
    
    // ประสบการณ์การทำงาน
    experience: [],
    
    // ทักษะ
    skills: [],
    
    // ผลงาน/รางวัล
    achievements: []
  });

  // Form visibility states
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);

  // Mission Interest "Other" state
  const [otherMissionInterest, setOtherMissionInterest] = useState('');
  const [showOtherMissionInput, setShowOtherMissionInput] = useState(false);

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
    keyResponsibilities: '',
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
        
        // Check if there are any "other" mission interests
        const missionInterests = response.data.missionInterests || [];
        const otherInterest = missionInterests.find(i => i.startsWith('อื่นๆ:'));
        if (otherInterest) {
          setShowOtherMissionInput(true);
          setOtherMissionInterest(otherInterest.replace('อื่นๆ: ', ''));
        }
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
    console.log('🎓 Adding education:', newEducation);
    
    if (!newEducation.institution || !newEducation.degree) {
      toast.error('กรุณากรอกสถาบันและระดับการศึกษา');
      return;
    }
    
    const educationToAdd = { 
      ...newEducation, 
      id: Date.now() 
    };
    
    console.log('✅ Education item to add:', educationToAdd);
    
    setProfile(prev => {
      const updated = {
        ...prev,
        education: [...prev.education, educationToAdd]
      };
      console.log('📚 Updated education array:', updated.education);
      return updated;
    });
    
    setNewEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startYear: '',
      endYear: '',
      description: ''
    });
    
    setShowEducationForm(false);
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
    setShowExperienceForm(false);
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
    setShowSkillForm(false);
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
    setShowAchievementForm(false);
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
        city: profile.city || null,
        preferredMode: profile.preferredMode.length > 0 ? profile.preferredMode : [],
        languages: profile.languages.length > 0 ? profile.languages : [],
        
        // Include education, experience, skills, and achievements
        education: profile.education || [],
        experience: profile.experience || [],
        skills: profile.skills || [],
        achievements: profile.achievements || []
      };

      console.log('Sending complete profile data:', profileData);
      console.log('Education items:', profile.education.length);
      console.log('Experience items:', profile.experience.length);
      console.log('Skills items:', profile.skills.length);
      console.log('Achievements items:', profile.achievements.length);
      
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

              {/* Talenter Additional Fields */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลเพิ่มเติม (Talenter)</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      วันเกิด
                    </label>
                    <input
                      type="date"
                      value={profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : ''}
                      onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เบอร์โทรศัพท์ติดต่อ
                    </label>
                    <input
                      type="tel"
                      value={profile.contactPhone}
                      onChange={(e) => handleProfileChange('contactPhone', e.target.value)}
                      placeholder="เช่น: 089-123-4567"
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      บริษัท/องค์กร/หน่วยงานปัจจุบัน
                    </label>
                    <input
                      type="text"
                      value={profile.currentCompany}
                      onChange={(e) => handleProfileChange('currentCompany', e.target.value)}
                      placeholder="เช่น: บริษัท ABC จำกัด"
                      className="w-full input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ตำแหน่งงานปัจจุบัน
                    </label>
                    <input
                      type="text"
                      value={profile.currentPosition}
                      onChange={(e) => handleProfileChange('currentPosition', e.target.value)}
                      placeholder="เช่น: Chief Technology Officer"
                      className="w-full input-field"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    สถานะภาพการทำงาน
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workStatus"
                        value="WORKING"
                        checked={profile.workStatus === 'WORKING'}
                        onChange={(e) => handleProfileChange('workStatus', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">ปฏิบัติงานอยู่</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workStatus"
                        value="RETIRED"
                        checked={profile.workStatus === 'RETIRED'}
                        onChange={(e) => handleProfileChange('workStatus', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">เกษียณ</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workStatus"
                        value="LOOKING"
                        checked={profile.workStatus === 'LOOKING'}
                        onChange={(e) => handleProfileChange('workStatus', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">กำลังหางาน</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workStatus"
                        value="FREELANCE"
                        checked={profile.workStatus === 'FREELANCE'}
                        onChange={(e) => handleProfileChange('workStatus', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">ฟรีแลนซ์</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workStatus"
                        value="OTHER"
                        checked={profile.workStatus === 'OTHER'}
                        onChange={(e) => handleProfileChange('workStatus', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">อื่นๆ</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    ภารกิจที่สนใจ
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.missionInterests.includes('กลุ่มพัฒนากำลังคน')}
                        onChange={(e) => {
                          const interests = e.target.checked
                            ? [...profile.missionInterests, 'กลุ่มพัฒนากำลังคน']
                            : profile.missionInterests.filter(i => i !== 'กลุ่มพัฒนากำลังคน');
                          handleProfileChange('missionInterests', interests);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">กลุ่มพัฒนากำลังคน</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.missionInterests.includes('กลุ่มใช้ศักยภาพ วัยเกษียณ – วัยทำงาน')}
                        onChange={(e) => {
                          const interests = e.target.checked
                            ? [...profile.missionInterests, 'กลุ่มใช้ศักยภาพ วัยเกษียณ – วัยทำงาน']
                            : profile.missionInterests.filter(i => i !== 'กลุ่มใช้ศักยภาพ วัยเกษียณ – วัยทำงาน');
                          handleProfileChange('missionInterests', interests);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">กลุ่มใช้ศักยภาพ วัยเกษียณ – วัยทำงาน</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.missionInterests.includes('กลุ่มพัฒนาเยาวชน')}
                        onChange={(e) => {
                          const interests = e.target.checked
                            ? [...profile.missionInterests, 'กลุ่มพัฒนาเยาวชน']
                            : profile.missionInterests.filter(i => i !== 'กลุ่มพัฒนาเยาวชน');
                          handleProfileChange('missionInterests', interests);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">กลุ่มพัฒนาเยาวชน</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.missionInterests.includes('กลุ่มสร้างเครือข่ายความร่วมมือ ภาคส่วนต่าง ๆ')}
                        onChange={(e) => {
                          const interests = e.target.checked
                            ? [...profile.missionInterests, 'กลุ่มสร้างเครือข่ายความร่วมมือ ภาคส่วนต่าง ๆ']
                            : profile.missionInterests.filter(i => i !== 'กลุ่มสร้างเครือข่ายความร่วมมือ ภาคส่วนต่าง ๆ');
                          handleProfileChange('missionInterests', interests);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">กลุ่มสร้างเครือข่ายความร่วมมือ ภาคส่วนต่าง ๆ</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profile.missionInterests.includes('กลุ่มการสื่อสาร และสร้างแรงบันดาลใจ')}
                        onChange={(e) => {
                          const interests = e.target.checked
                            ? [...profile.missionInterests, 'กลุ่มการสื่อสาร และสร้างแรงบันดาลใจ']
                            : profile.missionInterests.filter(i => i !== 'กลุ่มการสื่อสาร และสร้างแรงบันดาลใจ');
                          handleProfileChange('missionInterests', interests);
                        }}
                        className="mr-2"
                      />
                      <span className="text-gray-700">กลุ่มการสื่อสาร และสร้างแรงบันดาลใจ</span>
                    </label>
                    
                    {/* อื่นๆ - Custom Input */}
                    <div className="border-t pt-3 mt-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={showOtherMissionInput}
                          onChange={(e) => {
                            setShowOtherMissionInput(e.target.checked);
                            if (!e.target.checked) {
                              // Remove all "other" interests when unchecking
                              const predefinedInterests = [
                                'กลุ่มพัฒนากำลังคน',
                                'กลุ่มใช้ศักยภาพ วัยเกษียณ – วัยทำงาน',
                                'กลุ่มพัฒนาเยาวชน',
                                'กลุ่มสร้างเครือข่ายความร่วมมือ ภาคส่วนต่าง ๆ',
                                'กลุ่มการสื่อสาร และสร้างแรงบันดาลใจ'
                              ];
                              const filteredInterests = profile.missionInterests.filter(i => predefinedInterests.includes(i));
                              handleProfileChange('missionInterests', filteredInterests);
                              setOtherMissionInterest('');
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-gray-700 font-medium">อื่นๆ (โปรดระบุ)</span>
                      </label>
                      
                      {showOtherMissionInput && (
                        <div className="mt-3 ml-6">
                          <input
                            type="text"
                            value={otherMissionInterest}
                            onChange={(e) => setOtherMissionInterest(e.target.value)}
                            onBlur={() => {
                              if (otherMissionInterest.trim()) {
                                const customInterest = `อื่นๆ: ${otherMissionInterest.trim()}`;
                                // Remove old "other" interests first
                                const predefinedInterests = [
                                  'กลุ่มพัฒนากำลังคน',
                                  'กลุ่มใช้ศักยภาพ วัยเกษียณ – วัยทำงาน',
                                  'กลุ่มพัฒนาเยาวชน',
                                  'กลุ่มสร้างเครือข่ายความร่วมมือ ภาคส่วนต่าง ๆ',
                                  'กลุ่มการสื่อสาร และสร้างแรงบันดาลใจ'
                                ];
                                const filteredInterests = profile.missionInterests.filter(i => 
                                  predefinedInterests.includes(i) || !i.startsWith('อื่นๆ:')
                                );
                                // Add new custom interest
                                handleProfileChange('missionInterests', [...filteredInterests, customInterest]);
                              }
                            }}
                            placeholder="ระบุภารกิจที่สนใจอื่นๆ..."
                            className="w-full input-field"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            กรอกข้อความแล้วคลิกที่นอกช่อง หรือกด Enter เพื่อบันทึก
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  จังหวัด
                </label>
                <select
                  value={profile.city}
                  onChange={(e) => handleProfileChange('city', e.target.value)}
                  className="w-full input-field"
                >
                  <option value="">เลือกจังหวัด</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="นนทบุรี">นนทบุรี</option>
                  <option value="ปทุมธานี">ปทุมธานี</option>
                  <option value="สมุทรปราการ">สมุทรปราการ</option>
                  <option value="สมุทรสาคร">สมุทรสาคร</option>
                  <option value="นครปฐม">นครปฐม</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                  <option value="เชียงราย">เชียงราย</option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="นครราชสีมา">นครราชสีมา</option>
                  <option value="อุบลราชธานี">อุบลราชธานี</option>
                  <option value="ภูเก็ต">ภูเก็ต</option>
                  <option value="สุราษฎร์ธานี">สุราษฎร์ธานี</option>
                  <option value="สงขลา">สงขลา</option>
                  <option value="ชลบุรี">ชลบุรี</option>
                  <option value="ระยอง">ระยอง</option>
                  <option value="กระบี่">กระบี่</option>
                  <option value="กาญจนบุรี">กาญจนบุรี</option>
                  <option value="กาฬสินธุ์">กาฬสินธุ์</option>
                  <option value="กำแพงเพชร">กำแพงเพชร</option>
                  <option value="ขอนแก่น">ขอนแก่น</option>
                  <option value="จันทบุรี">จันทบุรี</option>
                  <option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>
                  <option value="ชัยนาท">ชัยนาท</option>
                  <option value="ชัยภูมิ">ชัยภูมิ</option>
                  <option value="ชุมพร">ชุมพร</option>
                  <option value="ตรัง">ตรัง</option>
                  <option value="ตราด">ตราด</option>
                  <option value="ตาก">ตาก</option>
                  <option value="นครนายก">นครนายก</option>
                  <option value="นครพนม">นครพนม</option>
                  <option value="นครสวรรค์">นครสวรรค์</option>
                  <option value="นราธิวาส">นราธิวาส</option>
                  <option value="น่าน">น่าน</option>
                  <option value="บึงกาฬ">บึงกาฬ</option>
                  <option value="บุรีรัมย์">บุรีรัมย์</option>
                  <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</option>
                  <option value="ปราจีนบุรี">ปราจีนบุรี</option>
                  <option value="ปัตตานี">ปัตตานี</option>
                  <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา</option>
                  <option value="พะเยา">พะเยา</option>
                  <option value="พังงา">พังงา</option>
                  <option value="พัทลุง">พัทลุง</option>
                  <option value="พิจิตร">พิจิตร</option>
                  <option value="พิษณุโลก">พิษณุโลก</option>
                  <option value="เพชรบุรี">เพชรบุรี</option>
                  <option value="เพชรบูรณ์">เพชรบูรณ์</option>
                  <option value="แพร่">แพร่</option>
                  <option value="ยะลา">ยะลา</option>
                  <option value="ยโสธร">ยโสธร</option>
                  <option value="ร้อยเอ็ด">ร้อยเอ็ด</option>
                  <option value="ระนอง">ระนอง</option>
                  <option value="ราชบุรี">ราชบุรี</option>
                  <option value="ลพบุรี">ลพบุรี</option>
                  <option value="ลำปาง">ลำปาง</option>
                  <option value="ลำพูน">ลำพูน</option>
                  <option value="เลย">เลย</option>
                  <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                  <option value="สกลนคร">สกลนคร</option>
                  <option value="สมุทรสงคราม">สมุทรสงคราม</option>
                  <option value="สระแก้ว">สระแก้ว</option>
                  <option value="สระบุรี">สระบุรี</option>
                  <option value="สิงห์บุรี">สิงห์บุรี</option>
                  <option value="สุโขทัย">สุโขทัย</option>
                  <option value="สุพรรณบุรี">สุพรรณบุรี</option>
                  <option value="หนองคาย">หนองคาย</option>
                  <option value="หนองบัวลำภู">หนองบัวลำภู</option>
                  <option value="อำนาจเจริญ">อำนาจเจริญ</option>
                  <option value="อุดรธานี">อุดรธานี</option>
                  <option value="อุตรดิตถ์">อุตรดิตถ์</option>
                  <option value="อุทัยธานี">อุทัยธานี</option>
                  <option value="อ่างทอง">อ่างทอง</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: การศึกษา */}
          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">การศึกษา</h2>
              <p className="text-gray-600">เพิ่มประวัติการศึกษาของคุณ</p>

              {/* Existing Education List */}
              {profile.education.length > 0 && (
                <div className="space-y-3 mb-4">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="border-l-4 border-primary-500 bg-gray-50 rounded-r-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{edu.degree}</h3>
                          <p className="text-gray-700 font-medium">{edu.institution}</p>
                          {edu.fieldOfStudy && (
                            <p className="text-sm text-gray-600 mt-1">
                              <span className="font-medium">สาขา:</span> {edu.fieldOfStudy}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="inline-flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {edu.startYear} - {edu.endYear || 'ปัจจุบัน'}
                            </span>
                          </p>
                          {edu.description && (
                            <p className="text-sm text-gray-600 mt-2 pl-3 border-l-2 border-gray-300">{edu.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEducation(edu.id)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Education Form - Shows only when button clicked */}
              {showEducationForm && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 text-lg">เพิ่มข้อมูลการศึกษา</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEducationForm(false);
                        setNewEducation({
                          institution: '',
                          degree: '',
                          fieldOfStudy: '',
                          startYear: '',
                          endYear: '',
                          description: ''
                        });
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        สถาบัน <span className="text-red-500">*</span>
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
                        ระดับการศึกษา <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                        placeholder="เช่น: ปริญญาตรี, ปริญญาโท, ปริญญาเอก"
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
                        onChange={(e) => setNewEducation({...newEducation, startYear: e.target.value ? parseInt(e.target.value) : ''})}
                        placeholder="2010"
                        min="1950"
                        max="2030"
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
                        onChange={(e) => setNewEducation({...newEducation, endYear: e.target.value ? parseInt(e.target.value) : ''})}
                        placeholder="2014 (ว่างไว้ถ้ายังศึกษาอยู่)"
                        min="1950"
                        max="2030"
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
                      rows={3}
                      placeholder="GPA, เกียรตินิยม, โครงงาน, หรือรายละเอียดอื่นๆ"
                      className="w-full input-field"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addEducation}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                    >
                      ✓ บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEducationForm(false);
                        setNewEducation({
                          institution: '',
                          degree: '',
                          fieldOfStudy: '',
                          startYear: '',
                          endYear: '',
                          description: ''
                        });
                      }}
                      className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}

              {/* Add Button - Always at the bottom */}
              {!showEducationForm && (
                <button
                  type="button"
                  onClick={() => setShowEducationForm(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มการศึกษา
                </button>
              )}
            </div>
          )}

          {/* Step 3: ประสบการณ์การทำงาน */}
          {currentStep === 3 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">ประสบการณ์การทำงาน</h2>
              <p className="text-gray-600">เพิ่มประวัติการทำงานและประสบการณ์ของคุณ</p>

              {/* Existing Experience List */}
              {profile.experience.length > 0 && (
                <div className="space-y-3 mb-4">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="border-l-4 border-green-500 bg-gray-50 rounded-r-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                          <p className="text-gray-700 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="inline-flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {exp.startDate} - {exp.isCurrent ? 'ปัจจุบัน' : exp.endDate}
                            </span>
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mt-2 pl-3 border-l-2 border-gray-300 whitespace-pre-line">{exp.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Experience Form */}
              {showExperienceForm && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 text-lg">เพิ่มประสบการณ์การทำงาน</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowExperienceForm(false);
                        setNewExperience({
                          company: '',
                          position: '',
                          startDate: '',
                          endDate: '',
                          description: '',
                          isCurrent: false
                        });
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        บริษัท <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                        placeholder="เช่น: LINE Thailand, Google"
                        className="w-full input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ตำแหน่ง <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                        placeholder="เช่น: CTO, Senior Developer"
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
                        className="w-full input-field disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newExperience.isCurrent}
                      onChange={(e) => setNewExperience({...newExperience, isCurrent: e.target.checked})}
                      className="mr-2 w-4 h-4 text-primary-600 rounded"
                    />
                    <label className="text-sm text-gray-700 font-medium">ยังทำงานอยู่ที่นี่</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      จุดเน้นที่สามารถถ่ายทอด / ทักษะที่เชี่ยวชาญ
                    </label>
                    <textarea
                      value={newExperience.keyResponsibilities}
                      onChange={(e) => setNewExperience({...newExperience, keyResponsibilities: e.target.value})}
                      rows={3}
                      placeholder="เช่น: Strategic Planning, Digital Transformation, Team Leadership..."
                      className="w-full input-field"
                    />
                    <p className="text-xs text-gray-500 mt-1">จุดเน้นทักษะที่สามารถถ่ายทอดให้ผู้รุ่นต่อ (จากแบบฟอร์ม Talenter)</p>
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

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addExperience}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                    >
                      ✓ บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowExperienceForm(false);
                        setNewExperience({
                          company: '',
                          position: '',
                          startDate: '',
                          endDate: '',
                          description: '',
                          isCurrent: false
                        });
                      }}
                      className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}

              {/* Add Button - Always at the bottom */}
              {!showExperienceForm && (
                <button
                  type="button"
                  onClick={() => setShowExperienceForm(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มประสบการณ์การทำงาน
                </button>
              )}
            </div>
          )}

          {/* Step 4: ทักษะ */}
          {currentStep === 4 && (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">ทักษะและความเชี่ยวชาญ</h2>
              <p className="text-gray-600">เพิ่มทักษะที่คุณมีความเชี่ยวชาญ</p>

              {/* Existing Skills */}
              {profile.skills.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-4">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      <span className="font-semibold mr-2">{skill.name}</span>
                      <span className="text-white/80 text-sm">
                        {skill.proficiencyLevel === 'BEGINNER' && '🌱 เริ่มต้น'}
                        {skill.proficiencyLevel === 'INTERMEDIATE' && '⭐ ปานกลาง'}
                        {skill.proficiencyLevel === 'ADVANCED' && '🔥 ขั้นสูง'}
                        {skill.proficiencyLevel === 'EXPERT' && '👑 ผู้เชี่ยวชาญ'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill.id)}
                        className="ml-3 text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                        title="ลบ"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Skill Form */}
              {showSkillForm && (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 text-lg">เพิ่มทักษะใหม่</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSkillForm(false);
                        setNewSkill({
                          name: '',
                          category: 'TECHNICAL',
                          proficiencyLevel: 'INTERMEDIATE'
                        });
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อทักษะ <span className="text-red-500">*</span>
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
                        <option value="TECHNICAL">🔧 เทคนิค</option>
                        <option value="SOFT_SKILL">👥 ทักษะด้านบุคคล</option>
                        <option value="DOMAIN_KNOWLEDGE">📚 ความรู้เฉพาะด้าน</option>
                        <option value="TOOL">🛠️ เครื่องมือ</option>
                        <option value="LANGUAGE">🌐 ภาษา</option>
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
                        <option value="BEGINNER">🌱 เริ่มต้น</option>
                        <option value="INTERMEDIATE">⭐ ปานกลาง</option>
                        <option value="ADVANCED">🔥 ขั้นสูง</option>
                        <option value="EXPERT">👑 ผู้เชี่ยวชาญ</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addSkill}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                    >
                      ✓ บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSkillForm(false);
                        setNewSkill({
                          name: '',
                          category: 'TECHNICAL',
                          proficiencyLevel: 'INTERMEDIATE'
                        });
                      }}
                      className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}

              {/* Add Button - Always at the bottom */}
              {!showSkillForm && (
                <button
                  type="button"
                  onClick={() => setShowSkillForm(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มทักษะ
                </button>
              )}

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
              <p className="text-gray-600">เพิ่มผลงาน รางวัล หรือความสำเร็จที่โดดเด่นของคุณ</p>

              {/* Existing Achievements */}
              {profile.achievements.length > 0 && (
                <div className="space-y-3 mb-4">
                  {profile.achievements.map((achievement) => (
                    <div key={achievement.id} className="border-l-4 border-yellow-500 bg-gray-50 rounded-r-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                            <span className="text-2xl">🏆</span>
                            {achievement.title}
                          </h3>
                          {achievement.organization && (
                            <p className="text-gray-700 font-medium mt-1">{achievement.organization}</p>
                          )}
                          {achievement.date && (
                            <p className="text-sm text-gray-500 mt-1">
                              <span className="inline-flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {achievement.date}
                              </span>
                            </p>
                          )}
                          {achievement.description && (
                            <p className="text-sm text-gray-600 mt-2 pl-3 border-l-2 border-gray-300">{achievement.description}</p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAchievement(achievement.id)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="ลบ"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Achievement Form */}
              {showAchievementForm && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 text-lg">เพิ่มผลงาน/รางวัล</h3>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAchievementForm(false);
                        setNewAchievement({
                          title: '',
                          description: '',
                          date: '',
                          organization: ''
                        });
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อผลงาน/รางวัล <span className="text-red-500">*</span>
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

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addAchievement}
                      className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors"
                    >
                      ✓ บันทึก
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAchievementForm(false);
                        setNewAchievement({
                          title: '',
                          description: '',
                          date: '',
                          organization: ''
                        });
                      }}
                      className="px-6 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              )}

              {/* Add Button - Always at the bottom */}
              {!showAchievementForm && (
                <button
                  type="button"
                  onClick={() => setShowAchievementForm(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  เพิ่มผลงาน/รางวัล
                </button>
              )}

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
