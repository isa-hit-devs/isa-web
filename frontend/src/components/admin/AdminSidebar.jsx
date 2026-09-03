import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  GraduationCap,
  Calendar,
  LogOut,
  ArrowLeft,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Posts', path: '/admin/posts', icon: FileText },
    { label: 'Members', path: '/admin/members', icon: Users },
    { label: 'Alumni', path: '/admin/alumni', icon: GraduationCap },
    { label: 'Events', path: '/admin/events', icon: Calendar },
  ];

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    }`;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-isa-dark text-slate-200 border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-isa-sky text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md">
            ISA
          </div>
          <div>
            <span className="font-display font-bold text-white text-base block">
              Admin Portal
            </span>
            <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider block">
              ISA & ISOI HIT
            </span>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Admin User Info */}
      <div className="p-4 mx-4 my-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-sm">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-bold text-white truncate">
            {user?.name || 'Administrator'}
          </p>
          <div className="flex items-center gap-1 text-[10px] text-blue-400">
            <Shield className="w-3 h-3" />
            <span className="capitalize">{user?.role || 'Admin'}</span>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={onClose}
              className={linkClasses}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[80vw] h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
