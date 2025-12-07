import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ExpertDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mockup Data ผู้เชี่ยวชาญ (เดียวกับใน ExpertsShowcase)
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
      skills: ['Digital Strategy', 'Change Management', 'Cloud Computing', 'AI/ML', 'Agile Transformation', 'Data Analytics'],
      bio: 'อดีต CTO ของบริษัทเทคโนโลยีชั้นนำ มีประสบการณ์ในการนำพาองค์กรสู่ยุคดิจิทัล มากกว่า 15 ปี ให้คำปรึกษาแก่องค์กรชั้นนำทั้งในและต่างประเทศ เชี่ยวชาญการวางแผนกลยุทธ์ดิจิทัล การบริหารจัดการการเปลี่ยนแปลง และการนำเทคโนโลยีใหม่ๆ มาใช้ในองค์กร',
      education: 'ปริญญาเอก วิทยาการคอมพิวเตอร์ จุฬาลงกรณ์มหาวิทยาลัย',
      companies: ['LINE Thailand', 'Agoda', 'SCB', 'True Digital Park'],
      achievements: [
        'นำทีมพัฒนาระบบ AI Chatbot ที่มีผู้ใช้มากกว่า 5 ล้านคน',
        'ลดต้นทุน IT ลง 40% ผ่านการ Cloud Migration',
        'วิทยากรในงาน Tech Conference กว่า 50 ครั้ง',
        'ที่ปรึกษา Digital Transformation ให้กับ Fortune 500 Companies',
        'ผู้เขียนบทความด้านเทคโนโลยีที่ได้รับความนิยมสูง'
      ],
      certifications: [
        'AWS Solutions Architect Professional',
        'Google Cloud Professional Architect',
        'Certified Scrum Master (CSM)',
        'TOGAF 9 Certified'
      ],
      languages: ['ไทย (Native)', 'English (Fluent)', 'Japanese (Business Level)'],
      availability: 'รับงานได้ทันที - 10-15 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 2 ชั่วโมง',
      consultationTypes: [
        'Digital Strategy Planning (5-10 sessions)',
        'Technology Assessment & Roadmap (3-5 sessions)',
        'Cloud Migration Consulting (10-20 hours)',
        'AI/ML Implementation Advisory (15-30 hours)',
        'One-on-one Mentoring (per hour)'
      ],
      testimonials: [
        {
          name: 'คุณสมชัย ผู้บริหาร',
          company: 'ABC Corporation',
          text: 'ดร. สมชายช่วยเราวางแผน Digital Transformation ที่ชัดเจน ทำให้ประหยัดต้นทุนได้มาก และเพิ่มประสิทธิภาพการทำงานอย่างเห็นได้ชัด',
          rating: 5
        },
        {
          name: 'คุณนิตยา CEO',
          company: 'XYZ Startup',
          text: 'เป็นที่ปรึกษาที่ยอดเยี่ยม ให้คำแนะนำที่เป็นประโยชน์มากและสามารถนำไปใช้งานจริงได้ทันที แนะนำเลยครับ',
          rating: 5
        }
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
      skills: ['Digital Marketing', 'SEO/SEM', 'Social Media', 'E-commerce', 'Content Strategy', 'Marketing Analytics'],
      bio: 'ผู้เชี่ยวชาญด้านการตลาดดิจิทัล ที่ปรึกษาให้กับ SME และ Startup มากกว่า 50 ราย เชี่ยวชาญการวางกลยุทธ์การตลาดออนไลน์ การเพิ่มยอดขาย และการสร้าง Brand Awareness ผ่านช่องทางดิจิทัลต่างๆ',
      education: 'ปริญญาโท การตลาด มหาวิทยาลัยธรรมศาสตร์',
      companies: ['Central Group', 'Lazada', 'Shopee', 'JD Central'],
      achievements: [
        'เพิ่มยอดขายออนไลน์ให้ลูกค้าเฉลี่ย 250%',
        'สร้าง Brand Awareness เพิ่มขึ้น 5 เท่า ใน 6 เดือน',
        'ผู้เขียนบล็อก Marketing ที่มีผู้ติดตาม 100K+',
        'วิทยากรอบรมหลักสูตร Digital Marketing กว่า 80 รุ่น'
      ],
      certifications: [
        'Google Ads Certified',
        'Facebook Blueprint Certified',
        'HubSpot Content Marketing Certified'
      ],
      languages: ['ไทย (Native)', 'English (Fluent)'],
      availability: 'รับงานได้ - 15-20 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 4 ชั่วโมง',
      consultationTypes: [
        'Digital Marketing Strategy (3-6 sessions)',
        'SEO/SEM Campaign Setup (5-10 hours)',
        'Social Media Strategy (4-8 sessions)',
        'E-commerce Growth Consulting (10-15 hours)'
      ],
      testimonials: [
        {
          name: 'คุณประยุทธ เจ้าของธุรกิจ',
          company: 'Fashion Brand',
          text: 'คุณนิภาช่วยเราวางแผนการตลาดออนไลน์ที่ได้ผลจริง ยอดขายเพิ่มขึ้นอย่างต่อเนื่อง',
          rating: 5
        }
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
      skills: ['Business Strategy', 'Innovation Management', 'Startup Mentoring', 'Design Thinking', 'Business Model Canvas', 'Corporate Innovation'],
      bio: 'อาจารย์มหาวิทยาลัย และที่ปรึกษาองค์กรชั้นนำ เชี่ยวชาญด้านนวัตกรรมและกลยุทธ์ธุรกิจ มีประสบการณ์ให้คำปรึกษาแก่องค์กรทั้งขนาดใหญ่และ Startup ช่วยสร้างนวัตกรรมและพัฒนาโมเดลธุรกิจที่ยั่งยืน',
      education: 'ปริญญาเอก บริหารธุรกิจ Stanford University',
      companies: ['CP Group', 'PTT', 'สภาอุตสาหกรรม', 'DEPA'],
      achievements: [
        'ที่ปรึกษา Corporate Innovation ให้ Fortune 500 Companies',
        'Mentor ให้ Startup มากกว่า 100 ทีม',
        'ผู้แต่งหนังสือ Business Strategy ขายดี 3 เล่ม',
        'ได้รับรางวัล Outstanding Innovation Mentor Award',
        'วิทยากรพิเศษในมหาวิทยาลัยชั้นนำทั่วโลก'
      ],
      certifications: [
        'Certified Innovation Professional (CIP)',
        'Design Thinking Facilitator',
        'Business Model Innovation Certified'
      ],
      languages: ['ไทย (Native)', 'English (Native Level)', 'Chinese (Conversational)'],
      availability: 'จำกัดที่นั่ง - 5-8 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 24 ชั่วโมง',
      consultationTypes: [
        'Business Strategy Workshop (2-3 days)',
        'Innovation Management Program (8-12 sessions)',
        'Startup Mentoring Package (3 months)',
        'Design Thinking Workshop (1-2 days)'
      ],
      testimonials: [
        {
          name: 'คุณวิชัย CEO',
          company: 'Tech Startup',
          text: 'ผศ.ดร.อรรถพลเป็นพี่เลี้ยงที่ดีเยี่ยม ให้คำแนะนำที่มีคุณค่ามากและช่วยให้ธุรกิจเราเติบโตอย่างมั่นคง',
          rating: 5
        },
        {
          name: 'คุณสุภาพร ผู้จัดการ',
          company: 'Manufacturing Co.',
          text: 'Workshop Innovation ที่จัดให้ช่วยเปลี่ยนความคิดของทีมและนำไปสู่นวัตกรรมใหม่ๆ มากมาย',
          rating: 5
        }
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
      skills: ['Financial Planning', 'Accounting', 'Tax Planning', 'Fundraising', 'M&A Advisory', 'Budgeting & Forecasting'],
      bio: 'อดีต CFO บริษัทจดทะเบียน ให้คำปรึกษาด้านการเงินและการบัญชีให้กับองค์กรทุกขนาด เชี่ยวชาญการวางแผนทางการเงิน การระดมทุน และการควบรวมกิจการ',
      education: 'ปริญญาโท การเงิน จุฬาลงกรณ์มหาวิทยาลัย + CPA, CFA',
      companies: ['ธนาคารกสิกรไทย', 'บมจ. กรุงเทพประกันภัย', 'Startup Ventures', 'PTTEP'],
      achievements: [
        'ช่วย Startup ระดมทุนได้มากกว่า 500 ล้านบาท',
        'ปรับโครงสร้างทางการเงินให้ SME มากกว่า 30 ราย',
        'วิทยากรสอนหลักสูตร CFO Certification',
        'ที่ปรึกษา M&A Deals มูลค่ารวมกว่า 2,000 ล้านบาท'
      ],
      certifications: [
        'Certified Public Accountant (CPA)',
        'Chartered Financial Analyst (CFA) Level III',
        'Certified Financial Planner (CFP)'
      ],
      languages: ['ไทย (Native)', 'English (Fluent)'],
      availability: 'รับงานได้ - 10-12 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 3 ชั่วโมง',
      consultationTypes: [
        'Financial Health Check (1-2 sessions)',
        'Fundraising Strategy (5-8 sessions)',
        'CFO as a Service (monthly retainer)',
        'Tax Planning Consultation (2-4 hours)'
      ],
      testimonials: [
        {
          name: 'คุณธนา ผู้ก่อตั้ง',
          company: 'Fintech Startup',
          text: 'คุณสุรเดชช่วยเราได้มาก ตั้งแต่การวางแผนการเงินจนถึงการระดมทุนสำเร็จ',
          rating: 5
        }
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
      skills: ['HR Strategy', 'Talent Management', 'Culture Transformation', 'Leadership Development', 'Performance Management', 'Employee Engagement'],
      bio: 'ผู้เชี่ยวชาญด้าน HR Transformation ช่วยองค์กรสร้างวัฒนธรรมองค์กรและพัฒนาบุคลากร มีประสบการณ์ในการปรับเปลี่ยน HR System และพัฒนาทีมให้มีประสิทธิภาพสูงสุด',
      education: 'ปริญญาโท จิตวิทยาอุตสาหกรรมและองค์การ มหาวิทยาลัยมหิดล',
      companies: ['Google Thailand', 'Unilever', 'True Corporation', 'AIS'],
      achievements: [
        'ออกแบบ HR Transformation ให้องค์กรขนาดใหญ่ 5 แห่ง',
        'พัฒนา Leadership Program ที่ผ่านการฝึกอบรม 1,000+ คน',
        'ลดอัตราการลาออก (Turnover) เฉลี่ย 35%',
        'สร้าง Culture of Innovation ให้กับองค์กรชั้นนำ'
      ],
      certifications: [
        'SHRM-SCP (Senior Certified Professional)',
        'ICF Certified Coach (ACC)',
        'DISC Certified Trainer'
      ],
      languages: ['ไทย (Native)', 'English (Fluent)'],
      availability: 'รับงานได้ - 12-15 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 6 ชั่วโมง',
      consultationTypes: [
        'HR Strategy Consulting (4-8 sessions)',
        'Culture Assessment & Design (10-15 hours)',
        'Leadership Coaching (per session)',
        'Talent Management System Design (8-12 sessions)'
      ],
      testimonials: [
        {
          name: 'คุณรัตนา HR Director',
          company: 'Retail Chain',
          text: 'คุณพิมพ์ใจช่วยเราปรับ HR System ใหม่ทั้งหมด พนักงานมีความสุขและมี Engagement สูงขึ้นมาก',
          rating: 5
        }
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
      skills: ['System Architecture', 'Microservices', 'DevOps', 'Team Leadership', 'Cloud Native', 'API Design'],
      bio: 'Software Architect มากประสบการณ์ เชี่ยวชาญการออกแบบระบบขนาดใหญ่และนำทีม Dev มีประสบการณ์สร้างระบบที่รองรับผู้ใช้หลายล้านคน',
      education: 'ปริญญาตรี วิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเกษตรศาสตร์',
      companies: ['Grab', 'Shopee', 'Agoda', 'LINE MAN'],
      achievements: [
        'ออกแบบ System Architecture ที่รองรับผู้ใช้ 10M+ คน',
        'นำทีม Dev 50+ คน พัฒนา Product สำเร็จมากกว่า 20 โปรเจกต์',
        'Speaker ในงาน DevOps และ Software Architecture Conference',
        'ลด Infrastructure Cost ลง 60% ด้วย Cloud Optimization'
      ],
      certifications: [
        'AWS Certified Solutions Architect',
        'Kubernetes Certified Administrator (CKA)',
        'Google Cloud Professional Architect'
      ],
      languages: ['ไทย (Native)', 'English (Fluent)'],
      availability: 'รับงานได้ - 15-20 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 2 ชั่วโมง',
      consultationTypes: [
        'System Architecture Review (3-5 sessions)',
        'Microservices Migration (10-20 hours)',
        'DevOps Implementation (15-25 hours)',
        'Technical Team Mentoring (per month)'
      ],
      testimonials: [
        {
          name: 'คุณสมหมาย CTO',
          company: 'Food Delivery Startup',
          text: 'คุณวรพจน์ช่วยเราออกแบบ Architecture ที่ Scale ได้ดี ระบบรองรับ Traffic สูงได้อย่างเสถียร',
          rating: 5
        }
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
      skills: ['UX Research', 'UI Design', 'Design Thinking', 'Prototyping', 'User Testing', 'Design System'],
      bio: 'UX/UI Designer ที่มีผลงานได้รับรางวัลระดับสากล ที่ปรึกษาด้าน Product Design เชี่ยวชาญการออกแบบประสบการณ์ผู้ใช้ที่ดีและสวยงาม',
      education: 'ปริญญาโท Interaction Design, Carnegie Mellon University',
      companies: ['LINE', 'Airbnb', 'Booking.com', 'Shopee'],
      achievements: [
        'ออกแบบ App ที่ได้รับรางวัล Design Award 3 ปีซ้อน',
        'เพิ่ม User Engagement เฉลี่ย 180%',
        'ให้คำปรึกษา UX/UI มากกว่า 40 โปรเจกต์',
        'สร้าง Design System สำหรับองค์กรชั้นนำ'
      ],
      certifications: [
        'Google UX Design Professional Certificate',
        'Nielsen Norman Group UX Certified',
        'Certified Design Thinking Practitioner'
      ],
      languages: ['ไทย (Native)', 'English (Fluent)'],
      availability: 'รับงานได้ - 10-15 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 4 ชั่วโมง',
      consultationTypes: [
        'UX Audit & Recommendations (2-4 sessions)',
        'Complete Product Design (20-40 hours)',
        'Design System Creation (15-30 hours)',
        'UX Research & Testing (per project)'
      ],
      testimonials: [
        {
          name: 'คุณภัทรา Product Manager',
          company: 'E-commerce Platform',
          text: 'คุณสุวรรณาออกแบบ UX ให้เราได้สวยงามและใช้งานง่าย Conversion Rate เพิ่มขึ้นเยอะมาก',
          rating: 5
        }
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
      skills: ['Machine Learning', 'Deep Learning', 'Big Data', 'AI Strategy', 'Data Engineering', 'MLOps'],
      bio: 'ผู้เชี่ยวชาญด้าน Data Science และ AI มีประสบการณ์สร้าง AI Solutions ให้องค์กรชั้นนำ เชี่ยวชาญทั้ง Theory และ Practical Implementation',
      education: 'ปริญญาเอก Computer Science (AI), MIT',
      companies: ['Google', 'Amazon', 'Kasikorn Bank', 'Siam Commercial Bank'],
      achievements: [
        'พัฒนา AI Model ที่เพิ่มรายได้ให้ลูกค้า 150M+',
        'สร้าง Recommendation System ที่มี Accuracy 95%',
        'ผู้ร่วมวิจัย Paper ที่ได้รับการอ้างอิงมากกว่า 500 ครั้ง',
        'ที่ปรึกษา AI Strategy ให้กับองค์กรชั้นนำระดับโลก'
      ],
      certifications: [
        'TensorFlow Developer Certificate',
        'AWS Certified Machine Learning',
        'Google Cloud Professional ML Engineer'
      ],
      languages: ['ไทย (Native)', 'English (Native Level)', 'Chinese (Business Level)'],
      availability: 'จำกัดที่นั่ง - 5-8 ชั่วโมง/สัปดาห์',
      responseTime: 'ภายใน 24 ชั่วโมง',
      consultationTypes: [
        'AI Strategy Consulting (4-6 sessions)',
        'ML Model Development (20-40 hours)',
        'Data Science Team Building (per project)',
        'AI/ML Workshop (2-3 days)'
      ],
      testimonials: [
        {
          name: 'คุณธนวัฒน์ VP Tech',
          company: 'Banking Sector',
          text: 'ดร. ประสิทธิ์ช่วยเราสร้าง AI Model ที่มีประสิทธิภาพสูง ช่วยเพิ่มรายได้และลดต้นทุนได้มาก',
          rating: 5
        },
        {
          name: 'คุณศิริพร Data Lead',
          company: 'Retail Company',
          text: 'Workshop ML ที่จัดให้ทีมทำให้เราเข้าใจ AI มากขึ้นและสามารถนำไปใช้งานได้จริง',
          rating: 5
        }
      ]
    }
  ];

  const expert = mockExperts.find(e => e.id === parseInt(id));

  if (!expert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">ไม่พบข้อมูลผู้เชี่ยวชาญ</h1>
          <Link to="/experts" className="text-primary-600 hover:underline">
            กลับไปหน้ารายชื่อผู้เชี่ยวชาญ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-white hover:text-primary-100 mb-4"
          >
            <span className="mr-2">←</span> กลับ
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-700 p-6 text-white text-center">
                <div className="text-8xl mb-4">{expert.image}</div>
                <h2 className="text-2xl font-bold">{expert.name}</h2>
                <p className="text-primary-100 mt-2">{expert.title}</p>
                <div className="flex items-center justify-center mt-4">
                  <span className="text-yellow-300 text-2xl mr-2">⭐</span>
                  <span className="text-3xl font-bold">{expert.rating}</span>
                  <span className="ml-2">({expert.reviews} รีวิว)</span>
                </div>
              </div>

              {/* Price & Availability */}
              <div className="p-6 border-b">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-primary-600">
                    ฿{expert.hourlyRate.toLocaleString()}
                  </div>
                  <div className="text-gray-600">ต่อชั่วโมง</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ประสบการณ์:</span>
                    <span className="font-semibold">{expert.yearsExperience} ปี</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">หมวดหมู่:</span>
                    <span className="font-semibold">{expert.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ตอบกลับภายใน:</span>
                    <span className="font-semibold text-green-600">{expert.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="p-6 space-y-3">
                <Link
                  to={`/seeker/create-consultation?expertId=${expert.id}`}
                  className="block w-full py-3 px-4 bg-primary-600 text-white text-center rounded-lg hover:bg-primary-700 transition-colors font-semibold"
                >
                  ติดต่อเลย
                </Link>
                <button className="block w-full py-3 px-4 border-2 border-primary-600 text-primary-600 text-center rounded-lg hover:bg-primary-50 transition-colors font-semibold">
                  บันทึกโปรไฟล์
                </button>
                <button className="block w-full py-3 px-4 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition-colors">
                  แชร์โปรไฟล์
                </button>
              </div>

              {/* Availability */}
              <div className="p-6 bg-gray-50 border-t">
                <h4 className="font-semibold text-gray-800 mb-2">ความพร้อมในการรับงาน:</h4>
                <p className="text-sm text-gray-600">{expert.availability}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">เกี่ยวกับ</h3>
              <p className="text-gray-700 leading-relaxed">{expert.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">ความเชี่ยวชาญ</h3>
              <div className="flex flex-wrap gap-3">
                {expert.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">การศึกษา</h3>
              <div className="flex items-start">
                <span className="text-3xl mr-4">🎓</span>
                <div>
                  <p className="text-lg font-semibold text-gray-800">{expert.education}</p>
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">ประสบการณ์ทำงาน</h3>
              <div className="flex flex-wrap gap-3">
                {expert.companies.map((company, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-lg text-gray-800 font-medium"
                  >
                    🏢 {company}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {expert.certifications && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">ใบรับรองวิชาชีพ</h3>
                <div className="space-y-2">
                  {expert.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-primary-600 mr-3">✓</span>
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4">ผลงานโดดเด่น</h3>
              <div className="space-y-3">
                {expert.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-primary-600 mr-3 mt-1">🏆</span>
                    <span className="text-gray-700">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            {expert.languages && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">ภาษาที่ใช้ได้</h3>
                <div className="flex flex-wrap gap-3">
                  {expert.languages.map((lang, index) => (
                    <span key={index} className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                      🌍 {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Consultation Types */}
            {expert.consultationTypes && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-4">บริการให้คำปรึกษา</h3>
                <div className="space-y-3">
                  {expert.consultationTypes.map((type, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <span className="text-primary-600 mr-3">📋</span>
                      <span className="text-gray-700">{type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials */}
            {expert.testimonials && expert.testimonials.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">รีวิวจากลูกค้า</h3>
                <div className="space-y-6">
                  {expert.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-6 py-2">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 italic mb-3">"{testimonial.text}"</p>
                      <div>
                        <p className="font-semibold text-gray-800">{testimonial.name}</p>
                        <p className="text-sm text-gray-600">{testimonial.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetailPage;
