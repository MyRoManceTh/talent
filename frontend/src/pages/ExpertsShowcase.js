import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExpertsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  // Mockup Data ผู้เชี่ยวชาญ
  const mockExperts = [
    {
      id: 1,
      name: 'ดร. สมชาย วิชาการ',
      title: 'ผู้เชี่ยวชาญด้าน Digital Transformation',
      image: '👨‍💼',
      rating: 4.9,
      reviews: 45,
      hourlyRate: 2500,
      yearsExperience: 15,
      category: 'เทคโนโลยี',
      skills: ['Digital Strategy', 'Change Management', 'Cloud Computing', 'AI/ML'],
      bio: 'อดีต CTO ของบริษัทเทคโนโลยีชั้นนำ มีประสบการณ์ในการนำพาองค์กรสู่ยุคดิจิทัล มากกว่า 15 ปี',
      education: 'ปริญญาเอก วิทยาการคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย',
      companies: ['LINE Thailand', 'Agoda', 'SCB'],
      achievements: [
        'นำทีมพัฒนาระบบ AI Chatbot ที่มีผู้ใช้มากกว่า 5 ล้านคน',
        'ลดต้นทุน IT ลง 40% ผ่านการ Cloud Migration',
        'วิทยากรในงาน Tech Conference กว่า 50 ครั้ง'
      ]
    },
    {
      id: 2,
      name: 'คุณนิภา การตลาด',
      title: 'Digital Marketing & E-commerce Specialist',
      image: '👩‍💼',
      rating: 4.8,
      reviews: 38,
      hourlyRate: 2000,
      yearsExperience: 12,
      category: 'การตลาด',
      skills: ['Digital Marketing', 'SEO/SEM', 'Social Media', 'E-commerce'],
      bio: 'ผู้เชี่ยวชาญด้านการตลาดดิจิทัล ที่ปรึกษาให้กับ SME และ Startup มากกว่า 50 ราย',
      education: 'ปริญญาโท การตลาด มหาวิทยาลัยธรรมศาสตร์',
      companies: ['Central Group', 'Lazada', 'Shopee'],
      achievements: [
        'เพิ่มยอดขายออนไลน์ให้ลูกค้าเฉลี่ย 250%',
        'สร้าง Brand Awareness เพิ่มขึ้น 5 เท่า ใน 6 เดือน',
        'ผู้เขียนบล็อก Marketing ที่มีผู้ติดตาม 100K+'
      ]
    },
    {
      id: 3,
      name: 'ผศ.ดร. อรรถพล นวัตกรรม',
      title: 'Innovation & Business Strategy Consultant',
      image: '👨‍🏫',
      rating: 5.0,
      reviews: 52,
      hourlyRate: 3000,
      yearsExperience: 20,
      category: 'ธุรกิจ',
      skills: ['Business Strategy', 'Innovation Management', 'Startup Mentoring', 'Design Thinking'],
      bio: 'อาจารย์มหาวิทยาลัย และที่ปรึกษาองค์กรชั้นนำ เชี่ยวชาญด้านนวัตกรรมและกลยุทธ์ธุรกิจ',
      education: 'ปริญญาเอก บริหารธุรกิจ Stanford University',
      companies: ['CP Group', 'PTT', 'สภาอุตสาหกรรม'],
      achievements: [
        'ที่ปรึกษา Corporate Innovation ให้ Fortune 500 Companies',
        'Mentor ให้ Startup มากกว่า 100 ทีม',
        'ผู้แต่งหนังสือ Business Strategy ขายดี 3 เล่ม'
      ]
    },
    {
      id: 4,
      name: 'คุณสุรเดช การเงิน',
      title: 'CFO & Financial Planning Expert',
      image: '👨‍💼',
      rating: 4.9,
      reviews: 41,
      hourlyRate: 2800,
      yearsExperience: 18,
      category: 'การเงิน',
      skills: ['Financial Planning', 'Accounting', 'Tax Planning', 'Fundraising'],
      bio: 'อดีต CFO บริษัทจดทะเบียน ให้คำปรึกษาด้านการเงินและการบัญชีให้กับองค์กรทุกขนาด',
      education: 'ปริญญาโท การเงิน จุฬาลงกรณ์มหาวิทยาลัย + CPA, CFA',
      companies: ['ธนาคารกสิกรไทย', 'บมจ. กรุงเทพประกันภัย', 'Startup Ventures'],
      achievements: [
        'ช่วย Startup ระดมทุนได้มากกว่า 500 ล้านบาท',
        'ปรับโครงสร้างทางการเงินให้ SME มากกว่า 30 ราย',
        'วิทยากรสอนหลักสูตร CFO Certification'
      ]
    },
    {
      id: 5,
      name: 'คุณพิมพ์ใจ HR Pro',
      title: 'HR Transformation & People Development',
      image: '👩‍💼',
      rating: 4.8,
      reviews: 35,
      hourlyRate: 1800,
      yearsExperience: 14,
      category: 'ทรัพยากรบุคคล',
      skills: ['HR Strategy', 'Talent Management', 'Culture Transformation', 'Leadership Development'],
      bio: 'ผู้เชี่ยวชาญด้าน HR Transformation ช่วยองค์กรสร้างวัฒนธรรมองค์กรและพัฒนาบุคลากร',
      education: 'ปริญญาโท จิตวิทยาอุตสาหกรรมและองค์การ มหาวิทยาลัยมหิดล',
      companies: ['Google Thailand', 'Unilever', 'True Corporation'],
      achievements: [
        'ออกแบบ HR Transformation ให้องค์กรขนาดใหญ่ 5 แห่ง',
        'พัฒนา Leadership Program ที่ผ่านการฝึกอบรม 1,000+ คน',
        'ลดอัตราการลาออก (Turnover) เฉลี่ย 35%'
      ]
    },
    {
      id: 6,
      name: 'คุณวรพจน์ เทคโนโลยี',
      title: 'Software Architecture & Tech Lead',
      image: '👨‍💻',
      rating: 4.9,
      reviews: 48,
      hourlyRate: 2200,
      yearsExperience: 13,
      category: 'เทคโนโลยี',
      skills: ['System Architecture', 'Microservices', 'DevOps', 'Team Leadership'],
      bio: 'Software Architect มากประสบการณ์ เชี่ยวชาญการออกแบบระบบขนาดใหญ่และนำทีม Dev',
      education: 'ปริญญาตรี วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์',
      companies: ['Grab', 'Shopee', 'Agoda'],
      achievements: [
        'ออกแบบ System Architecture ที่รองรับผู้ใช้ 10M+ คน',
        'นำทีม Dev 50+ คน พัฒนา Product สำเร็จมากกว่า 20 โปรเจกต์',
        'Speaker ในงาน DevOps และ Software Architecture Conference'
      ]
    },
    {
      id: 7,
      name: 'คุณสุวรรณา ออกแบบ',
      title: 'UX/UI Design & Product Design Lead',
      image: '👩‍🎨',
      rating: 4.9,
      reviews: 43,
      hourlyRate: 1900,
      yearsExperience: 11,
      category: 'ดีไซน์',
      skills: ['UX Research', 'UI Design', 'Design Thinking', 'Prototyping'],
      bio: 'UX/UI Designer ที่มีผลงานได้รับรางวัลระดับสากล ที่ปรึกษาด้าน Product Design',
      education: 'ปริญญาโท Interaction Design, Carnegie Mellon University',
      companies: ['LINE', 'Airbnb', 'Booking.com'],
      achievements: [
        'ออกแบบ App ที่ได้รับรางวัล Design Award 3 ปีซ้อน',
        'เพิ่ม User Engagement เฉลี่ย 180%',
        'ให้คำปรึกษา UX/UI มากกว่า 40 โปรเจกต์'
      ]
    },
    {
      id: 8,
      name: 'ดร. ประสิทธิ์ ข้อมูล',
      title: 'Data Science & AI Solutions Architect',
      image: '👨‍🔬',
      rating: 5.0,
      reviews: 39,
      hourlyRate: 3200,
      yearsExperience: 16,
      category: 'เทคโนโลยี',
      skills: ['Machine Learning', 'Deep Learning', 'Big Data', 'AI Strategy'],
      bio: 'ผู้เชี่ยวชาญด้าน Data Science และ AI มีประสบการณ์สร้าง AI Solutions ให้องค์กรชั้นนำ',
      education: 'ปริญญาเอก Computer Science (AI), MIT',
      companies: ['Google', 'Amazon', 'Kasikorn Bank'],
      achievements: [
        'พัฒนา AI Model ที่เพิ่มรายได้ให้ลูกค้า 150M+',
        'สร้าง Recommendation System ที่มี Accuracy 95%',
        'ผู้ร่วมวิจัย Paper ที่ได้รับการอ้างอิงมากกว่า 500 ครั้ง'
      ]
    }
  ];

  const categories = ['ทั้งหมด', 'เทคโนโลยี', 'การตลาด', 'ธุรกิจ', 'การเงิน', 'ทรัพยากรบุคคล', 'ดีไซน์'];

  const filteredExperts = selectedCategory === 'ทั้งหมด' 
    ? mockExperts 
    : mockExperts.filter(expert => expert.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">ผู้เชี่ยวชาญของเรา</h1>
          <p className="text-xl">พบกับผู้เชี่ยวชาญคุณภาพจากหลากหลายสาขา พร้อมช่วยแก้ปัญหาของคุณ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">เลือกหมวดหมู่:</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary-600">{mockExperts.length}</div>
            <div className="text-gray-600 mt-1">ผู้เชี่ยวชาญ</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary-600">15+</div>
            <div className="text-gray-600 mt-1">ปีประสบการณ์เฉลี่ย</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary-600">4.9</div>
            <div className="text-gray-600 mt-1">คะแนนเฉลี่ย</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl font-bold text-primary-600">300+</div>
            <div className="text-gray-600 mt-1">โปรเจกต์สำเร็จ</div>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map(expert => (
            <div key={expert.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="text-6xl">{expert.image}</div>
                  <div className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                    <span className="text-yellow-300 mr-1">⭐</span>
                    <span className="font-semibold">{expert.rating}</span>
                    <span className="text-sm ml-1">({expert.reviews})</span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-bold">{expert.name}</h3>
                  <p className="text-primary-100 mt-1">{expert.title}</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Price & Experience */}
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">
                      ฿{expert.hourlyRate.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">ต่อชั่วโมง</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{expert.yearsExperience}</div>
                    <div className="text-sm text-gray-500">ปีประสบการณ์</div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{expert.bio}</p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">ความเชี่ยวชาญ:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                    {expert.skills.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        +{expert.skills.length - 3} อื่นๆ
                      </span>
                    )}
                  </div>
                </div>

                {/* Education */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-1">การศึกษา:</h4>
                  <p className="text-xs text-gray-600">{expert.education}</p>
                </div>

                {/* Companies */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">ประสบการณ์ทำงานที่:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.companies.map((company, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements Preview */}
                <div className="mb-4">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">ผลงานโดดเด่น:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {expert.achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        <span className="line-clamp-2">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                  <Link
                    to={`/expert/${expert.id}`}
                    className="text-center py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    ดูโปรไฟล์
                  </Link>
                  <Link
                    to={`/seeker/create-consultation?expertId=${expert.id}`}
                    className="text-center py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                  >
                    ติดต่อเลย
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">ไม่พบผู้เชี่ยวชาญที่ต้องการ?</h2>
          <p className="text-gray-600 mb-6">
            ลองใช้ระบบ AI Matching ของเรา บอกปัญหาของคุณ แล้ว AI จะหาผู้เชี่ยวชาญที่เหมาะสมให้อัตโนมัติ
          </p>
          <Link
            to="/register"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            ลองใช้ AI Matching ฟรี
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpertsShowcase;
