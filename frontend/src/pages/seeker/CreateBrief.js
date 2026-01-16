import React from 'react';
import IntakeBriefForm from '../../components/IntakeBriefForm';

const CreateBrief = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">สร้าง Project Brief</h1>
        <p className="text-gray-600">
          กรอกรายละเอียดโครงการเพื่อให้ระบบแนะนำผู้เชี่ยวชาญที่เหมาะสมที่สุด
        </p>
      </div>

      <IntakeBriefForm />
    </div>
  );
};

export default CreateBrief;
