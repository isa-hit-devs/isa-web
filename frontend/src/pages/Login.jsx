import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getErrorMessage } from '../utils/helpers';
import Spinner from '../components/common/Spinner';
import { ShieldCheck, LogIn, Lock, ArrowLeft, AlertCircle } from 'lucide-react';

const Login = () => {
  const [authError, setAuthError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { loginWithGoogle, isAuthenticated, isAdmin, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || (isAdmin ? '/admin' : '/');

  // Handle successful Google Token reception from client OAuth SDK
  const handleGoogleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      setAuthError('Google ID token was not returned. Please try again.');
      return;
    }

    setAuthError(null);
    setIsSubmitting(true);

    try {
      // Send token directly to backend POST /api/auth/google
      const result = await loginWithGoogle(idToken);
      showToast(`Welcome back, ${result.user.name || 'User'}!`, 'success');
      
      // Always redirect to public home page '/' for every user upon successful login
      navigate('/', { replace: true });
    } catch (err) {
      const msg = getErrorMessage(err, 'Authentication failed. Please try again.');
      setAuthError(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleError = () => {
    const msg = 'Google Sign-In was cancelled or failed to initialize.';
    setAuthError(msg);
    showToast(msg, 'error');
  };

  // If already authenticated
  if (isAuthenticated && !isSubmitting) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-100 shadow-soft text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Currently Logged In
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            You are signed in as <span className="font-semibold text-slate-700">{user?.name}</span> ({user?.email})
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {isAdmin ? (
              <button
                onClick={() => navigate('/admin')}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-isa-navy text-white hover:bg-isa-slate transition-all shadow-sm"
              >
                Go to Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm"
              >
                Return to Homepage
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-soft-lg text-center">
          
          {/* Logo & Header */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-isa-navy to-blue-600 text-white flex items-center justify-center font-display font-extrabold text-2xl mx-auto mb-5 shadow-md">
            ISA
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Sign in with your authorized Google account to access chapter features and administration.
          </p>

          {/* Error Banner */}
          {authError && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-3 text-left">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Google Login Component */}
          <div className="mt-8">
            {isSubmitting ? (
              <div className="py-6 flex flex-col items-center justify-center">
                <Spinner size="md" message="Authenticating with backend..." />
              </div>
            ) : (
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  theme="outline"
                  size="large"
                  shape="pill"
                  width="100%"
                  text="signin_with"
                />
              </div>
            )}
          </div>

          {/* Security Note */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure authentication verified via backend</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;
