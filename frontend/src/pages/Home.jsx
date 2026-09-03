import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/hero/HeroSection';
import PostCard from '../components/cards/PostCard';
import Spinner from '../components/common/Spinner';
import postService from '../services/postService';
import { POST_CATEGORIES, CATEGORY_META, CHAPTER_INFO } from '../utils/constants';
import { ArrowRight, BookOpen, Layers, Award, Users, Globe2, Sparkles } from 'lucide-react';

const Home = () => {
  // Map of category -> { posts: [], loading: true, error: null }
  const [categoryPosts, setCategoryPosts] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchHomePosts = async () => {
      const results = {};
      
      // Fetch 6 posts per category using backend category filtering
      await Promise.all(
        POST_CATEGORIES.map(async (cat) => {
          try {
            const data = await postService.getPosts({ category: cat, page: 1, limit: 6 });
            results[cat] = {
              posts: data.posts || [],
              total: data.total || 0,
              error: null,
            };
          } catch (err) {
            results[cat] = {
              posts: [],
              total: 0,
              error: 'Failed to load posts',
            };
          }
        })
      );

      if (isMounted) {
        setCategoryPosts(results);
        setInitialLoading(false);
      }
    };

    fetchHomePosts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Chapter Overview & Highlights */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100/80 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-600 text-white shadow-sm flex-shrink-0">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Global Affiliation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Chartered under ISA (International Society of Automation) District 14 and Instrument Society of India (ISOI).
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100/80 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-sm flex-shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Weekly Knowledge Series
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Regular technical publications, tech photography, project logs, thought leadership, and weekly quizzes.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-cyan-50/50 border border-cyan-100/80 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-cyan-600 text-white shadow-sm flex-shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Hands-On Excellence
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                  Workshops, PLC programming bootcamps, sensor interfacing, and national-level hackathons.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grouped By Category Showcase */}
      <section id="posts-showcase" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          
          {initialLoading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <Spinner size="lg" message="Loading chapter publications & posts..." />
            </div>
          ) : (
            POST_CATEGORIES.map((category) => {
              const meta = CATEGORY_META[category] || {
                slug: 'blogs',
                label: category,
                description: '',
                color: 'bg-blue-50 text-blue-700',
              };
              const catData = categoryPosts[category] || { posts: [], total: 0 };
              const posts = catData.posts || [];

              return (
                <div key={category} className="scroll-mt-24">
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${meta.color}`}>
                          {category}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {catData.total} {catData.total === 1 ? 'publication' : 'publications'}
                        </span>
                      </div>
                      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                        {category}
                      </h2>
                      {meta.description && (
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                          {meta.description}
                        </p>
                      )}
                    </div>

                    <Link
                      to={`/category/${meta.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors whitespace-nowrap group self-start sm:self-auto"
                    >
                      <span>View all {category}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Posts Grid (up to 6 posts) */}
                  <div className="mt-8">
                    {posts.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {posts.map((post) => (
                          <PostCard key={post._id} post={post} />
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-200 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                          No posts published in {category} yet.
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Stay tuned for upcoming updates!
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

        </div>
      </section>

      {/* Meet Team & Join CTA */}
      <section className="bg-gradient-to-br from-isa-navy to-isa-dark text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/20 mb-4">
            HIT Student Chapter
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight">
            Connect with the Next Generation of Automation Engineers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Discover our executive team, explore alumni journeys, or participate in upcoming workshops.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/members"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-soft transition-all"
            >
              Meet Our Team
            </Link>
            <Link
              to="/alumni"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              Alumni Directory
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
