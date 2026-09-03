import api from './api';

export const postService = {
  /**
   * Fetch public paginated posts, optionally filtered by category
   * @param {Object} params
   * @param {string} [params.category] Category string (e.g. 'Tech Monday')
   * @param {number} [params.page=1] Page number
   * @param {number} [params.limit=10] Items per page (max 50)
   */
  getPosts: async ({ category, page = 1, limit = 10 } = {}) => {
    const params = { page, limit };
    if (category) {
      params.category = category;
    }
    const response = await api.get('/posts', { params });
    return response.data;
  },

  /**
   * Fetch a single post by ID
   * @param {string} id Post MongoDB ObjectId
   */
  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  /**
   * Create a new post (Admin only)
   * @param {FormData} formData FormData containing title, description, category, image
   */
  createPost: async (formData) => {
    const response = await api.post('/admin/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Update an existing post (Admin only)
   * @param {string} id
   * @param {FormData} formData
   */
  updatePost: async (id, formData) => {
    const response = await api.put(`/admin/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Delete a post (Admin only)
   * @param {string} id
   */
  deletePost: async (id) => {
    const response = await api.delete(`/admin/posts/${id}`);
    return response.data;
  },
};

export default postService;
