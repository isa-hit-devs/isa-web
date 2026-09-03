import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';
import { formatDate, truncateText } from '../../utils/helpers';
import { CATEGORY_META } from '../../utils/constants';

const PostCard = ({ post }) => {
  if (!post) return null;

  const { _id, title, image, category, description, createdAt } = post;
  const meta = CATEGORY_META[category] || {
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    slug: 'blogs',
  };

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Image container */}
      <Link
        to={`/posts/${_id}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <img
          src={image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'}
          alt={title || 'ISA Post Image'}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold border backdrop-blur-md shadow-sm ${meta.color}`}
          >
            {category || 'General'}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {createdAt && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(createdAt)}</span>
            </div>
          )}

          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            <Link to={`/posts/${_id}`}>
              {title}
            </Link>
          </h3>

          {description && (
            <p className="mt-2 text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {truncateText(description, 100)}
            </p>
          )}
        </div>

        <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between">
          <Link
            to={`/posts/${_id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Read Details</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
