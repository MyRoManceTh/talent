import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-600">Expert Connect</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  เข้าสู่ระบบ
                </Link>
                <Link to="/register" className="btn-primary">
                  สมัครสมาชิก
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  หน้าหลัก
                </Link>
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/profile' : '/seeker/profile'}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  โปรไฟล์
                </Link>
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/consultations' : '/seeker/consultations'}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  คำขอคำปรึกษา
                </Link>
                {user?.role === 'SEEKER' && (
                  <Link
                    to="/briefs"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    My Briefs
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-700">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <button onClick={handleLogout} className="text-sm text-gray-700 hover:text-primary-600">
                    ออกจากระบบ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
