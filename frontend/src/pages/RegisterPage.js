import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'SEEKER',
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('รหัสผ่านไม่ตรงกัน');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      const user = await register(registerData);
      toast.success('สร้างบัญชีสำเร็จ!');
      
      // Redirect based on role
      if (user.role === 'EXPERT') {
        navigate('/expert/profile');
      } else {
        navigate('/seeker/profile');
      }
    } catch (error) {
      toast.error(error.message || 'สร้างบัญชีล้มเหลว กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            สร้างบัญชี
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            มีบัญชีอยู่แล้ว?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ฉันเป็น...
              </label>
              <div className="flex space-x-4">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="EXPERT"
                    checked={formData.role === 'EXPERT'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`border-2 rounded-lg p-4 cursor-pointer text-center ${
                    formData.role === 'EXPERT' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                  }`}>
                    <p className="font-semibold">ผู้เชี่ยวชาญ</p>
                    <p className="text-xs text-gray-600">แบ่งปันความรู้</p>
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="role"
                    value="SEEKER"
                    checked={formData.role === 'SEEKER'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className={`border-2 rounded-lg p-4 cursor-pointer text-center ${
                    formData.role === 'SEEKER' ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                  }`}>
                    <p className="font-semibold">ผู้ขอคำปรึกษา</p>
                    <p className="text-xs text-gray-600">ค้นหาผู้เชี่ยวชาญ</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  ชื่อ
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  นามสกุล
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 input-field"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                อีเมล
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                เบอร์โทรศัพท์ (ไม่บังคับ)
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                รหัสผ่าน
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 input-field"
              />
              <p className="mt-1 text-xs text-gray-500">ต้องมีอย่างน้อย 8 ตัวอักษร</p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                ยืนยันรหัสผ่าน
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 input-field"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary"
            >
              {loading ? 'กำลังสร้างบัญชี...' : 'สร้างบัญชี'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
