import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/Home';
import Members from './pages/Members';
import Alumni from './pages/Alumni';
import Events from './pages/Events';
import CategoryPage from './pages/CategoryPage';
import PostDetails from './pages/PostDetails';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Admin Components & Pages
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import DashboardHome from './pages/admin/DashboardHome';
import ManagePosts from './pages/admin/ManagePosts';
import ManageMembers from './pages/admin/ManageMembers';
import ManageAlumni from './pages/admin/ManageAlumni';
import ManageEvents from './pages/admin/ManageEvents';

// Public Layout Wrapper with Navbar & Footer
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  // Public Google Client ID from environment or placeholder (never secret)
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes with Navbar and Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path="/alumni" element={<Alumni />} />
                <Route path="/events" element={<Events />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="posts" element={<ManagePosts />} />
                <Route path="members" element={<ManageMembers />} />
                <Route path="alumni" element={<ManageAlumni />} />
                <Route path="events" element={<ManageEvents />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
