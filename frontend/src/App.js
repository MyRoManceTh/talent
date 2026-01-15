import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ExpertsShowcase from './pages/ExpertsShowcase';
import ExpertDetailPage from './pages/ExpertDetailPage';
import ExpertDashboard from './pages/expert/ExpertDashboard';
import ExpertProfile from './pages/expert/ExpertProfile';
import ExpertProfileView from './pages/expert/ExpertProfileView';
import ExpertConsultations from './pages/expert/ExpertConsultations';
import SeekerDashboard from './pages/seeker/SeekerDashboard';
import SeekerProfile from './pages/seeker/SeekerProfile';
import CreateConsultation from './pages/seeker/CreateConsultation';
import ViewMatches from './pages/seeker/ViewMatches';
import MyConsultations from './pages/seeker/MyConsultations';
import MyBriefs from './pages/seeker/MyBriefs';
import CreateBrief from './pages/seeker/CreateBrief';
import EditBrief from './pages/seeker/EditBrief';
import BriefRecommendations from './pages/seeker/BriefRecommendations';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageExperts from './pages/admin/ManageExperts';

// Talenter Profile
import TalenterProfile from './pages/TalenterProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/experts" element={<ExpertsShowcase />} />
            <Route path="/expert/:id" element={<ExpertDetailPage />} />
            <Route path="/talenter-profile" element={<TalenterProfile />} />

            {/* Expert Routes */}
            <Route
              path="/expert/dashboard"
              element={
                <PrivateRoute role="EXPERT">
                  <ExpertDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/expert/profile"
              element={
                <PrivateRoute role="EXPERT">
                  <ExpertProfileView />
                </PrivateRoute>
              }
            />
            <Route
              path="/expert/profile/edit"
              element={
                <PrivateRoute role="EXPERT">
                  <ExpertProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/expert/consultations"
              element={
                <PrivateRoute role="EXPERT">
                  <ExpertConsultations />
                </PrivateRoute>
              }
            />

            {/* Seeker Routes */}
            <Route
              path="/seeker/dashboard"
              element={
                <PrivateRoute role="SEEKER">
                  <SeekerDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/seeker/profile"
              element={
                <PrivateRoute role="SEEKER">
                  <SeekerProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/seeker/create-consultation"
              element={
                <PrivateRoute role="SEEKER">
                  <CreateConsultation />
                </PrivateRoute>
              }
            />
            <Route
              path="/seeker/consultations"
              element={
                <PrivateRoute role="SEEKER">
                  <MyConsultations />
                </PrivateRoute>
              }
            />
            <Route
              path="/seeker/matches/:consultationId"
              element={
                <PrivateRoute role="SEEKER">
                  <ViewMatches />
                </PrivateRoute>
              }
            />
            <Route
              path="/briefs"
              element={
                <PrivateRoute role="SEEKER">
                  <MyBriefs />
                </PrivateRoute>
              }
            />
            <Route
              path="/briefs/create"
              element={
                <PrivateRoute role="SEEKER">
                  <CreateBrief />
                </PrivateRoute>
              }
            />
            <Route
              path="/briefs/:id/edit"
              element={
                <PrivateRoute role="SEEKER">
                  <EditBrief />
                </PrivateRoute>
              }
            />
            <Route
              path="/briefs/:id/recommendations"
              element={
                <PrivateRoute role="SEEKER">
                  <BriefRecommendations />
                </PrivateRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute role="ADMIN">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute role="ADMIN">
                  <ManageUsers />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/experts"
              element={
                <PrivateRoute role="ADMIN">
                  <ManageExperts />
                </PrivateRoute>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
