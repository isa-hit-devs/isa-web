import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state safely from localStorage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('isa_auth_token');
      const savedUser = localStorage.getItem('isa_user');
      
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch {
      localStorage.removeItem('isa_auth_token');
      localStorage.removeItem('isa_user');
    } finally {
      setLoading(false);
    }

    // Listen for unauthorized events emitted by API interceptor
    const handleUnauthorized = () => {
      setUser(null);
      setToken(null);
    };

    window.addEventListener('isa_auth_unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('isa_auth_unauthorized', handleUnauthorized);
    };
  }, []);

  /**
   * Authenticate with Google ID token through the backend
   * @param {string} idToken Google ID token from OAuth
   */
  const loginWithGoogle = async (idToken) => {
    setLoading(true);
    try {
      const data = await authService.googleLogin(idToken);
      
      if (data && data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        
        // Store session token and non-sensitive user profile in localStorage
        localStorage.setItem('isa_auth_token', data.token);
        localStorage.setItem('isa_user', JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user and clear all stored credentials
   */
  const logout = () => {
    localStorage.removeItem('isa_auth_token');
    localStorage.removeItem('isa_user');
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = isAuthenticated && user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
