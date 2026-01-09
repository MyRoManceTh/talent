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
    <nav className="bg-white shadow-lg border-b-4 border-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">T</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary-600">TALENTER</span>
                <span className="text-xs text-gray-500 -mt-1">Expert Connect</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  เข้าสู่ระบบ
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium">
                  สมัครสมาชิก
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/dashboard' : '/seeker/dashboard'}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  หน้าหลัก
                </Link>
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/profile' : '/seeker/profile'}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  โปรไฟล์
                </Link>
                <Link
                  to={user?.role === 'EXPERT' ? '/expert/consultations' : '/seeker/consultations'}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  คำขอคำปรึกษา
                </Link>
                {user?.role === 'SEEKER' && (
                  <Link
                    to="/briefs"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Briefs
                  </Link>
                )}
                <div className="flex items-center space-x-3 pl-4 border-l-2 border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="text-sm text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 py-1 rounded-lg transition-colors"
                  >
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
