import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink, Globe, Heart } from 'lucide-react';
import { POST_CATEGORIES, CATEGORY_META, CHAPTER_INFO } from '../../utils/constants';

const Footer = () => {
  return (
    <footer className="bg-isa-dark text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Chapter Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-isa-sky text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md">
                ISA
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-base tracking-tight">
                  ISA & ISOI HIT
                </h3>
                <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                  Student Chapter
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {CHAPTER_INFO.description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>{CHAPTER_INFO.location}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-white transition-colors">
                  Alumni Network
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  Workshops & Events
                </Link>
              </li>
              <li>
                <Link to="/members" className="hover:text-white transition-colors">
                  Executive Committee & Members
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Member Portal / Admin Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Weekly Series & Blogs */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Weekly Series & Blogs
            </h4>
            <ul className="space-y-2 text-sm">
              {POST_CATEGORIES.slice(0, 5).map((cat) => {
                const meta = CATEGORY_META[cat];
                const slug = meta ? meta.slug : cat.toLowerCase().replace(/\s+/g, '-');
                return (
                  <li key={cat}>
                    <Link
                      to={`/category/${slug}`}
                      className="hover:text-white text-slate-400 transition-colors flex items-center justify-between group"
                    >
                      <span>{cat}</span>
                      <span className="text-xs text-slate-600 group-hover:text-blue-400 transition-colors">→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Affiliations & Connect */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Parent Societies
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Affiliated with the International Society of Automation (ISA, USA) and the Instrument Society of India (ISOI, IISc Bangalore).
            </p>
            <div className="pt-2 space-y-2">
              <a
                href="https://www.isa.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>International Society of Automation</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <br />
              <a
                href="http://isoi.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Instrument Society of India</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {CHAPTER_INFO.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with dedication for engineering & automation excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
