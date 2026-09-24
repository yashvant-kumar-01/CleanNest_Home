import React, { useState, useEffect } from 'react';
import API from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  ShieldCheck,
  Calendar,
  Users,
  Briefcase,
  DollarSign,
  MessageSquare,
  BookOpen,
  Mail,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Sparkles,
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, bookings, services, users, reviews, enquiries, articles
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Booking status filter & search
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');
  const [bookingSearch, setBookingSearch] = useState('');

  // New Service Modal Form State
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [serviceName, setServiceName] = useState('');
  const [serviceShortDesc, setServiceShortDesc] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Home Cleaning');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDuration, setServiceDuration] = useState('3 - 4 Hours');
  const [serviceImage, setServiceImage] = useState('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80');

  // New Article Modal Form State
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleExcerpt, setArticleExcerpt] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleImage, setArticleImage] = useState('https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, bookingsRes, servicesRes, usersRes, reviewsRes, enquiriesRes, articlesRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/bookings'),
        API.get('/services'),
        API.get('/admin/users'),
        API.get('/reviews'),
        API.get('/contact/admin'),
        API.get('/articles'),
      ]);

      setStats(statsRes.data);
      setBookings(bookingsRes.data);
      setServices(servicesRes.data);
      setUsersList(usersRes.data);
      setReviews(reviewsRes.data);
      setEnquiries(enquiriesRes.data);
      setArticles(articlesRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await API.put(`/admin/bookings/${bookingId}/status`, { status: newStatus });
      setSuccessMsg(`Booking status updated to ${newStatus}`);
      fetchAdminData();
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  // Create Service
  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await API.post('/services', {
        name: serviceName,
        shortDescription: serviceShortDesc,
        description: serviceDesc,
        category: serviceCategory,
        price: Number(servicePrice),
        duration: serviceDuration,
        image: serviceImage,
        includedItems: ['Professional Scrubbing', 'Sanitization Wipe', 'Floor Washing'],
        excludedItems: ['Unplugging heavy electrical motors'],
      });
      setSuccessMsg('New cleaning service created successfully!');
      setServiceModalOpen(false);
      fetchAdminData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create service');
    }
  };

  // Delete Service
  const handleDeleteService = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await API.delete(`/services/${id}`);
      setSuccessMsg('Service deleted');
      fetchAdminData();
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  // Delete Review
  const handleDeleteReview = async (id) => {
    if (!window.confirm('Delete this customer review?')) return;
    try {
      await API.delete(`/reviews/${id}`);
      setSuccessMsg('Review deleted');
      fetchAdminData();
    } catch (err) {
      setError('Failed to delete review');
    }
  };

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = async (id, status) => {
    try {
      await API.put(`/contact/admin/${id}/status`, { status });
      setSuccessMsg(`Enquiry marked as ${status}`);
      fetchAdminData();
    } catch (err) {
      setError('Failed to update enquiry status');
    }
  };

  // Create Article
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      await API.post('/articles', {
        title: articleTitle,
        excerpt: articleExcerpt,
        content: articleContent,
        featuredImage: articleImage,
        author: 'Admin Team',
      });
      setSuccessMsg('Blog article published successfully!');
      setArticleModalOpen(false);
      fetchAdminData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish article');
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await API.delete(`/articles/${id}`);
      setSuccessMsg('Article deleted');
      fetchAdminData();
    } catch (err) {
      setError('Failed to delete article');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = bookingStatusFilter === 'All' || b.status === bookingStatusFilter;
    const matchesSearch =
      b.bookingId.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.phone.includes(bookingSearch) ||
      b.user?.name?.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) return <LoadingSpinner fullScreen={true} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-xs font-bold border border-teal-500/30">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>CleanNest Administration Control Panel</span>
          </div>
          <h1 className="text-3xl font-black">Admin Management Dashboard</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Manage bookings, services, user accounts, customer reviews, and articles in Ahmedabad.
          </p>
        </div>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />
      {successMsg && (
        <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-4 rounded-2xl text-sm font-bold">
          ✓ {successMsg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: Sparkles },
          { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
          { id: 'services', label: `Services (${services.length})`, icon: Briefcase },
          { id: 'users', label: `Users (${usersList.length})`, icon: Users },
          { id: 'reviews', label: `Reviews (${reviews.length})`, icon: MessageSquare },
          { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: Mail },
          { id: 'articles', label: `Articles (${articles.length})`, icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors flex items-center space-x-2 ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Revenue</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900">
                  ₹{stats?.totalRevenue?.toLocaleString('en-IN') || 0}
                </span>
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Bookings</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900">{stats?.totalBookings || 0}</span>
                <div className="p-2 rounded-xl bg-teal-100 text-teal-700">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Pending Requests</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-amber-600">{stats?.pendingBookings || 0}</span>
                <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs text-slate-400 font-semibold uppercase">Registered Customers</span>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-slate-900">{stats?.totalUsers || 0}</span>
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <Users className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Recent Customer Bookings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Booking ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stats?.recentBookings?.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-teal-700">{b.bookingId}</td>
                      <td className="py-3 px-4">{b.user?.name || 'Customer'}</td>
                      <td className="py-3 px-4">{b.service?.name}</td>
                      <td className="py-3 px-4 text-xs">{b.bookingDate} ({b.timeSlot})</td>
                      <td className="py-3 px-4 font-bold">₹{b.amount}</td>
                      <td className="py-3 px-4 font-semibold">{b.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. MANAGE BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Filter Status:</span>
              {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((st) => (
                <button
                  key={st}
                  onClick={() => setBookingStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    bookingStatusFilter === st
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ID, Name or Phone..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Booking ID</th>
                    <th className="py-3.5 px-4">Customer Info</th>
                    <th className="py-3.5 px-4">Service & Package</th>
                    <th className="py-3.5 px-4">Date & Slot</th>
                    <th className="py-3.5 px-4">Address</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Status & Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4 font-extrabold text-teal-700">{b.bookingId}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold block text-slate-900">{b.user?.name || 'Guest Customer'}</span>
                        <span className="text-xs text-slate-500">{b.phone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800">{b.service?.name}</span>
                        <span className="text-xs text-slate-400 block">{b.package} ({b.rooms})</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium">
                        <div>{b.bookingDate}</div>
                        <div className="text-teal-700 font-bold">{b.timeSlot}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs max-w-xs truncate">
                        {b.address?.street}, {b.address?.area}, {b.address?.pincode}
                      </td>
                      <td className="py-3.5 px-4 font-black">₹{b.amount}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => handleUpdateBookingStatus(b._id, e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. MANAGE SERVICES TAB */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Active Cleaning Services Catalog</h3>
            <button
              onClick={() => setServiceModalOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <div key={svc._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 relative">
                <img src={svc.image} alt={svc.name} className="w-full h-36 object-cover rounded-xl" />
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                    {svc.category}
                  </span>
                  <span className="text-base font-black text-slate-900">₹{svc.price}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{svc.name}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{svc.shortDescription}</p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleDeleteService(svc._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MANAGE USERS TAB */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 font-bold text-base text-slate-900">
            Registered Customers & Admins
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-400 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3.5 px-4 text-xs font-semibold">{u.email}</td>
                    <td className="py-3.5 px-4 text-xs">{u.phone}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs font-extrabold uppercase px-2.5 py-1 rounded-md ${
                        u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-teal-100 text-teal-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-400">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. MANAGE REVIEWS TAB */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Submitted Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{r.user?.name || 'Customer'}</span>
                  <span className="text-xs font-bold text-amber-500">★ {r.rating} / 5</span>
                </div>
                <p className="text-xs text-slate-600 italic">"{r.comment}"</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Location: {r.location}</span>
                  <button
                    onClick={() => handleDeleteReview(r._id)}
                    className="text-red-600 hover:underline font-bold"
                  >
                    Delete Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. MANAGE ENQUIRIES TAB */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 font-bold text-base text-slate-900">
            Customer Contact Enquiries
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-400 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Name & Email</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Message</th>
                  <th className="py-3.5 px-4">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4">
                      <span className="font-bold block text-slate-900">{enq.name}</span>
                      <span className="text-xs text-slate-400">{enq.email}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs">{enq.phone}</td>
                    <td className="py-3.5 px-4 font-bold text-xs text-teal-800">{enq.subject}</td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 max-w-xs">{enq.message}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateEnquiryStatus(enq._id, e.target.value)}
                        className="px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. MANAGE ARTICLES TAB */}
      {activeTab === 'articles' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-900">Blog & Hygiene Articles</h3>
            <button
              onClick={() => setArticleModalOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <div key={art._id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex space-x-4 items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{art.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{art.excerpt}</p>
                </div>
                <button
                  onClick={() => handleDeleteArticle(art._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Add New Cleaning Service</h3>
            <form onSubmit={handleCreateService} className="space-y-3">
              <input
                type="text"
                placeholder="Service Name (e.g. Balcony & Terrace Cleaning)"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              />
              <input
                type="text"
                placeholder="Short Description"
                value={serviceShortDesc}
                onChange={(e) => setServiceShortDesc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              />
              <textarea
                rows="3"
                placeholder="Full Description"
                value={serviceDesc}
                onChange={(e) => setServiceDesc(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              ></textarea>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Starting Price (₹)"
                  value={servicePrice}
                  onChange={(e) => setServicePrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Duration (e.g. 2 Hours)"
                  value={serviceDuration}
                  onChange={(e) => setServiceDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Image URL"
                value={serviceImage}
                onChange={(e) => setServiceImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              />
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white"
                >
                  Create Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {articleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Publish Blog Article</h3>
            <form onSubmit={handleCreateArticle} className="space-y-3">
              <input
                type="text"
                placeholder="Article Title"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              />
              <input
                type="text"
                placeholder="Article Excerpt"
                value={articleExcerpt}
                onChange={(e) => setArticleExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              />
              <textarea
                rows="4"
                placeholder="Article Markdown / Content"
                value={articleContent}
                onChange={(e) => setArticleContent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              ></textarea>
              <input
                type="text"
                placeholder="Featured Image URL"
                value={articleImage}
                onChange={(e) => setArticleImage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm"
                required
              />
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
