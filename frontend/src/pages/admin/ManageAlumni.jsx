import React, { useState, useEffect } from 'react';
import alumniService from '../../services/alumniService';
import { ALUMNI_BATCHES } from '../../utils/constants';
import { getErrorMessage } from '../../utils/helpers';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import Spinner from '../../components/common/Spinner';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  GraduationCap,
  Linkedin,
  Mail,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

const ManageAlumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [editingAlumni, setEditingAlumni] = useState(null);
  const [deletingAlumni, setDeletingAlumni] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    batch: ALUMNI_BATCHES[0],
    linkedin: '',
    photoFile: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { showToast } = useToast();

  const fetchAlumni = async (currentPage = 1) => {
    setLoading(true);
    try {
      const data = await alumniService.getAlumni({
        page: currentPage,
        limit: 50,
      });
      setAlumniList(data.alumni || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.page || 1);
    } catch (err) {
      showToast(getErrorMessage(err, 'Failed to load alumni directory'), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni(page);
  }, [page]);

  const openCreateModal = () => {
    setFormData({
      name: '',
      email: '',
      batch: ALUMNI_BATCHES[0],
      linkedin: '',
      photoFile: null,
    });
    setPhotoPreview(null);
    setIsCreateOpen(true);
  };

  const openEditModal = (alumni) => {
    setEditingAlumni(alumni);
    setFormData({
      name: alumni.name || '',
      email: alumni.email || '',
      batch: alumni.batch || ALUMNI_BATCHES[0],
      linkedin: alumni.linkedin || '',
      photoFile: null,
    });
    setPhotoPreview(alumni.photo || null);
    setIsEditOpen(true);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showToast('Please select a valid image file', 'warning');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('Photo size exceeds 5MB limit', 'warning');
        return;
      }
      setFormData((prev) => ({ ...prev, photoFile: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.batch) {
      showToast('Please fill all required fields', 'warning');
      return;
    }
    if (!formData.photoFile) {
      showToast('Please upload an alumni photo', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim().toLowerCase());
      data.append('batch', formData.batch);
      if (formData.linkedin) {
        data.append('linkedin', formData.linkedin.trim());
      }
      data.append('photo', formData.photoFile);

      await alumniService.createAlumni(data);
      showToast('Alumni profile created successfully!', 'success');
      setIsCreateOpen(false);
      fetchAlumni(1);
    } catch (err) {
      showToast(getErrorMessage(err, 'Failed to create alumni profile'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.batch) {
      showToast('Please fill all required fields', 'warning');
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim().toLowerCase());
      data.append('batch', formData.batch);
      data.append('linkedin', formData.linkedin ? formData.linkedin.trim() : '');
      if (formData.photoFile) {
        data.append('photo', formData.photoFile);
      }

      await alumniService.updateAlumni(editingAlumni._id, data);
      showToast('Alumni profile updated successfully!', 'success');
      setIsEditOpen(false);
      fetchAlumni(page);
    } catch (err) {
      showToast(getErrorMessage(err, 'Failed to update alumni profile'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!deletingAlumni) return;
    setSubmitting(true);
    try {
      await alumniService.deleteAlumni(deletingAlumni._id);
      showToast('Alumni profile removed successfully!', 'success');
      setIsDeleteOpen(false);
      setDeletingAlumni(null);
      fetchAlumni(page);
    } catch (err) {
      showToast(getErrorMessage(err, 'Failed to remove alumni profile'), 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredAlumni = alumniList.filter((alumni) => {
    const matchesSearch =
      !searchQuery ||
      alumni.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.batch?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = !selectedBatch || alumni.batch === selectedBatch;
    return matchesSearch && matchesBatch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Bar Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-soft">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by alumni name, batch, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
            />
          </div>

          <div className="relative min-w-[160px]">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all cursor-pointer font-medium"
            >
              <option value="">All Batches</option>
              {ALUMNI_BATCHES.map((b) => (
                <option key={b} value={b}>
                  Batch {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Alumni</span>
        </button>
      </div>

      {/* Alumni Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Spinner size="lg" message="Loading alumni records..." />
          </div>
        ) : filteredAlumni.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-6">Alumni</th>
                  <th className="py-3.5 px-6">Batch</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6">LinkedIn</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredAlumni.map((alumni) => (
                  <tr key={alumni._id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                          <img
                            src={alumni.photo}
                            alt={alumni.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{alumni.name}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700">
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>{alumni.batch}</span>
                      </span>
                    </td>

                    <td className="py-4 px-6 text-xs text-slate-500 font-mono">
                      {alumni.email}
                    </td>

                    <td className="py-4 px-6 whitespace-nowrap">
                      {alumni.linkedin ? (
                        <a
                          href={alumni.linkedin.startsWith('http') ? alumni.linkedin : `https://${alumni.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          <span>Profile ↗</span>
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(alumni)}
                          className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit alumni"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setDeletingAlumni(alumni);
                            setIsDeleteOpen(true);
                          }}
                          className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete alumni"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-sm font-bold text-slate-700">No alumni records found</p>
            <p className="text-xs text-slate-400 mt-1">
              Add alumni to build the student chapter legacy directory.
            </p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-slate-100">
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Add Alumni Profile"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sarah Jenkins"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. sarah@alumni.hit.ac.in"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Batch *
              </label>
              <select
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer font-medium"
              >
                {ALUMNI_BATCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Alumni Photo *
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                required
                onChange={handlePhotoChange}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Add Alumni'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Alumni Profile"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Batch *
              </label>
              <select
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer font-medium"
              >
                {ALUMNI_BATCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                LinkedIn URL (Optional)
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Change Alumni Photo (Optional)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditOpen(false)}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Remove Alumni Record"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 text-rose-800 text-xs sm:text-sm">
            <AlertTriangle className="w-6 h-6 text-rose-600 flex-shrink-0" />
            <p>
              Are you sure you want to remove <span className="font-bold">{deletingAlumni?.name}</span> (Batch {deletingAlumni?.batch}) from the alumni directory?
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubmit}
              disabled={submitting}
              className="px-5 py-2 text-xs sm:text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-sm disabled:opacity-50"
            >
              {submitting ? 'Removing...' : 'Remove Record'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default ManageAlumni;
