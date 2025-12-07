import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">EC</span>
              </div>
              <span className="text-xl font-bold gradient-text hidden sm:inline">Expert Connect</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg transition-colors font-medium">
                    เข้าสู่ระบบ
                  </Link>
                  <Link to="/register" className="btn-primary text-sm sm:text-base">
                    เริ่มต้นใช้งาน
                  </Link>
                </>
              ) : (
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                  className="btn-primary text-sm sm:text-base"
                >
                  ไปที่หน้าหลัก
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="gradient-bg text-white pt-32 pb-20 relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="/images/hero-consultation.jpg" 
            alt="Expert Consultation" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                🚀 แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              เชื่อมต่อกับ
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                ผู้เชี่ยวชาญที่ใช่
              </span>
              สำหรับคุณ
            </h1>
            
            <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto text-gray-100 leading-relaxed">
              แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI เชื่อมโยงธุรกิจและองค์กรกับผู้เชี่ยวชาญมืออาชีพ
              ที่ปรึกษา และผู้ที่มีประสบการณ์ เพื่อแก้ปัญหาของคุณ
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="w-full sm:w-auto bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    🎯 เริ่มต้นใช้งานฟรี
                  </Link>
                  <Link to="/experts" className="w-full sm:w-auto btn-outline">
                    👀 ดูผู้เชี่ยวชาญ
                  </Link>
                </>
              ) : (
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                  className="w-full sm:w-auto bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  ไปที่หน้าหลัก →
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-200">ผู้เชี่ยวชาญ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold">1,000+</div>
                <div className="text-sm text-gray-200">โปรเจกต์สำเร็จ</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm text-gray-200">ความพึงพอใจ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Image for Features */}
          <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
            <img 
              src="/images/team-collaboration.jpg" 
              alt="Team Collaboration" 
              className="w-full h-96 object-cover"
            />
          </div>
          
          <div className="text-center mb-16">
            <h2 className="section-title">
              วิธีการใช้งาน
              <span className="block text-primary-600">ง่ายเพียง 3 ขั้นตอน</span>
            </h2>
            <p className="section-subtitle">
              เริ่มต้นเส้นทางสู่ความสำเร็จกับ Expert Connect
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover text-center group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">📝</span>
              </div>
              <div className="bg-primary-100 text-primary-600 rounded-full px-4 py-1 inline-block mb-3 text-sm font-semibold">
                ขั้นตอนที่ 1
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">บอกความต้องการ</h3>
              <p className="text-gray-600 leading-relaxed">
                บอกเราเกี่ยวกับปัญหาทางธุรกิจ โปรเจกต์ หรือเป้าหมายการเรียนรู้ของคุณ
              </p>
            </div>

            <div className="card-hover text-center group">
              <div className="bg-gradient-to-br from-accent-500 to-accent-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">🤖</span>
              </div>
              <div className="bg-accent-100 text-accent-600 rounded-full px-4 py-1 inline-block mb-3 text-sm font-semibold">
                ขั้นตอนที่ 2
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">AI จับคู่อัจฉริยะ</h3>
              <p className="text-gray-600 leading-relaxed">
                AI ของเราวิเคราะห์โปรไฟล์และแนะนำผู้เชี่ยวชาญที่เหมาะสมพร้อมเหตุผลละเอียด
              </p>
            </div>

            <div className="card-hover text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-4xl">🤝</span>
              </div>
              <div className="bg-green-100 text-green-600 rounded-full px-4 py-1 inline-block mb-3 text-sm font-semibold">
                ขั้นตอนที่ 3
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">เชื่อมต่อและทำงานร่วมกัน</h3>
              <p className="text-gray-600 leading-relaxed">
                ติดต่อผู้เชี่ยวชาญที่จับคู่ได้และเริ่มการให้คำปรึกษา
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For Experts Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block mb-4">
                <span className="bg-primary-100 text-primary-600 px-4 py-2 rounded-full text-sm font-semibold">
                  👨‍💼 สำหรับผู้เชี่ยวชาญ
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                แบ่งปันความเชี่ยวชาญ
                <span className="block text-primary-600 mt-2">สร้างรายได้</span>
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'แบ่งปันความเชี่ยวชาญและสร้างผลกระทบ',
                  'ได้รับการจับคู่กับโอกาสที่เหมาะสม',
                  'สร้างรายได้หรือทำคุณประโยชน์ต่อสังคม',
                  'สร้างเครือข่ายมืออาชีพ'
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="bg-primary-100 text-primary-600 rounded-full p-1 mr-3 mt-1 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary inline-block">
                เข้าร่วมในฐานะผู้เชี่ยวชาญ →
              </Link>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 mb-4">
                    <div className="flex items-center mb-3">
                      <img 
                        src="/images/expert-male-1.jpg" 
                        alt="Expert Profile" 
                        className="w-12 h-12 rounded-xl object-cover mr-3"
                      />
                      <div>
                        <div className="font-bold text-gray-900">Somchai K.</div>
                        <div className="text-sm text-gray-500">Digital Transformation Expert</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-4">⭐ 4.9/5.0</span>
                      <span className="mr-4">💼 15 ปีประสบการณ์</span>
                      <span>💰 ฿2,500/ชม.</span>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl p-6">
                    <div className="flex items-center mb-3">
                      <img 
                        src="/images/expert-female-1.jpg" 
                        alt="Expert Profile" 
                        className="w-12 h-12 rounded-xl object-cover mr-3"
                      />
                      <div>
                        <div className="font-bold text-gray-900">Nattaya P.</div>
                        <div className="text-sm text-gray-500">Marketing Strategy Consultant</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-4">⭐ 5.0/5.0</span>
                      <span className="mr-4">💼 12 ปีประสบการณ์</span>
                      <span>💰 ฿3,000/ชม.</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 rounded-2xl px-6 py-3 font-bold shadow-lg animate-bounce-slow">
                  ✨ รายได้เสริม
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For Seekers Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                {/* Real AI Matching Image */}
                <div className="mb-8 rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/ai-matching.jpg" 
                    alt="AI Matching Technology" 
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <div className="bg-gradient-to-br from-accent-100 to-accent-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 mb-4">
                    <div className="font-bold text-gray-900 mb-2">🎯 โปรเจกต์ของคุณ</div>
                    <div className="text-sm text-gray-600 mb-3">
                      "ต้องการที่ปรึกษาด้าน Digital Marketing สำหรับธุรกิจ SME"
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">✅ จับคู่สำเร็จ</span>
                      <span className="text-xs text-gray-500">2 ชม. ที่แล้ว</span>
                    </div>
                  </div>
                  
                  <div className="bg-primary-600 text-white rounded-2xl p-6">
                    <div className="font-bold mb-2">🤖 AI แนะนำ 3 ผู้เชี่ยวชาญ</div>
                    <div className="text-sm opacity-90 mb-4">
                      จับคู่แล้ว 95% เหมาะสมกับความต้องการของคุณ
                    </div>
                    <button className="w-full bg-white text-primary-600 py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                      ดูผลการจับคู่
                    </button>
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 bg-green-400 text-green-900 rounded-2xl px-6 py-3 font-bold shadow-lg">
                  ⚡ รวดเร็ว
                </div>
              </div>
            </div>

            <div>
              <div className="inline-block mb-4">
                <span className="bg-accent-100 text-accent-600 px-4 py-2 rounded-full text-sm font-semibold">
                  🏢 สำหรับองค์กร & ธุรกิจ
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                พบผู้เชี่ยวชาญ
                <span className="block text-accent-600 mt-2">ที่ตอบโจทย์ธุรกิจ</span>
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'AI จับคู่ผู้เชี่ยวชาญที่เหมาะสมที่สุดอัตโนมัติ',
                  'เข้าถึงผู้เชี่ยวชาญหลากหลายสาขา',
                  'ปลอดภัยและเชื่อถือได้',
                  'ยืดหยุ่นตามความต้องการของคุณ'
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <span className="bg-accent-100 text-accent-600 rounded-full p-1 mr-3 mt-1 group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </span>
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register" className="btn-primary inline-block">
                เริ่มค้นหาผู้เชี่ยวชาญ →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">หมวดหมู่ความเชี่ยวชาญ</h2>
            <p className="section-subtitle">
              ครอบคลุมทุกด้านที่คุณต้องการ
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: '💻', name: 'เทคโนโลยี', color: 'from-blue-500 to-blue-600' },
              { icon: '📊', name: 'การตลาด', color: 'from-pink-500 to-pink-600' },
              { icon: '💼', name: 'ธุรกิจ', color: 'from-purple-500 to-purple-600' },
              { icon: '💰', name: 'การเงิน', color: 'from-green-500 to-green-600' },
              { icon: '👥', name: 'HR', color: 'from-orange-500 to-orange-600' },
              { icon: '🎨', name: 'ดีไซน์', color: 'from-red-500 to-red-600' },
            ].map((cat, index) => (
              <Link
                key={index}
                to="/experts"
                className="card-hover text-center"
              >
                <div className={`bg-gradient-to-br ${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-3xl">{cat.icon}</span>
                </div>
                <div className="font-semibold text-gray-900">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-bg text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-xl mb-10 text-gray-100">
            เข้าร่วมกับผู้เชี่ยวชาญและองค์กรมากมายที่ไว้วางใจ Expert Connect
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-primary-600 px-10 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg">
              เริ่มต้นใช้งานฟรี 🚀
            </Link>
            <Link to="/experts" className="btn-outline text-lg">
              ดูผู้เชี่ยวชาญทั้งหมด
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">EC</span>
                </div>
                <span className="text-xl font-bold text-white">Expert Connect</span>
              </div>
              <p className="text-sm text-gray-400">
                แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI ที่ดีที่สุดในประเทศไทย
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">สำหรับผู้ใช้งาน</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/experts" className="hover:text-primary-400 transition-colors">ค้นหาผู้เชี่ยวชาญ</Link></li>
                <li><Link to="/register" className="hover:text-primary-400 transition-colors">สมัครสมาชิก</Link></li>
                <li><Link to="/login" className="hover:text-primary-400 transition-colors">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">เกี่ยวกับเรา</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">เกี่ยวกับ Expert Connect</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">ติดต่อเรา</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">ร่วมงานกับเรา</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">นโยบาย</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">นโยบายความเป็นส่วนตัว</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">ข้อกำหนดการใช้งาน</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">นโยบาย Cookie</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Expert Connect. All rights reserved. Made with ❤️ in Thailand</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
