import React, { useState, useEffect } from 'react';
import EventCard from '../components/cards/EventCard';
import PostCard from '../components/cards/PostCard';
import Spinner from '../components/common/Spinner';
import eventService from '../services/eventService';
import { Calendar, Sparkles, Rocket } from 'lucide-react';

const Events = () => {
  const [eventPosts, setEventPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const featuredEvents = eventService.getFeaturedEvents();

  useEffect(() => {
    const fetchEventPosts = async () => {
      try {
        const data = await eventService.getEventPosts({ page: 1, limit: 12 });
        setEventPosts(data.posts || []);
      } catch {
        setEventPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchEventPosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Workshops & Competitions</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Chapter Events
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Hands-on technical workshops, national hackathons, industrial guest lectures, and annual summits organized by ISA & ISOI HIT.
          </p>
        </div>

        {/* Featured Chapter Events */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Rocket className="w-5 h-5 text-blue-600" />
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
              Featured Chapter Summits & Bootcamps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Backend-Connected Event Posts */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900">
                Event Announcements & Highlights
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Official releases and recaps from the chapter
              </p>
            </div>
          </div>

          {loadingPosts ? (
            <div className="py-12 flex justify-center">
              <Spinner size="md" message="Loading event publications..." />
            </div>
          ) : eventPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {eventPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-dashed border-slate-200 text-center">
              <p className="text-sm text-slate-500 font-medium">
                No recent event announcements published yet.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Events;
