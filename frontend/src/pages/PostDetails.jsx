import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/cards/PostCard';
import Spinner from '../components/common/Spinner';
import postService from '../services/postService';
import { formatDate } from '../utils/helpers';
import { CATEGORY_META } from '../utils/constants';
import { ArrowLeft, Calendar, Tag, Share2, BookOpen, AlertCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await postService.getPostById(id);
        if (isMounted) {
          const fetchedPost = data.post;
          setPost(fetchedPost);

          // Fetch related posts from same category
          if (fetchedPost?.category) {
            try {
              const relatedData = await postService.getPosts({
                category: fetchedPost.category,
                page: 1,
                limit: 3,
              });
              if (isMounted) {
                // Filter out current post
                setRelatedPosts(
                  (relatedData.posts || []).filter((p) => p._id !== id)
                );
              }
            } catch {
              // Ignore related posts fetch failure
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.status === 404
              ? 'The requested publication could not be found.'
              : 'Failed to load post. Please check the URL or try again later.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          url: window.location.href,
        });
      } catch {
        // Share cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Post link copied to clipboard!', 'success');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20">
        <Spinner size="lg" message="Loading publication details..." />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-soft">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Post Unavailable
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">{error}</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { title, description, image, category, createdAt } = post;
  const meta = CATEGORY_META[category] || {
    slug: 'blogs',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Actions Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to={meta.slug ? `/category/${meta.slug}` : '/'}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {category || 'Publications'}</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 shadow-sm transition-all"
            title="Share this article"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Post Container */}
        <article className="bg-white rounded-3xl border border-slate-100 shadow-soft overflow-hidden">
          {/* Header metadata */}
          <div className="p-6 sm:p-10 pb-6 border-b border-slate-50">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Link
                to={`/category/${meta.slug}`}
                className={`px-3 py-1 rounded-full text-xs font-bold border ${meta.color} hover:opacity-90 transition-opacity`}
              >
                {category}
              </Link>
              {createdAt && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(createdAt)}</span>
                </div>
              )}
            </div>

            <h1 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight tracking-tight">
              {title}
            </h1>
          </div>

          {/* Featured Image */}
          {image && (
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] bg-slate-100 overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80';
                }}
              />
            </div>
          )}

          {/* Description Content Body (Safely Rendered via standard JSX, no dangerouslySetInnerHTML) */}
          <div className="p-6 sm:p-10 text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line space-y-4">
            {description}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                More from {category}
              </h3>
              <Link
                to={`/category/${meta.slug}`}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <PostCard key={rPost._id} post={rPost} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PostDetails;
