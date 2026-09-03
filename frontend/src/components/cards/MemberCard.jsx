import React from 'react';
import { Mail, ShieldCheck, User } from 'lucide-react';

const MemberCard = ({ member }) => {
  if (!member) return null;

  const { name, email, photo, position, category } = member;
  const isCore = category === 'Core-Member';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Profile Photo */}
      <div className="relative mb-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-blue-600 to-isa-sky shadow-md group-hover:scale-105 transition-transform duration-300">
          <img
            src={photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={name || 'ISA Member'}
            loading="lazy"
            className="w-full h-full object-cover rounded-full bg-slate-100"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
            }}
          />
        </div>
        {isCore && (
          <span
            className="absolute bottom-0 right-1 bg-blue-600 text-white p-1.5 rounded-full shadow-sm"
            title="Core Team Member"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
          </span>
        )}
      </div>

      {/* Member Details */}
      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
        {name}
      </h3>

      <p className="text-xs sm:text-sm font-semibold text-blue-600 mt-0.5">
        {position || 'Team Member'}
      </p>

      <div className="mt-3">
        <span
          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
            isCore
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}
        >
          {category}
        </span>
      </div>

      {email && (
        <a
          href={`mailto:${email}`}
          className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors"
          title={`Email ${name}`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span className="truncate max-w-[180px]">{email}</span>
        </a>
      )}
    </div>
  );
};

export default MemberCard;
