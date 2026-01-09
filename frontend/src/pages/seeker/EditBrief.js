import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IntakeBriefForm from '../../components/IntakeBriefForm';

const EditBrief = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrief();
  }, [id]);

  const fetchBrief = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/briefs/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch brief');
      }

      // Convert dates to YYYY-MM-DD format for input fields
      const briefData = {
        ...data.data,
        startDate: data.data.startDate ? new Date(data.data.startDate).toISOString().split('T')[0] : '',
        endDate: data.data.endDate ? new Date(data.data.endDate).toISOString().split('T')[0] : ''
      };

      setBrief(briefData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:5000/api/briefs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to update brief');
      }

      // Navigate to recommendations page
      navigate(`/briefs/${id}/recommendations`);
    } catch (err) {
      throw err;
    }
  };

  const handleCancel = () => {
    navigate('/briefs');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">เกิดข้อผิดพลาด</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
        <button
          onClick={() => navigate('/briefs')}
          className="mt-4 btn-secondary"
        >
          กลับไปหน้ารายการ Brief
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">แก้ไข Project Brief</h1>
        <p className="text-gray-600">
          อัปเดตรายละเอียดโครงการเพื่อรับคำแนะนำผู้เชี่ยวชาญที่ดีขึ้น
        </p>
      </div>

      {brief && (
        <IntakeBriefForm
          initialData={brief}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditBrief;
