import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TalenterProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    organization: '',
    position: '',
    birthDate: '',
    workStatus: '',
    otherStatus: '',
    phoneNumber: '',
    profileImage: null,
    
    // Work Experience (Key Experiences)
    experiences: [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' }
    ],
    
    // Special Skills / Strengths
    skills: [
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' },
      { text: '' }
    ],
    
    // Areas of Interest (Checkboxes)
    interests: {
      talentDevelopment: false,
      retirementPotential: false,
      expertConsultant: false,
      partnerConsultant: false,
      communicationNetworking: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExperienceChange = (index, value) => {
    const newExperiences = [...formData.experiences];
    newExperiences[index].text = value;
    setFormData(prev => ({
      ...prev,
      experiences: newExperiences
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index].text = value;
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  // Add new experience field
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { text: '' }]
    }));
  };

  // Remove experience field
  const removeExperience = (index) => {
    if (formData.experiences.length > 1) {
      const newExperiences = formData.experiences.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        experiences: newExperiences
      }));
    } else {
      toast.warning('ต้องมีอย่างน้อย 1 ประสบการณ์');
    }
  };

  // Add new skill field
  const addSkill = () => {
    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { text: '' }]
    }));
  };

  // Remove skill field
  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      const newSkills = formData.skills.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        skills: newSkills
      }));
    } else {
      toast.warning('ต้องมีอย่างน้อย 1 ทักษะ');
    }
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [interest]: !prev.interests[interest]
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        toast.error('ขนาดไฟล์ต้องไม่เกิน 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName) {
      toast.error('กรุณากรอกชื่อ-นามสกุล');
      return;
    }
    
    if (!formData.organization) {
      toast.error('กรุณากรอกบริษัท/องค์กร/หน่วยงาน');
      return;
    }
    
    if (!formData.position) {
      toast.error('กรุณากรอกตำแหน่งงาน');
      return;
    }
    
    if (!formData.birthDate) {
      toast.error('กรุณากรอกวัน/เดือน/ปีเกิด');
      return;
    }
    
    if (!formData.phoneNumber) {
      toast.error('กรุณากรอกเบอร์โทรศัพท์');
      return;
    }

    try {
      // TODO: API call to save profile
      console.log('Form Data:', formData);
      toast.success('บันทึกโปรไฟล์สำเร็จ!');
      // navigate('/expert/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('ไม่สามารถบันทึกโปรไฟล์ได้');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-2xl p-6 mb-0">
          <h1 className="text-3xl font-bold text-center">Talenter</h1>
          <p className="text-center text-sm mt-2 opacity-90">โปรไฟล์ผู้เชี่ยวชาญ - Talent Thailand</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-b-2xl">
          <div className="p-6 sm:p-8">
            {/* Personal Information Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 pb-8 border-b-2 border-gray-200">
              {/* Left Column - Personal Info */}
              <div className="md:col-span-2 space-y-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h2 className="text-lg font-semibold text-primary-700 mb-4">ข้อมูลส่วนตัว</h2>
                  
                  {/* Name */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ชื่อ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="ชื่อ"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        นามสกุล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="นามสกุล"
                        required
                      />
                    </div>
                  </div>

                  {/* Organization & Position */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        บริษัท/องค์กร/หน่วยงาน <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="ระบุชื่อบริษัท/องค์กร/หน่วยงาน"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ตำแหน่งงาน <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="ระบุตำแหน่งงาน"
                        required
                      />
                    </div>
                  </div>

                  {/* Birth Date & Phone */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        วัน/เดือน/ปีเกิด <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        เบอร์โทรศัพท์มือถือ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="089-886-01668"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4,5}"
                        required
                      />
                    </div>
                  </div>

                  {/* Work Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      สถานภาพการทำงาน <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="workStatus"
                          value="ปฏิบัติงานอยู่"
                          checked={formData.workStatus === 'ปฏิบัติงานอยู่'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-gray-700">ปฏิบัติงานอยู่</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="workStatus"
                          value="เกษียณ"
                          checked={formData.workStatus === 'เกษียณ'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-gray-700">เกษียณ</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="workStatus"
                          value="กำลังหางาน"
                          checked={formData.workStatus === 'กำลังหางาน'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-gray-700">กำลังหางาน</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="workStatus"
                          value="อื่นๆ"
                          checked={formData.workStatus === 'อื่นๆ'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span className="text-gray-700">อื่นๆ โปรดระบุ</span>
                      </label>
                      {formData.workStatus === 'อื่นๆ' && (
                        <input
                          type="text"
                          name="otherStatus"
                          value={formData.otherStatus}
                          onChange={handleChange}
                          className="input-field ml-6 mt-2"
                          placeholder="โปรดระบุ..."
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Photo */}
              <div className="flex flex-col items-center">
                <div className="bg-accent-50 p-4 rounded-lg w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                    Talent T:
                  </label>
                  <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 overflow-hidden">
                    {formData.profileImage ? (
                      <img
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-6xl text-gray-400">👤</span>
                        <p className="text-xs text-gray-500 mt-2">ไม่มีรูปภาพ</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profileImage"
                  />
                  <label
                    htmlFor="profileImage"
                    className="btn-outline w-full text-center cursor-pointer block py-2"
                  >
                    📷 อัพโหลดรูปภาพ
                  </label>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    ขนาดไฟล์ไม่เกิน 5MB
                  </p>
                </div>

                {/* Areas of Interest - Compact */}
                <div className="bg-green-50 p-4 rounded-lg w-full mt-4">
                  <h3 className="text-sm font-semibold text-green-700 mb-3 text-center">
                    การถึงมีส่นใจ
                  </h3>
                  <div className="space-y-2 text-xs">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.interests.talentDevelopment}
                        onChange={() => handleInterestChange('talentDevelopment')}
                        className="mt-0.5 mr-2"
                      />
                      <span>1. กลุ่มพัฒนากำลังคน</span>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.interests.retirementPotential}
                        onChange={() => handleInterestChange('retirementPotential')}
                        className="mt-0.5 mr-2"
                      />
                      <span>2. กลุ่มผู้ใช้ศักยภาพ วัยเกษียณ - วัยทำงาน</span>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.interests.expertConsultant}
                        onChange={() => handleInterestChange('expertConsultant')}
                        className="mt-0.5 mr-2"
                      />
                      <span>3. กลุ่มพัฒนาที่ปรึกษา</span>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.interests.partnerConsultant}
                        onChange={() => handleInterestChange('partnerConsultant')}
                        className="mt-0.5 mr-2"
                      />
                      <span>4. กลุ่มสร้างเครือข่ายความร่วมมือภาคส่วนต่าง ๆ</span>
                    </label>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.interests.communicationNetworking}
                        onChange={() => handleInterestChange('communicationNetworking')}
                        className="mt-0.5 mr-2"
                      />
                      <span>5. กลุ่มทางสื่อสาร และสร้างเครือข่ายบริดจ์</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience & Skills Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Left - Work Experience */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-700 text-center mb-4">
                  ประสบการณ์ทำงานสำคัญ
                </h2>
                <div className="space-y-3">
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          ประสบการณ์ที่ {index + 1}
                        </label>
                        {formData.experiences.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExperience(index)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                            title="ลบประสบการณ์นี้"
                          >
                            🗑️ ลบ
                          </button>
                        )}
                      </div>
                      <textarea
                        value={exp.text}
                        onChange={(e) => handleExperienceChange(index, e.target.value)}
                        className="input-field resize-none"
                        rows="2"
                        placeholder={`ระบุประสบการณ์ทำงานที่สำคัญ...`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={addExperience}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
                    title="เพิ่มประสบการณ์"
                  >
                    <span>➕</span>
                    <span>เพิ่ม</span>
                  </button>
                  <p className="text-xs text-blue-600 mt-2">
                    💡 คลิก "➕ เพิ่ม" เพื่อเพิ่มประสบการณ์เพิ่มเติม ({formData.experiences.length} รายการ)
                  </p>
                </div>
              </div>

              {/* Right - Special Skills */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-lg font-semibold text-purple-700 text-center mb-4">
                  จุดแข็งที่สามารถถ่ายทอดให้ผู้อื่นได้ / ทักษะพิเศษ
                </h2>
                <div className="space-y-3">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-sm font-medium text-gray-700">
                          ทักษะที่ {index + 1}
                        </label>
                        {formData.skills.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="text-red-500 hover:text-red-700 text-xs font-medium transition-colors"
                            title="ลบทักษะนี้"
                          >
                            🗑️ ลบ
                          </button>
                        )}
                      </div>
                      <textarea
                        value={skill.text}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        className="input-field resize-none"
                        rows="2"
                        placeholder={`ระบุทักษะพิเศษหรือจุดแข็ง...`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={addSkill}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
                    title="เพิ่มทักษะ"
                  >
                    <span>➕</span>
                    <span>เพิ่ม</span>
                  </button>
                  <p className="text-xs text-purple-600 mt-2">
                    💡 คลิก "➕ เพิ่ม" เพื่อเพิ่มทักษะเพิ่มเติม ({formData.skills.length} รายการ)
                  </p>
                </div>
              </div>
            </div>

            {/* Confirmation Note */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex items-start">
                <div className="text-2xl mr-3">🌐</div>
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-1">ข้าพเจ้าขอยืนยันให้ถือเอกสารนี้เพื่อการพัฒนากำลังพลผลผลระดับประเทศไทย</p>
                  <p className="text-xs text-gray-600">
                    เกี่ยวข้องความจริงทุกประการ ใช้ เป็นเอกสารยืนยันส่วนตัวในกลุ่มเชิงต้อนสำหรับข้าพเจ้าตามที่กำลังพลและเอกสายมีความถูกต้อง 
                    ที่ถือเอกสารและไม่รับผิดชอบหน้อนส่อย้อนดียน และไม่จขการดอดขดผู้อื่น ต่อไป
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-secondary px-8 py-3"
              >
                ← ย้อนกลับ
              </button>
              <button
                type="submit"
                className="btn-primary px-8 py-3"
              >
                💾 บันทึกโปรไฟล์
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white p-4 rounded-b-2xl">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">⭐</div>
                <div className="text-sm">
                  <p className="font-semibold">TALENT THAILAND</p>
                  <p className="text-xs opacity-90">สร้างคุณค่าให้กับกำลังพลของประเทศไทย</p>
                </div>
              </div>
              <div className="text-right text-xs opacity-90">
                <p>ลงชื่อ - นามสกุล: ________________</p>
                <p>วันที่: {new Date().toLocaleDateString('th-TH')}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TalenterProfile;
