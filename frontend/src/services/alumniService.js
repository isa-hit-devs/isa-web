import api from './api';

export const alumniService = {
  /**
   * Fetch public paginated alumni
   * @param {Object} params
   * @param {number} [params.page=1]
   * @param {number} [params.limit=50]
   */
  getAlumni: async ({ page = 1, limit = 50 } = {}) => {
    const response = await api.get('/alumni', {
      params: { page, limit },
    });
    return response.data;
  },

  /**
   * Create an alumni profile (Admin only)
   * @param {FormData} formData
   */
  createAlumni: async (formData) => {
    const response = await api.post('/admin/alumni', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Update an alumni profile (Admin only)
   * @param {string} id
   * @param {FormData} formData
   */
  updateAlumni: async (id, formData) => {
    const response = await api.put(`/admin/alumni/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Delete an alumni profile (Admin only)
   * @param {string} id
   */
  deleteAlumni: async (id) => {
    const response = await api.delete(`/admin/alumni/${id}`);
    return response.data;
  },
};

export default alumniService;
