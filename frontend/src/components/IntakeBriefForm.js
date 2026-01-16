import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IntakeBriefForm = ({ onSubmit, onCancel, initialData = null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    // Project Type & Topic
    projectType: initialData?.projectType || '',
    topic: initialData?.topic || '',
    detailedDescription: initialData?.detailedDescription || '',
    
    // Goals & Expectations
    goals: initialData?.goals || '',
    expectedOutcomes: initialData?.expectedOutcomes || '',
    
    // Format & Location
    format: initialData?.format || [],
    location: initialData?.location || '',
    specificLocation: initialData?.specificLocation || '',
    
    // Timeframe
    timeframe: initialData?.timeframe || '',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    estimatedHours: initialData?.estimatedHours || '',
    urgency: initialData?.urgency || 'MEDIUM',
    
    // Budget
    budgetMin: initialData?.budgetMin || '',
    budgetMax: initialData?.budgetMax || '',
    budgetCurrency: initialData?.budgetCurrency || 'THB',
    budgetFlexible: initialData?.budgetFlexible || false,
    
    // Languages
    languages: initialData?.languages || ['Thai'],
    
    // Additional Requirements
    industryContext: initialData?.industryContext || '',
    targetAudience: initialData?.targetAudience || '',
    specificRequirements: initialData?.specificRequirements || '',
    deliverables: initialData?.deliverables || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelectChange = (name, value) => {
    setFormData(prev => {
      const currentValues = prev[name] || [];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [name]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [name]: [...currentValues, value]
        };
      }
    });
  };

  const handleLanguageToggle = (language) => {
    handleMultiSelectChange('languages', language);
  };

  const handleFormatToggle = (format) => {
    handleMultiSelectChange('format', format);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validation
      if (!formData.projectType || !formData.topic || !formData.goals || !formData.timeframe || !formData.urgency) {
        throw new Error('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      }

      if (formData.languages.length === 0) {
        throw new Error('กรุณาเลือกภาษาอย่างน้อย 1 ภาษา');
      }

      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior: save to backend
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/briefs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to create brief');
        }

        // Navigate to recommendations page
        navigate(`/briefs/${data.data.id}/recommendations`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Project Type & Topic Section */}
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ประเภทงานและหัวข้อ</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ประเภทงาน <span className="text-red-500">*</span>
            </label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">-- เลือกประเภทงาน --</option>
              <option value="STRATEGY_CONSULTING">ที่ปรึกษากลยุทธ์</option>
              <option value="BUSINESS_DEVELOPMENT">พัฒนาธุรกิจ</option>
              <option value="MARKETING_BRANDING">การตลาดและแบรนด์</option>
              <option value="TECHNOLOGY_IT">เทคโนโลยีและ IT</option>
              <option value="FINANCIAL_ADVISORY">ที่ปรึกษาทางการเงิน</option>
              <option value="HR_TALENT">HR และการจัดการบุคคล</option>
              <option value="OPERATIONS_PROCESS">ปรับปรุงกระบวนการ</option>
              <option value="LEGAL_COMPLIANCE">กฎหมายและการปฏิบัติตามข้อกำหนด</option>
              <option value="TRAINING_WORKSHOP">อบรมและเวิร์กช็อป</option>
              <option value="MENTORING_COACHING">การโค้ชและให้คำปรึกษา</option>
              <option value="RESEARCH_ANALYSIS">วิจัยและวิเคราะห์</option>
              <option value="OTHER">อื่นๆ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              หัวข้อ/ชื่อโครงการ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              placeholder="เช่น พัฒนากลยุทธ์การตลาดดิจิทัล"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              รายละเอียดเพิ่มเติม
            </label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleChange}
              rows="4"
              placeholder="อธิบายรายละเอียดเพิ่มเติมเกี่ยวกับโครงการ"
              className="input-field"
            />
          </div>
        </div>
      </section>

      {/* Goals & Expectations Section */}
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">เป้าหมายและความคาดหวัง</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              เป้าหมาย <span className="text-red-500">*</span>
            </label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              required
              rows="3"
              placeholder="เป้าหมายหลักของโครงการนี้คืออะไร?"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ผลลัพธ์ที่คาดหวัง
            </label>
            <textarea
              name="expectedOutcomes"
              value={formData.expectedOutcomes}
              onChange={handleChange}
              rows="3"
              placeholder="คุณต้องการผลลัพธ์แบบใด? (เช่น รายงาน, แผนงาน, ระบบ)"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deliverables
            </label>
            <textarea
              name="deliverables"
              value={formData.deliverables}
              onChange={handleChange}
              rows="3"
              placeholder="สิ่งส่งมอบที่ต้องการ (เช่น Presentation, Report, Dashboard)"
              className="input-field"
            />
          </div>
        </div>
      </section>

      {/* Format & Location Section */}
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">รูปแบบและสถานที่</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              รูปแบบการทำงาน
            </label>
            <div className="flex flex-wrap gap-3">
              {['ONLINE', 'ONSITE', 'HYBRID'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleFormatToggle(mode)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    formData.format.includes(mode)
                      ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {mode === 'ONLINE' && '🌐 ออนไลน์'}
                  {mode === 'ONSITE' && '🏢 ออนไซต์'}
                  {mode === 'HYBRID' && '🔄 ผสมผสาน'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สถานที่ (จังหวัด/เมือง)
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="เช่น กรุงเทพฯ, เชียงใหม่"
              className="input-field"
            />
          </div>

          {formData.format.includes('ONSITE') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถานที่เฉพาะ (สำหรับออนไซต์)
              </label>
              <input
                type="text"
                name="specificLocation"
                value={formData.specificLocation}
                onChange={handleChange}
                placeholder="เช่น ที่ทำการของบริษัท หรือ โรงแรม XYZ"
                className="input-field"
              />
            </div>
          )}
        </div>
      </section>

      {/* Timeframe Section */}
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ช่วงเวลาและความเร่งด่วน</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ระยะเวลาโครงการ <span className="text-red-500">*</span>
            </label>
            <select
              name="timeframe"
              value={formData.timeframe}
              onChange={handleChange}
              required
              className="input-field"
            >
              <option value="">-- เลือกระยะเวลา --</option>
              <option value="IMMEDIATE">ภายใน 1 สัปดาห์</option>
              <option value="SHORT_TERM">1-4 สัปดาห์</option>
              <option value="MEDIUM_TERM">1-3 เดือน</option>
              <option value="LONG_TERM">3+ เดือน</option>
              <option value="ONGOING">ระยะยาว/ต่อเนื่อง</option>
              <option value="FLEXIBLE">ยืดหยุ่น</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันเริ่มต้น (ถ้ามี)
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                วันสิ้นสุด (ถ้ามี)
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              จำนวนชั่วโมงโดยประมาณ
            </label>
            <input
              type="number"
              name="estimatedHours"
              value={formData.estimatedHours}
              onChange={handleChange}
              min="1"
              placeholder="เช่น 20 ชั่วโมง"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ความเร่งด่วน <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'LOW', label: 'ไม่เร่งด่วน', color: 'green' },
                { value: 'MEDIUM', label: 'ปานกลาง', color: 'yellow' },
                { value: 'HIGH', label: 'เร่งด่วน', color: 'orange' },
                { value: 'CRITICAL', label: 'เร่งด่วนมาก', color: 'red' }
              ].map(({ value, label, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, urgency: value }))}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    formData.urgency === value
                      ? `border-${color}-500 bg-${color}-50 text-${color}-700 font-medium`
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Budget Section */}
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">งบประมาณ</h2>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                งบประมาณขั้นต่ำ
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="budgetMin"
                  value={formData.budgetMin}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  placeholder="0"
                  className="input-field pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {formData.budgetCurrency}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                งบประมาณสูงสุด
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="budgetMax"
                  value={formData.budgetMax}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  placeholder="0"
                  className="input-field pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  {formData.budgetCurrency}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="budgetFlexible"
                checked={formData.budgetFlexible}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">งบประมาณยืดหยุ่น สามารถต่อรองได้</span>
            </label>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ภาษาที่ใช้</h2>
        
        <div className="flex flex-wrap gap-3">
          {['Thai', 'English', 'Chinese', 'Japanese', 'Korean', 'Other'].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => handleLanguageToggle(lang)}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                formData.languages.includes(lang)
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {lang === 'Thai' && '🇹🇭 ไทย'}
              {lang === 'English' && '🇬🇧 อังกฤษ'}
              {lang === 'Chinese' && '🇨🇳 จีน'}
              {lang === 'Japanese' && '🇯🇵 ญี่ปุ่น'}
              {lang === 'Korean' && '🇰🇷 เกาหลี'}
              {lang === 'Other' && '🌐 อื่นๆ'}
            </button>
          ))}
        </div>
      </section>

      {/* Additional Requirements Section */}
      <section className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ข้อมูลเพิ่มเติม</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              บริบทอุตสาหกรรม
            </label>
            <textarea
              name="industryContext"
              value={formData.industryContext}
              onChange={handleChange}
              rows="2"
              placeholder="อุตสาหกรรมหรือสายงานที่เกี่ยวข้อง"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              กลุ่มเป้าหมาย
            </label>
            <textarea
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              rows="2"
              placeholder="ใครคือกลุ่มเป้าหมายของโครงการนี้?"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ความต้องการพิเศษ
            </label>
            <textarea
              name="specificRequirements"
              value={formData.specificRequirements}
              onChange={handleChange}
              rows="3"
              placeholder="ข้อกำหนดหรือความต้องการพิเศษอื่นๆ"
              className="input-field"
            />
          </div>
        </div>
      </section>

      {/* Submit Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary py-3 px-6"
          >
            ยกเลิก
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary py-3 px-6"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังบันทึก...
            </span>
          ) : (
            'ดูผู้เชี่ยวชาญที่แนะนำ'
          )}
        </button>
      </div>
    </form>
  );
};

export default IntakeBriefForm;
