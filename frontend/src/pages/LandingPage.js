import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-20">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white text-lg sm:text-xl lg:text-2xl font-bold">EC</span>
              </div>
              <div className="hidden md:block">
                <span className="text-lg lg:text-2xl font-bold gradient-text">TALENTER</span>
                <p className="text-xs text-gray-500 font-light hidden lg:block">กำลังคน สร้างคุณค่า</p>
              </div>
              <div className="md:hidden">
                <span className="text-base sm:text-lg font-bold gradient-text">TALENTER</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors font-medium text-xs sm:text-sm md:text-base">
                    เข้าสู่ระบบ
                  </Link>
                  <Link to="/register" className="btn-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3">
                    เริ่มต้นใช้งาน
                  </Link>
                </>
              ) : (
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                  className="btn-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3"
                >
                  ไปที่หน้าหลัก
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-14 sm:pt-16 lg:pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 sm:top-40 left-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-primary-200/20 sm:bg-primary-200/30 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-accent-200/20 sm:bg-accent-200/30 rounded-full blur-2xl sm:blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-20 pb-12 sm:pb-16 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="inline-block">
                <span className="bg-primary-100 text-primary-700 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-semibold">
                  🚀 แพลตฟอร์มจับคู่ผู้เชี่ยวชาญด้วย AI
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                <span className="gradient-text">TALENTER</span>
                <span className="block mt-1 sm:mt-2 text-gray-900">
                  กำลังคน สร้างคุณค่า
                </span>
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 leading-relaxed px-2 sm:px-0">
                มาร่วมเป็นส่วนหนึ่งขององค์กร ที่สร้างคุณค่า
                ให้กับกำลังพลของประเทศไทย<br/>
                <span className="font-semibold text-primary-600 mt-2 block">
                  HIGH VALUE • HIGH ENERGY • WORKFORCE
                </span>
              </p>
              
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 leading-relaxed px-2 sm:px-0">
                พื้นที่รวมรวมบุคลากรคุณภาพ บุคลากรที่มีประสบการณ์สูง
                มีศักยภาพสร้างขีดความสามารถในการแข่งขัน และธุรกิจของคุณ
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 lg:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                {!isAuthenticated ? (
                  <>
                    <Link to="/register" className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 w-full sm:w-auto">
                      เริ่มต้นใช้งานฟรี
                    </Link>
                    <Link to="/experts" className="btn-secondary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 w-full sm:w-auto">
                      ดูผู้เชี่ยวชาญ
                    </Link>
                  </>
                ) : (
                  <Link
                    to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                    className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 w-full sm:w-auto"
                  >
                    ไปที่หน้าหลัก
                  </Link>
                )}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 pt-4 sm:pt-6 lg:pt-8 px-2 sm:px-0">
                <div className="text-center lg:text-left bg-white/50 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">500+</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">ผู้เชี่ยวชาญ</div>
                </div>
                <div className="text-center lg:text-left bg-white/50 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">1,000+</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">โปรเจกต์สำเร็จ</div>
                </div>
                <div className="text-center lg:text-left bg-white/50 rounded-lg p-2 sm:p-3">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary-600">95%</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-600 mt-0.5 sm:mt-1">ความพึงพอใจ</div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl">
                <img 
                  src="/images/hero-consultation.jpg" 
                  alt="Professional Consultation" 
                  className="w-full h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                  onError={(e) => {e.target.style.display='none'}}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 lg:-bottom-8 -left-6 lg:-left-8 bg-white rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl p-4 lg:p-6 max-w-xs">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl lg:text-2xl">✓</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm lg:text-base">AI Matching</div>
                    <div className="text-xs lg:text-sm text-gray-600">ค้นหาผู้เชี่ยวชาญที่ใช่ใน 2 นาที</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="py-6 sm:py-8 lg:py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-[10px] sm:text-xs lg:text-sm font-medium mb-3 sm:mb-4 lg:mb-6">ไว้วางใจโดยองค์กรชั้นนำ</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-12 opacity-50 sm:opacity-60">
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-400">COMPANY A</div>
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-400">COMPANY B</div>
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-400 hidden sm:block">COMPANY C</div>
            <div className="text-sm sm:text-lg lg:text-2xl font-bold text-gray-400 hidden sm:block">COMPANY D</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900">จุดเด่นของเรา</h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-0">ระบบที่ออกแบบมาเพื่อความสะดวกและรวดเร็ว</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            <div className="card-hover">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg">
                <span className="text-xl sm:text-2xl lg:text-3xl text-white">🏢</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 text-center">ค้นหาง่าย รวดเร็ว</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center leading-relaxed px-2">
                ระบบจัดการฐานข้อมูลผู้สมัครงาน
                สามารถจัดการและติดตามข้อมูลพนักงาน
                และค้นหาพนักงานได้อย่างรวดเร็ว
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg">
                <span className="text-xl sm:text-2xl lg:text-3xl text-white">🎓</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 text-center">ผู้มีประสบการณ์สูง</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center leading-relaxed px-2">
                ผู้บริหารระดับสูงและผู้จัดการ
                ที่มีประสบการณ์สูงหลากหลายสายงาน
                พร้อมให้คำปรึกษาอย่างมืออาชีพ
              </p>
            </div>
            
            <div className="card-hover">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 shadow-lg">
                <span className="text-xl sm:text-2xl lg:text-3xl text-white">💬</span>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold mb-2 sm:mb-3 text-center">Line</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center leading-relaxed px-2">
                ติดต่อสะดวก รวดเร็ว
                ผ่าน LINE ที่ทุกคนคุ้นเคย
                สื่อสารได้ง่ายและทันใจ
              </p>
            </div>
          </div>

          {/* AI Matching Visualization */}
          <div className="rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl">
            <img 
              src="/images/ai-matching.jpg" 
              alt="AI Matching Technology" 
              className="w-full h-auto object-cover"
              onError={(e) => {e.target.style.display='none'}}
            />
          </div>
        </div>
      </div>

      {/* Expert Showcase Section */}
      <div className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900">พบกับผู้เชี่ยวชาญมืออาชีพ</h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-12 px-4 sm:px-0">ผู้เชี่ยวชาญที่ได้รับการคัดสรรจากหลากหลายสาขา</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
            <div className="card-hover">
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 lg:mb-6 shadow-md sm:shadow-lg">
                <img src="/images/expert-male-1.jpg" alt="Expert 1" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#f3f4f6'}}/>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-center">ผู้เชี่ยวชาญด้านธุรกิจ</h3>
              <p className="text-gray-600 text-center text-xs sm:text-sm">10+ ปีประสบการณ์</p>
              <div className="flex justify-center mt-2 sm:mt-3 lg:mt-4">
                <span className="bg-primary-100 text-primary-700 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                  Business Strategy
                </span>
              </div>
            </div>
            
            <div className="card-hover">
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 lg:mb-6 shadow-md sm:shadow-lg">
                <img src="/images/expert-female-1.jpg" alt="Expert 2" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#f3f4f6'}}/>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-center">ผู้เชี่ยวชาญด้านการตลาด</h3>
              <p className="text-gray-600 text-center text-xs sm:text-sm">8+ ปีประสบการณ์</p>
              <div className="flex justify-center mt-2 sm:mt-3 lg:mt-4">
                <span className="bg-accent-100 text-accent-700 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                  Digital Marketing
                </span>
              </div>
            </div>
            
            <div className="card-hover">
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5 lg:mb-6 shadow-md sm:shadow-lg">
                <img src="/images/expert-male-2.jpg" alt="Expert 3" className="w-full h-full object-cover" onError={(e) => {e.target.style.display='none'; e.target.parentElement.style.backgroundColor='#f3f4f6'}}/>
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2 text-center">ผู้เชี่ยวชาญด้านเทคโนโลยี</h3>
              <p className="text-gray-600 text-center text-xs sm:text-sm">12+ ปีประสบการณ์</p>
              <div className="flex justify-center mt-2 sm:mt-3 lg:mt-4">
                <span className="bg-green-100 text-green-700 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
                  Technology & AI
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center px-4 sm:px-0">
            <Link to="/experts" className="btn-primary text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 inline-block w-full sm:w-auto">
              ดูผู้เชี่ยวชาญทั้งหมด →
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
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
      <div className="py-10 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 text-gray-900">ความคิดเห็นจากผู้ใช้งาน</h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4 sm:px-0">พวกเขาไว้วางใจและประสบความสำเร็จกับเรา</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="card">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="text-yellow-400 text-base sm:text-lg lg:text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">
                "แพลตฟอร์มที่ยอดเยี่ยม! ช่วยให้เราค้นหาผู้เชี่ยวชาญด้าน Digital Marketing
                ที่เหมาะสมได้ภายใน 1 วัน ประหยัดเวลาและงบประมาณมาก"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm lg:text-base">สมชาย ใจดี</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500">CEO, Tech Startup</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="text-yellow-400 text-base sm:text-lg lg:text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">
                "AI Matching ของ Expert Connect แม่นยำมาก แนะนำผู้เชี่ยวชาญที่ตรงกับความต้องการ
                และอธิบายเหตุผลชัดเจน ทำให้เราตัดสินใจได้ง่าย"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm lg:text-base">วิภา ศรีสุข</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500">Marketing Director</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="text-yellow-400 text-base sm:text-lg lg:text-xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">
                "ในฐานะผู้เชี่ยวชาญ ผมได้โอกาสดีๆ จากแพลตฟอร์มนี้
                ได้ทำงานกับองค์กรชั้นนำ และสร้างรายได้เสริมได้เป็นอย่างดี"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-xs sm:text-sm lg:text-base">ดร. ประเสริฐ วงศ์ดี</div>
                  <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500">Business Consultant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-white/5 sm:bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-accent-500/10 sm:bg-accent-500/20 rounded-full blur-2xl sm:blur-3xl"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 lg:mb-6">
            พร้อมที่จะเริ่มต้นหรือยัง?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 lg:mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            เข้าร่วม Expert Connect วันนี้ ค้นหาผู้เชี่ยวชาญที่เหมาะกับคุณ
            และเริ่มขับเคลื่อนธุรกิจของคุณให้เติบโตไปด้วยกัน
          </p>
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 lg:gap-4 px-4 sm:px-0">
              <Link to="/register" className="bg-white text-primary-600 px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-xl sm:hover:shadow-2xl text-sm sm:text-base lg:text-lg w-full sm:w-auto">
                เริ่มต้นใช้งานฟรี
              </Link>
              <Link to="/experts" className="btn-outline text-sm sm:text-base lg:text-lg px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 w-full sm:w-auto">
                ดูผู้เชี่ยวชาญ
              </Link>
            </div>
          )}
          
          {/* Additional Info */}
          <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 lg:gap-8 text-xs sm:text-sm opacity-75 sm:opacity-80">
            <div className="flex items-center justify-center">
              <span className="mr-1.5 sm:mr-2">✓</span>
              ฟรีสำหรับการสมัคร
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-1.5 sm:mr-2">✓</span>
              AI Matching ภายใน 2 นาที
            </div>
            <div className="flex items-center justify-center">
              <span className="mr-1.5 sm:mr-2">✓</span>
              ผู้เชี่ยวชาญ 500+ คน
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg sm:text-xl font-bold">EC</span>
                </div>
                <span className="text-lg sm:text-xl font-bold">TALENTER</span>
              </div>
              <p className="text-gray-400 mb-3 sm:mb-4 max-w-md leading-relaxed text-xs sm:text-sm">
                พื้นที่รวมรวมบุคลากรคุณภาพ มาร่วมสร้างคุณค่า
                ให้กับกำลังพลของประเทศไทย
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">เมนูหลัก</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li><Link to="/experts" className="hover:text-white transition-colors">ผู้เชี่ยวชาญ</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">สมัครสมาชิก</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">ติดต่อเรา</h3>
              <ul className="space-y-1.5 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <li>info@expertconnect.com</li>
                <li>+66 2 123 4567</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400 text-[10px] sm:text-xs lg:text-sm">
            <p>&copy; 2024 TALENTER by Talent Thailand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
