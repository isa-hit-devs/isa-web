import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PostCard from '../components/cards/PostCard';
import Pagination from '../components/common/Pagination';
import Spinner from '../components/common/Spinner';
import postService from '../services/postService';
import { slugToCategory } from '../utils/helpers';
import { CATEGORY_META, POST_CATEGORIES } from '../utils/constants';
import { BookOpen, ArrowLeft, Layers } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams();
  const categoryName = slugToCategory(slug);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const meta = categoryName ? CATEGORY_META[categoryName] : null;

  useEffect(() => {
    setPage(1);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;

    const fetchCategoryPosts = async () => {
      if (!categoryName) {
        setError('Category not found');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await postService.getPosts({
          category: categoryName,
          page,
          limit: 12,
        });

        if (isMounted) {
          setPosts(data.posts || []);
          setTotal(data.total || 0);
          setTotalPages(data.totalPages || 1);
          setPage(data.page || 1);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load posts for this category.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCategoryPosts();

    return () => {
      isMounted = false;
    };
  }, [categoryName, page]);

  if (!categoryName) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200 text-center shadow-soft">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Category Not Found
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            The category you are looking for does not exist in our chapter archives.
          </p>
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

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Category Hero Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-100 shadow-soft relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-3 ${
                meta?.color || 'bg-blue-50 text-blue-700 border-blue-200'
              }`}
            >
              {categoryName}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
              {categoryName}
            </h1>
            {meta?.description && (
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                {meta.description}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-slate-400">
              <span>{total} Total Publications</span>
              <span>•</span>
              <span>ISA & ISOI HIT Student Chapter</span>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-12">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Spinner size="lg" message={`Loading ${categoryName} posts...`} />
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-md mx-auto">
              <p className="text-sm font-medium text-rose-800">{error}</p>
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </>
          ) : (
            <div className="p-16 rounded-2xl bg-white border border-dashed border-slate-200 text-center max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-700">No posts found</p>
              <p className="text-xs text-slate-500 mt-1">
                There are currently no publications listed under {categoryName}.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CategoryPage;
