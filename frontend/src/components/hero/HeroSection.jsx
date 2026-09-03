import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, ArrowRight, BookOpen } from 'lucide-react';
import { CHAPTER_INFO } from '../../utils/constants';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-slate-50 py-16 sm:py-24 border-b border-slate-100">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-isa-sky/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Large Circular Image with subtle blue border */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            {/* Outer subtle glow ring */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-isa-navy via-blue-500 to-isa-sky rounded-full blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
            
            {/* Circular badge container */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-2 bg-white shadow-soft-xl border-2 border-blue-200/80 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-isa-dark via-isa-navy to-blue-700 flex flex-col items-center justify-center text-white p-3 shadow-inner">
                <span className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-isa-sky">
                  ISA
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-blue-200 tracking-widest uppercase mt-0.5">
                  & ISOI HIT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight sm:leading-none">
          ISA & ISOI
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-isa-slate to-isa-navy mt-1 sm:mt-2">
            HIT Student Chapter
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-xl font-semibold text-slate-600 tracking-wide font-display">
          International Society of Automation
        </p>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Empowering engineering minds at Haldia Institute of Technology with cutting-edge knowledge in industrial automation, instrumentation, robotics, and smart systems.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
          <a
            href="#posts-showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-soft hover:shadow-soft-lg transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Posts</span>
          </a>
          <Link
            to="/members"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 border border-slate-200 shadow-sm active:scale-95 transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Meet Our Team</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
