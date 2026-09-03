import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import Modal from '../common/Modal';

const EventCard = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!event) return null;

  const {
    title,
    category,
    date,
    time,
    location,
    status = 'Upcoming',
    image,
    description,
    highlights = [],
  } = event;

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group">
        <div>
          {/* Event Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <img
              src={image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 text-blue-700 backdrop-blur-md shadow-sm">
                {category || 'Workshop'}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
                {status}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-5">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mb-2">
              <div className="flex items-center gap-1.5 text-blue-600">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              {time && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{time}</span>
                </div>
              )}
            </div>

            <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
              {title}
            </h3>

            {location && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                <span className="truncate">{location}</span>
              </div>
            )}

            {description && (
              <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Action button */}
        <div className="p-5 pt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-blue-600 bg-blue-50/80 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <span>View Event Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Event Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          <div className="rounded-xl overflow-hidden aspect-[16/9] bg-slate-100">
            <img
              src={image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Date:</span> {date}
            </div>
            {time && (
              <div className="flex items-center gap-2 text-slate-700">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-semibold">Time:</span> {time}
              </div>
            )}
            {location && (
              <div className="flex items-center gap-2 text-slate-700 sm:col-span-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span className="font-semibold">Venue:</span> {location}
              </div>
            )}
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">About This Event</h4>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {highlights && highlights.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Key Highlights</h4>
              <ul className="space-y-1.5">
                {highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EventCard;
