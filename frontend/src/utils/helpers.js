import { POST_CATEGORIES, CATEGORY_META } from './constants';

export const slugToCategory = (slug) => {
  if (!slug) return null;
  const match = Object.entries(CATEGORY_META).find(
    ([, meta]) => meta.slug.toLowerCase() === slug.toLowerCase()
  );
  return match ? match[0] : null;
};

export const categoryToSlug = (category) => {
  if (!category || !CATEGORY_META[category]) return 'blogs';
  return CATEGORY_META[category].slug;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(d);
  } catch {
    return '';
  }
};

export const truncateText = (text, maxLength = 120) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export const getErrorMessage = (error, defaultMessage = 'An unexpected error occurred.') => {
  if (!error) return defaultMessage;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data?.error) return error.response.data.error;
  if (error.message) return error.message;
  return defaultMessage;
};
