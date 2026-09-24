import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PlusCircle,
  Edit3,
  Lock,
  Phone,
  Eye,
  FileText,
  ShieldAlert,
} from 'lucide-react';

const DashboardPage = () => {
  const { user, updateUserProfile } = useAuth();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'profile'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Profile form state
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [area, setArea] = useState(user?.address?.area || 'Satellite');
  const [pincode, setPincode] = useState(user?.address?.pincode || '380015');
  const [newPassword, setNewPassword] = useState('');
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Selected booking modal state
  const [selectedBookingModal, setSelectedBookingModal] = useState(null);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    try {
      const { data } = await API.get('/bookings/my-bookings');
      setBookings(data);
    } catch (err) {
      setError('Failed to fetch your bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    try {
      await API.put(`/bookings/${bookingId}/cancel`);
      fetchMyBookings();
      if (selectedBookingModal?._id === bookingId) {
        setSelectedBookingModal(null);
      }
      setSuccessMsg('Booking cancelled successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdatingProfile(true);
    setError('');
    setSuccessMsg('');

    try {
      await updateUserProfile({
        name: profileName,
        phone: profilePhone,
        address: { street, area, city: 'Ahmedabad', pincode },
        password: newPassword || undefined,
      });
      setSuccessMsg('Profile updated successfully!');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full">Confirmed</span>;
      case 'In Progress':
        return <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">In Progress</span>;
      case 'Completed':
        return <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">Completed</span>;
      case 'Cancelled':
        return <span className="bg-red-100 text-red-800 text-xs font-bold px-2.5 py-1 rounded-full">Cancelled</span>;
      default:
        return <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Customer Portal</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome, {user?.name}!</h1>
          <p className="text-slate-300 text-xs sm:text-sm">
            Manage your home cleaning reservations and account details for Ahmedabad.
          </p>
        </div>

        <Link
          to="/booking"
          className="inline-flex items-center justify-center space-x-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-sm transition-colors shadow-md self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Cleaning</span>
        </Link>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />
      {successMsg && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-2xl text-sm font-semibold">
          ✓ {successMsg}
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'bookings'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>My Bookings ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 px-6 text-sm font-bold border-b-2 transition-colors flex items-center space-x-2 ${
            activeTab === 'profile'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Address</span>
        </button>
      </div>

      {/* TAB 1: MY BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {loading ? (
            <LoadingSpinner size="lg" />
          ) : bookings.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl text-center border border-slate-200 space-y-4">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-xl font-bold text-slate-800">No Bookings Yet</h3>
              <p className="text-slate-500 text-sm">
                You haven't scheduled any cleaning service yet.
              </p>
              <Link
                to="/booking"
                className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
              >
                <span>Book First Cleaning</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-black text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">
                        {b.bookingId}
                      </span>
                      {getStatusBadge(b.status)}
                    </div>

                    <h4 className="text-lg font-bold text-slate-900">
                      {b.service?.name || 'Home Cleaning'}
                    </h4>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1 text-teal-600" />
                        {b.bookingDate}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1 text-teal-600" />
                        {b.timeSlot}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-teal-600" />
                        {b.address?.area || 'Ahmedabad'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end space-x-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Amount</span>
                      <span className="text-xl font-black text-slate-900">₹{b.amount?.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedBookingModal(b)}
                        className="p-2 text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-teal-50 rounded-xl transition-colors"
                        title="View Full Booking Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {(b.status === 'Pending' || b.status === 'Confirmed') && (
                        <button
                          onClick={() => handleCancelBooking(b._id)}
                          className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PROFILE MANAGEMENT */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Personal Information & Address
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. B-402 Satellite Towers"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Area / Locality in Ahmedabad
                </label>
                <input
                  type="text"
                  placeholder="e.g. Satellite, Bodakdev"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Pincode
              </label>
              <input
                type="text"
                placeholder="380015"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                New Password (Optional)
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={updatingProfile}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md shadow-teal-600/20 disabled:opacity-50 transition-colors"
            >
              {updatingProfile ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4 relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase">Booking Reference</span>
                <h3 className="text-xl font-black text-teal-700">{selectedBookingModal.bookingId}</h3>
              </div>
              {getStatusBadge(selectedBookingModal.status)}
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block">Cleaning Service</span>
                <span className="font-bold text-slate-900 text-base">{selectedBookingModal.service?.name}</span>
                <p className="text-xs text-slate-500">Package: {selectedBookingModal.package}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block">Date</span>
                  <span className="font-bold text-slate-900">{selectedBookingModal.bookingDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Time Slot</span>
                  <span className="font-bold text-teal-700">{selectedBookingModal.timeSlot}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block">Property Details</span>
                <p className="text-slate-800">{selectedBookingModal.propertyType} ({selectedBookingModal.rooms})</p>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block">Service Address</span>
                <p className="text-slate-800">
                  {selectedBookingModal.address?.street}, {selectedBookingModal.address?.area}, Ahmedabad - {selectedBookingModal.address?.pincode}
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold block">Contact Phone</span>
                <p className="text-slate-800">{selectedBookingModal.phone}</p>
              </div>

              {selectedBookingModal.instructions && (
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold block">Special Instructions</span>
                  <p className="text-xs text-slate-600 bg-amber-50 p-2.5 rounded-lg border border-amber-200">{selectedBookingModal.instructions}</p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900">Total Payable:</span>
                <span className="text-2xl font-black text-slate-900">₹{selectedBookingModal.amount?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end">
              <button
                onClick={() => setSelectedBookingModal(null)}
                className="bg-slate-900 text-white font-bold px-6 py-2.5 rounded-xl text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
