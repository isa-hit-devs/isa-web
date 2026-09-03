import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import postService from '../../services/postService';
import memberService from '../../services/memberService';
import alumniService from '../../services/alumniService';
import Spinner from '../../components/common/Spinner';
import {
  FileText,
  Users,
  GraduationCap,
  Calendar,
  PlusCircle,
  ArrowUpRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    posts: 0,
    members: 0,
    alumni: 0,
    events: 0,
  });
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postsRes, membersRes, alumniRes, eventsRes] = await Promise.allSettled([
          postService.getPosts({ page: 1, limit: 5 }),
          memberService.getMembers({ page: 1, limit: 1 }),
          alumniService.getAlumni({ page: 1, limit: 1 }),
          postService.getPosts({ category: 'Events', page: 1, limit: 1 }),
        ]);

        setStats({
          posts: postsRes.status === 'fulfilled' ? postsRes.value.total || 0 : 0,
          members: membersRes.status === 'fulfilled' ? membersRes.value.total || 0 : 0,
          alumni: alumniRes.status === 'fulfilled' ? alumniRes.value.total || 0 : 0,
          events: eventsRes.status === 'fulfilled' ? eventsRes.value.total || 0 : 0,
        });

        if (postsRes.status === 'fulfilled' && postsRes.value.posts) {
          setRecentPosts(postsRes.value.posts);
        }
      } catch {
        // Fallback gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.posts,
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      link: '/admin/posts',
      actionText: 'Manage Posts',
    },
    {
      title: 'Active Members',
      value: stats.members,
      icon: Users,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      link: '/admin/members',
      actionText: 'Manage Team',
    },
    {
      title: 'Alumni Profiles',
      value: stats.alumni,
      icon: GraduationCap,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      link: '/admin/alumni',
      actionText: 'Manage Alumni',
    },
    {
      title: 'Event Releases',
      value: stats.events,
      icon: Calendar,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      link: '/admin/events',
      actionText: 'Manage Events',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-isa-navy via-isa-slate to-blue-700 text-white shadow-soft-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrator Control Center</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl">
            Welcome back, {user?.name || 'Administrator'}
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-xl">
            Manage ISA & ISOI HIT Student Chapter publications, team members, alumni network, and workshops.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white text-isa-navy hover:bg-blue-50 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>New Post</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <div className="py-12 flex justify-center">
          <Spinner size="md" message="Loading chapter metrics..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {statCards.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {stat.title}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="my-4">
                  <span className="font-display font-black text-3xl sm:text-4xl text-slate-900">
                    {stat.value}
                  </span>
                </div>

                <Link
                  to={stat.link}
                  className="inline-flex items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 pt-3 border-t border-slate-50 group"
                >
                  <span>{stat.actionText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Recent Publications Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-soft p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display font-bold text-lg text-slate-900">
              Recent Publications
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Latest posts published to the chapter website
            </p>
          </div>
          <Link
            to="/admin/posts"
            className="text-xs font-bold text-blue-600 hover:text-blue-700"
          >
            View All Posts →
          </Link>
        </div>

        {recentPosts.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {recentPosts.map((post) => (
              <div
                key={post._id}
                className="py-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=100&q=80'}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">
                      {post.title}
                    </p>
                    <span className="inline-block mt-0.5 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {post.category}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/posts/${post._id}`}
                  target="_blank"
                  className="text-xs font-semibold text-slate-400 hover:text-blue-600 flex-shrink-0"
                >
                  View live ↗
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-400 py-6 text-center">
            No publications created yet. Create your first post from the Posts tab.
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
