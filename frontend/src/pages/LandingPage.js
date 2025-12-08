import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white text-2xl font-bold">EC</span>
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">Expert Connect</span>
                <p className="text-xs text-gray-500 font-light">AI-Powered Expert Matching</p>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg transition-colors font-medium">
                    เข้าสู่ระบบ
                  </Link>
                  <Link to="/register" className="btn-primary">
                    เริ่มต้นใช้งาน
                  </Link>
                </>
              ) : (
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                  className="btn-primary"
                >
                  ไปที่หน้าหลัก
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-40 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-200/30 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🚀 แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                เชื่อมต่อกับ
                <span className="block mt-2 gradient-text">
                  ผู้เชี่ยวชาญที่ใช่
                </span>
                สำหรับคุณ
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI ที่เชื่อมโยงธุรกิจและองค์กร
                กับผู้เชี่ยวชาญมืออาชีพ ที่ปรึกษา และผู้ที่มีประสบการณ์
                เพื่อแก้ปัญหาและขับเคลื่อนธุรกิจของคุณ
              </p>
              
              <div className="flex flex-wrap gap-4">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="btn-primary text-lg px-10 py-4">
                      เริ่มต้นใช้งานฟรี
                    </Link>
                    <Link to="/experts" className="btn-secondary text-lg px-10 py-4">
                      ดูผู้เชี่ยวชาญ
                    </Link>
                  </>
                ) : (
                  <Link
                    to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                    className="btn-primary text-lg px-10 py-4"
                  >
                    ไปที่หน้าหลัก
                  </Link>
                )}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">500+</div>
                  <div className="text-sm text-gray-600 mt-1">ผู้เชี่ยวชาญ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">1,000+</div>
                  <div className="text-sm text-gray-600 mt-1">โปรเจกต์สำเร็จ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">95%</div>
                  <div className="text-sm text-gray-600 mt-1">ความพึงพอใจ</div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative lg:block hidden">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/hero-consultation.jpg" 
                  alt="Professional Consultation" 
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl p-6 max-w-xs">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">AI Matching</div>
                    <div className="text-sm text-gray-600">ค้นหาผู้เชี่ยวชาญที่ใช่ใน 2 นาที</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium mb-6">ไว้วางใจโดยองค์กรชั้นนำ</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">COMPANY A</div>
            <div className="text-2xl font-bold text-gray-400">COMPANY B</div>
            <div className="text-2xl font-bold text-gray-400">COMPANY C</div>
            <div className="text-2xl font-bold text-gray-400">COMPANY D</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">วิธีการใช้งาน</h2>
            <p className="section-subtitle">เพียง 3 ขั้นตอนง่ายๆ เชื่อมต่อกับผู้เชี่ยวชาญได้ทันที</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl text-white">📝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center">1. บอกความต้องการ</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                บอกเราเกี่ยวกับปัญหาทางธุรกิจ โปรเจกต์ 
                หรือเป้าหมายที่ต้องการความช่วยเหลือ
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl text-white">🤖</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center">2. AI จับคู่อัจฉริยะ</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                AI ของเราวิเคราะห์และแนะนำผู้เชี่ยวชาญ
                ที่เหมาะสมพร้อมเหตุผลละเอียด
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl text-white">🤝</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-center">3. เชื่อมต่อและทำงาน</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                ติดต่อผู้เชี่ยวชาญที่จับคู่ได้
                และเริ่มการให้คำปรึกษาทันที
              </p>
            </div>
          </div>

          {/* AI Matching Visualization */}
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/images/ai-matching.jpg" 
              alt="AI Matching Technology" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Expert Showcase Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">พบกับผู้เชี่ยวชาญมืออาชีพ</h2>
            <p className="section-subtitle">ผู้เชี่ยวชาญที่ได้รับการคัดสรรจากหลากหลายสาขา</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="card-hover">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img src="/images/expert-male-1.jpg" alt="Expert 1" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">ผู้เชี่ยวชาญด้านธุรกิจ</h3>
              <p className="text-gray-600 text-center text-sm">10+ ปีประสบการณ์</p>
              <div className="flex justify-center mt-4">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Business Strategy
                </span>
              </div>
            </div>
            
            <div className="card-hover">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img src="/images/expert-female-1.jpg" alt="Expert 2" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">ผู้เชี่ยวชาญด้านการตลาด</h3>
              <p className="text-gray-600 text-center text-sm">8+ ปีประสบการณ์</p>
              <div className="flex justify-center mt-4">
                <span className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Digital Marketing
                </span>
              </div>
            </div>
            
            <div className="card-hover">
              <div className="aspect-square rounded-2xl overflow-hidden mb-6 shadow-lg">
                <img src="/images/expert-male-2.jpg" alt="Expert 3" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">ผู้เชี่ยวชาญด้านเทคโนโลยี</h3>
              <p className="text-gray-600 text-center text-sm">12+ ปีประสบการณ์</p>
              <div className="flex justify-center mt-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Technology & AI
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/experts" className="btn-primary text-lg px-10 py-4">
              ดูผู้เชี่ยวชาญทั้งหมด →
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - For Experts */}
            <div>
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                สำหรับผู้เชี่ยวชาญ
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                แบ่งปันความรู้<br />สร้างรายได้
              </h2>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-primary-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">แบ่งปันความเชี่ยวชาญ</div>
                    <div className="text-gray-600">สร้างผลกระทบและช่วยเหลือองค์กร</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-primary-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">การจับคู่อัจฉริยะ</div>
                    <div className="text-gray-600">ได้รับโอกาสที่เหมาะสมกับทักษะของคุณ</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-primary-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">สร้างรายได้</div>
                    <div className="text-gray-600">กำหนดค่าบริการด้วยตัวเองอย่างยืดหยุ่น</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-primary-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">สร้างพอร์ตโฟลิโอ</div>
                    <div className="text-gray-600">เพิ่มชื่อเสียงและขยายเครือข่าย</div>
                  </div>
                </li>
              </ul>
              <Link to="/register?role=expert" className="btn-primary mt-8 inline-block">
                สมัครเป็นผู้เชี่ยวชาญ
              </Link>
            </div>
            
            {/* Right - For Organizations */}
            <div>
              <div className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                สำหรับองค์กร
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                เข้าถึงผู้เชี่ยวชาญ<br />ชั้นนำได้ทันที
              </h2>
              <ul className="space-y-5 mb-8">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-accent-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">เข้าถึงผู้เชี่ยวชาญมืออาชีพ</div>
                    <div className="text-gray-600">ที่ปรึกษาและผู้มีประสบการณ์จากหลากหลายสาขา</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-accent-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">ประหยัดเวลาและทรัพยากร</div>
                    <div className="text-gray-600">AI จับคู่ผู้เชี่ยวชาญที่ใช่ภายใน 2 นาที</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-accent-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">การแนะนำที่โปร่งใส</div>
                    <div className="text-gray-600">ได้คำอธิบายชัดเจนว่าทำไมผู้เชี่ยวชาญคนนี้เหมาะสม</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                    <span className="text-accent-600 font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-lg mb-1">แก้ปัญหาที่ซับซ้อน</div>
                    <div className="text-gray-600">ขับเคลื่อนธุรกิจอย่างมีประสิทธิภาพ</div>
                  </div>
                </li>
              </ul>
              
              {/* Team Collaboration Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src="/images/team-collaboration.jpg" alt="Team Collaboration" className="w-full h-auto object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">ความคิดเห็นจากผู้ใช้งาน</h2>
            <p className="section-subtitle">พวกเขาไว้วางใจและประสบความสำเร็จกับเรา</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "แพลตฟอร์มที่ยอดเยี่ยม! ช่วยให้เราค้นหาผู้เชี่ยวชาญด้าน Digital Marketing
                ที่เหมาะสมได้ภายใน 1 วัน ประหยัดเวลาและงบประมาณมาก"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">สมชาย ใจดี</div>
                  <div className="text-sm text-gray-500">CEO, Tech Startup</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "AI Matching ของ Expert Connect แม่นยำมาก แนะนำผู้เชี่ยวชาญที่ตรงกับความต้องการ
                และอธิบายเหตุผลชัดเจน ทำให้เราตัดสินใจได้ง่าย"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">วิภา ศรีสุข</div>
                  <div className="text-sm text-gray-500">Marketing Director</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "ในฐานะผู้เชี่ยวชาญ ผมได้โอกาสดีๆ จากแพลตฟอร์มนี้
                ได้ทำงานกับองค์กรชั้นนำ และสร้างรายได้เสริมได้เป็นอย่างดี"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="font-semibold">ดร. ประเสริฐ วงศ์ดี</div>
                  <div className="text-sm text-gray-500">Business Consultant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            พร้อมที่จะเริ่มต้นหรือยัง?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            เข้าร่วม Expert Connect วันนี้ ค้นหาผู้เชี่ยวชาญที่เหมาะกับคุณ
            และเริ่มขับเคลื่อนธุรกิจของคุณให้เติบโตไปด้วยกัน
          </p>
          {!isAuthenticated && (
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register" className="bg-white text-primary-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg">
                เริ่มต้นใช้งานฟรี
              </Link>
              <Link to="/experts" className="btn-outline text-lg px-10 py-4">
                ดูผู้เชี่ยวชาญ
              </Link>
            </div>
          )}
          
          {/* Additional Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm opacity-80">
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              ฟรีสำหรับการสมัคร
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              AI Matching ภายใน 2 นาที
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              ผู้เชี่ยวชาญ 500+ คน
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl font-bold">EC</span>
                </div>
                <span className="text-xl font-bold">Expert Connect</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md leading-relaxed">
                แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI ที่เชื่อมโยงธุรกิจและองค์กร
                กับผู้เชี่ยวชาญมืออาชีพ
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">เมนูหลัก</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/experts" className="hover:text-white transition-colors">ผู้เชี่ยวชาญ</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">สมัครสมาชิก</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">ติดต่อเรา</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@expertconnect.com</li>
                <li>+66 2 123 4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Expert Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
