import api from './api';

export const memberService = {
  /**
   * Fetch public paginated members
   * @param {Object} params
   * @param {number} [params.page=1]
   * @param {number} [params.limit=50]
   */
  getMembers: async ({ page = 1, limit = 50 } = {}) => {
    const response = await api.get('/members', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Create a new team member (Admin only)
   * @param {FormData} formData
   */
  createMember: async (formData) => {
    const response = await api.post('/admin/members', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Update an existing team member (Admin only)
   * @param {string} id
   * @param {FormData} formData
   */
  updateMember: async (id, formData) => {
    const response = await api.put(`/admin/members/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Delete a team member (Admin only)
   * @param {string} id
   */
  deleteMember: async (id) => {
    const response = await api.delete(`/admin/members/${id}`);
    return response.data;
  },
};

export default memberService;
