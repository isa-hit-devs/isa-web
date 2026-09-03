import React from 'react';
import { Linkedin, Mail, GraduationCap } from 'lucide-react';

const AlumniCard = ({ alumni }) => {
  if (!alumni) return null;

  const { name, email, batch, photo, linkedin } = alumni;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center text-center shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Photo */}
      <div className="relative mb-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-isa-navy to-blue-600 shadow-md group-hover:scale-105 transition-transform duration-300">
          <img
            src={photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
            alt={name || 'ISA Alumni'}
            loading="lazy"
            className="w-full h-full object-cover rounded-full bg-slate-100"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
            }}
          />
        </div>
        <span className="absolute bottom-0 right-1 bg-isa-navy text-white p-1.5 rounded-full shadow-sm">
          <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
        </span>
      </div>

      {/* Details */}
      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
        {name}
      </h3>

      <div className="mt-1">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Batch {batch}</span>
        </span>
      </div>

      {/* Social / Contact Links */}
      <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-3">
        {linkedin && (
          <a
            href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-700 hover:text-white transition-all shadow-sm"
            title="Email Alumni"
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default AlumniCard;
