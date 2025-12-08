import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-consultation.jpg" 
            alt="Professional Consultation" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-800/90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              เชื่อมต่อกับผู้เชี่ยวชาญที่ใช่สำหรับคุณ
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI เชื่อมโยงธุรกิจและองค์กรกับผู้เชี่ยวชาญมืออาชีพ
              ที่ปรึกษา และผู้ที่มีประสบการณ์ เพื่อแก้ปัญหาของคุณ
            </p>
            <div className="flex justify-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    เริ่มต้นใช้งาน
                  </Link>
                  <Link to="/login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                    เข้าสู่ระบบ
                  </Link>
                </>
              ) : (
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  ไปที่หน้าหลัก
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">วิธีการใช้งาน</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">1. บอกความต้องการ</h3>
              <p className="text-gray-600">
                บอกเราเกี่ยวกับปัญหาทางธุรกิจ โปรเจกต์ หรือเป้าหมายการเรียนรู้ของคุณ
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI จับคู่อัจฉริยะ</h3>
              <p className="text-gray-600">
                AI ของเราวิเคราะห์โปรไฟล์และแนะนำผู้เชี่ยวชาญที่เหมาะสมพร้อมเหตุผลละเอียด
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">3. เชื่อมต่อและทำงานร่วมกัน</h3>
              <p className="text-gray-600">
                ติดต่อผู้เชี่ยวชาญที่จับคู่ได้และเริ่มการให้คำปรึกษา
              </p>
            </div>
          </div>

          {/* AI Matching Visualization */}
          <div className="mt-16 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src="/images/ai-matching.jpg" 
              alt="AI Matching Technology" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* For Experts Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">สำหรับผู้เชี่ยวชาญ</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>แบ่งปันความเชี่ยวชาญและสร้างผลกระทบ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>ได้รับการจับคู่กับโอกาสที่เหมาะสม</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>สร้างรายได้หรือทำคุณประโยชน์ต่อสังคม</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>สร้างพอร์ตโฟลิโอและชื่อเสียง</span>
                </li>
              </ul>

              {/* Expert Profiles Grid */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src="/images/expert-male-1.jpg" alt="Expert 1" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src="/images/expert-female-1.jpg" alt="Expert 2" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img src="/images/expert-male-2.jpg" alt="Expert 3" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">สำหรับองค์กร</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>เข้าถึงผู้เชี่ยวชาญมืออาชีพและที่ปรึกษา</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>การจับคู่ด้วย AI ช่วยประหยัดเวลาและทรัพยากร</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>ได้คำอธิบายที่ชัดเจนสำหรับคำแนะนำผู้เชี่ยวชาญ</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>แก้ปัญหาธุรกิจที่ซับซ้อนอย่างมีประสิทธิภาพ</span>
                </li>
              </ul>

              {/* Team Collaboration Image */}
              <div className="rounded-2xl overflow-hidden shadow-xl mt-8">
                <img src="/images/team-collaboration.jpg" alt="Team Collaboration" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">พบกับผู้เชี่ยวชาญคุณภาพ</h2>
          <p className="text-xl text-gray-600 mb-8">
            ดูรายชื่อผู้เชี่ยวชาญทั้งหมด พร้อมรายละเอียดและผลงาน
          </p>
          <Link 
            to="/experts" 
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            ดูผู้เชี่ยวชาญทั้งหมด →
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">พร้อมที่จะเริ่มต้นหรือยัง?</h2>
          <p className="text-xl mb-8">เข้าร่วม Expert Connect วันนี้และค้นหาผู้เชี่ยวชาญที่เหมาะกับคุณ</p>
          {!isAuthenticated && (
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              สมัครสมาชิกเลย
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
