import React, { useState, useEffect } from 'react';
import AlumniCard from '../components/cards/AlumniCard';
import Pagination from '../components/common/Pagination';
import Spinner from '../components/common/Spinner';
import alumniService from '../services/alumniService';
import { ALUMNI_BATCHES } from '../utils/constants';
import { GraduationCap, Search } from 'lucide-react';

const Alumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedBatch, setSelectedBatch] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchAlumni = async (currentPage = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await alumniService.getAlumni({ page: currentPage, limit: 50 });
      setAlumniList(data.alumni || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);
    } catch (err) {
      setError('Failed to load alumni directory. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni(page);
  }, [page]);

  const filteredAlumni = alumniList.filter((alumni) => {
    const matchesBatch =
      selectedBatch === 'All' || alumni.batch === selectedBatch;
    const matchesSearch =
      !searchQuery ||
      alumni.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.batch?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBatch && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Legacy & Network</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            Our Alumni
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Celebrating the alumni of ISA & ISOI HIT Student Chapter who are excelling in global automation, robotics, instrumentation, and technology leadership.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-soft">
          {/* Batch Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            {['All', ...ALUMNI_BATCHES].map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedBatch === batch
                    ? 'bg-isa-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {batch === 'All' ? 'All Batches' : `Batch ${batch}`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alumni by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>
        </div>

        {/* Alumni Grid */}
        <div className="mt-10">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Spinner size="lg" message="Loading alumni profiles..." />
            </div>
          ) : error ? (
            <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center max-w-md mx-auto">
              <p className="text-sm font-medium text-rose-800">{error}</p>
              <button
                onClick={() => fetchAlumni(page)}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredAlumni.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAlumni.map((alumni) => (
                <AlumniCard key={alumni._id} alumni={alumni} />
              ))}
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white border border-dashed border-slate-200 text-center max-w-md mx-auto">
              <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-700">No alumni profiles found</p>
              <p className="text-xs text-slate-500 mt-1">
                Try selecting another batch filter.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />

      </div>
    </div>
  );
};

export default Alumni;
