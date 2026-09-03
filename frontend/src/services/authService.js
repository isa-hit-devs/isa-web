import api from './api';

export const authService = {
  /**
   * Authenticates user via Google OAuth ID token
   * @param {string} idToken Google ID token received from OAuth
   * @returns {Promise<{ message: string, token: string, user: { id: string, name: string, email: string, role: string } }>}
   */
  googleLogin: async (idToken) => {
    const response = await api.post('/auth/google', { idToken });
    return response.data;
  },
};

export default authService;
