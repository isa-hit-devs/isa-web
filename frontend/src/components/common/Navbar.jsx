import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  LogIn,
  LayoutDashboard,
  LogOut,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { POST_CATEGORIES, CATEGORY_META } from '../../utils/constants';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-150 py-1.5 px-3 rounded-lg ${
      isActive
        ? 'text-blue-600 bg-blue-50/80 font-bold'
        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
    }`;

  const isCategoryActive = location.pathname.startsWith('/category/');

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-slate-100'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-isa-navy to-isa-blue text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              ISA
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg text-isa-navy tracking-tight group-hover:text-blue-600 transition-colors">
                ISA & ISOI
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 tracking-wider uppercase">
                HIT Student Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/alumni" className={navLinkClass}>
              Alumni
            </NavLink>
            <NavLink to="/events" className={navLinkClass}>
              Events
            </NavLink>
            <NavLink to="/members" className={navLinkClass}>
              Members
            </NavLink>

            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center gap-1 text-sm font-semibold py-1.5 px-3 rounded-lg transition-colors duration-150 ${
                  isCategoryActive || isMoreOpen
                    ? 'text-blue-600 bg-blue-50/80 font-bold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
                aria-expanded={isMoreOpen}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMoreOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-soft-xl border border-slate-100 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Post Categories
                  </div>
                  {POST_CATEGORIES.map((cat) => {
                    const meta = CATEGORY_META[cat];
                    const slug = meta ? meta.slug : cat.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={cat}
                        to={`/category/${slug}`}
                        className="flex items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-blue-50/70 hover:text-blue-700 font-medium transition-colors"
                      >
                        <span>{cat}</span>
                        <span className="text-xs text-slate-400 font-normal">→</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Auth / Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold bg-isa-navy text-white hover:bg-isa-slate rounded-xl shadow-sm transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  title="Logout"
                  className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-soft-lg">
          <div className="flex flex-col space-y-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/alumni" className={navLinkClass}>
              Alumni
            </NavLink>
            <NavLink to="/events" className={navLinkClass}>
              Events
            </NavLink>
            <NavLink to="/members" className={navLinkClass}>
              Members
            </NavLink>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              Categories
            </div>
            <div className="grid grid-cols-2 gap-1 mt-1">
              {POST_CATEGORIES.map((cat) => {
                const meta = CATEGORY_META[cat];
                const slug = meta ? meta.slug : cat.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={cat}
                    to={`/category/${slug}`}
                    className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-lg"
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            {isAuthenticated ? (
              <div className="space-y-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold bg-isa-navy text-white rounded-xl"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-rose-600 bg-rose-50 rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout ({user?.name || 'User'})</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-xl shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
