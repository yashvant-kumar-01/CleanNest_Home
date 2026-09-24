import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  CheckCircle2,
  Phone,
  User as UserIcon,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const preselectedServiceId = searchParams.get('serviceId');
  const preselectedPackage = searchParams.get('package');

  // Booking Form State
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(preselectedPackage || 'Standard');
  const [bookingDate, setBookingDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [rooms, setRooms] = useState('2 BHK');
  const [street, setStreet] = useState(user?.address?.street || '');
  const [area, setArea] = useState(user?.address?.area || 'Satellite');
  const [pincode, setPincode] = useState(user?.address?.pincode || '380015');
  const [phone, setPhone] = useState(user?.phone || '');
  const [instructions, setInstructions] = useState('');

  // UI state
  const [loading, setLoading] = useState(true);
  const [slotChecking, setSlotChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
  const ahmedabadAreas = [
    'Satellite', 'Bodakdev', 'Vastrapur', 'SG Highway', 'Prahlad Nagar',
    'Thaltej', 'Bopal', 'Navrangpura', 'Maninagar', 'Chandkheda', 'Ambawadi'
  ];

  // Fetch services on load
  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data } = await API.get('/services');
        setServices(data);
        if (data.length > 0) {
          const initial = data.find((s) => s._id === preselectedServiceId) || data[0];
          setSelectedService(initial);
        }
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, [preselectedServiceId]);

  // Check slot availability whenever date changes
  useEffect(() => {
    if (bookingDate) {
      checkSlotAvailability(bookingDate);
    }
  }, [bookingDate]);

  const checkSlotAvailability = async (dateStr) => {
    setSlotChecking(true);
    try {
      const { data } = await API.get(`/bookings/check-availability?date=${dateStr}`);
      setAvailableSlots(data.availability || []);
      // Reset selected time slot if current choice is taken
      const isStillAvailable = data.availability?.find((s) => s.timeSlot === selectedTimeSlot)?.isAvailable;
      if (!isStillAvailable) {
        const firstAvailable = data.availability?.find((s) => s.isAvailable);
        setSelectedTimeSlot(firstAvailable ? firstAvailable.timeSlot : '');
      }
    } catch (err) {
      console.error('Error checking availability:', err);
    } finally {
      setSlotChecking(false);
    }
  };

  // Calculate Total Amount dynamically
  const calculateTotalAmount = () => {
    if (!selectedService) return 0;
    const pkgObj = selectedService.packages?.find((p) => p.name === selectedPackage);
    if (pkgObj) return pkgObj.price;
    return selectedService.price || 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!user) {
      navigate('/login?redirect=/booking');
      return;
    }

    if (!selectedService || !bookingDate || !selectedTimeSlot || !street || !area || !pincode || !phone) {
      setError('Please complete all required fields including date, time slot, and address');
      return;
    }

    setSubmitting(true);

    try {
      const bookingPayload = {
        serviceId: selectedService._id,
        package: selectedPackage,
        bookingDate,
        timeSlot: selectedTimeSlot,
        propertyType,
        rooms,
        address: {
          street,
          area,
          city: 'Ahmedabad',
          pincode,
        },
        phone,
        instructions,
        amount: calculateTotalAmount(),
      };

      const { data } = await API.post('/bookings', bookingPayload);
      setConfirmedBooking(data.booking);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen={true} />;

  // Confirmation Success Screen
  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Booking Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Thank You! Your Booking is Reserved
          </h1>
          <p className="text-slate-600 text-sm">
            We have received your service request for Ahmedabad.
          </p>
        </div>

        {/* Summary Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 text-left space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase">Booking ID</span>
              <p className="text-xl font-black text-teal-700">{confirmedBooking.bookingId}</p>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
              {confirmedBooking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase block">Service</span>
              <span className="font-bold text-slate-900">{confirmedBooking.service?.name}</span>
              <p className="text-xs text-slate-500">Package: {confirmedBooking.package}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase block">Date & Time</span>
              <span className="font-bold text-slate-900">{confirmedBooking.bookingDate}</span>
              <p className="text-xs text-slate-500">Slot: {confirmedBooking.timeSlot}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase block">Address</span>
              <p className="text-slate-800">{confirmedBooking.address?.street}, {confirmedBooking.address?.area}, Ahmedabad - {confirmedBooking.address?.pincode}</p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase block">Total Amount</span>
              <span className="text-2xl font-black text-slate-900">₹{confirmedBooking.amount?.toLocaleString('en-IN')}</span>
              <p className="text-xs text-emerald-600 font-medium">Pay after cleaning inspection</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-8 rounded-xl transition-colors shadow-md"
          >
            Go to My Bookings
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold py-3.5 px-8 rounded-xl transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white py-12 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-3.5 py-1.5 rounded-full border border-teal-800">
            Easy Online Reservation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Book Your Cleaning Service in Ahmedabad
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Select your cleaning requirements, date, and preferred time slot below.
          </p>
        </div>
      </section>

      {/* Main Booking Form & Summary Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Form (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <ErrorMessage message={error} onClose={() => setError('')} />

          {!user && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 flex items-center justify-between text-sm">
              <span className="text-teal-900 font-medium">Already have a CleanNest account? Log in for faster booking.</span>
              <Link to="/login?redirect=/booking" className="font-bold text-teal-700 hover:underline">
                Log In
              </Link>
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
            
            {/* Step 1: Service & Package Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-teal-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Select Service & Package</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cleaning Service
                  </label>
                  <select
                    value={selectedService?._id || ''}
                    onChange={(e) => {
                      const found = services.find((s) => s._id === e.target.value);
                      setSelectedService(found);
                      if (found?.packages?.length) setSelectedPackage(found.packages[0].name);
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                  >
                    {services.map((svc) => (
                      <option key={svc._id} value={svc._id}>
                        {svc.name} (Starting ₹{svc.price})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedService?.packages?.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Package Tier
                    </label>
                    <select
                      value={selectedPackage}
                      onChange={(e) => setSelectedPackage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                    >
                      {selectedService.packages.map((pkg, idx) => (
                        <option key={idx} value={pkg.name}>
                          {pkg.name} — ₹{pkg.price}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Property Type & Rooms */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-teal-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Property Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                  >
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="Villa / Independent House">Villa / Independent House</option>
                    <option value="Office / Commercial">Office / Commercial Space</option>
                    <option value="Studio">Studio Apartment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Room Configuration
                  </label>
                  <select
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4+ BHK / Duplex">4+ BHK / Duplex</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Date & Real Slot Availability Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-teal-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Select Booking Date & Time Slot</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Cleaning Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full sm:w-64 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 font-semibold text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Available Time Slots {slotChecking && '(Checking availability...)'}
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {timeSlots.map((slot) => {
                      const slotData = availableSlots.find((s) => s.timeSlot === slot);
                      const isAvailable = slotData ? slotData.isAvailable : true;
                      const isSelected = selectedTimeSlot === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          disabled={!isAvailable}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                            !isAvailable
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                              : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-300'
                          }`}
                        >
                          {slot}
                          {!isAvailable && <span className="block text-[9px] font-normal text-red-500">Booked</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Contact & Service Address in Ahmedabad */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-100 pb-3">
                <span className="w-7 h-7 rounded-lg bg-teal-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                <span>Address & Contact Information</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Flat / House No. & Street Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. B-402, Satellite Towers, Near Star Bazaar"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Area / Locality
                    </label>
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                    >
                      {ahmedabadAreas.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value="Ahmedabad"
                      disabled
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 text-sm font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Pincode
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 380015"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98250 88990"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    rows="2"
                    placeholder="e.g. Focus on kitchen grease, call before arriving, parking notes..."
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold py-4 rounded-xl text-base shadow-xl shadow-teal-600/20 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
            >
              <span>{submitting ? 'Processing Booking...' : 'Confirm & Reserve Booking'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right Summary Box (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl sticky top-24 space-y-6">
            <h3 className="text-xl font-bold border-b border-slate-800 pb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Booking Summary</span>
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">Service</span>
                <p className="font-bold text-white text-base">{selectedService?.name}</p>
                <p className="text-xs text-teal-300">Package: {selectedPackage}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-800 py-3">
                <div>
                  <span className="text-slate-400 block">Date</span>
                  <span className="font-bold text-white">{bookingDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Time Slot</span>
                  <span className="font-bold text-teal-300">{selectedTimeSlot || 'Not Selected'}</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <span className="text-slate-400 block uppercase font-semibold">Location</span>
                <p>{street ? `${street}, ` : ''}{area}, Ahmedabad</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase block">Total Price</span>
                  <span className="text-3xl font-black text-white">₹{calculateTotalAmount().toLocaleString('en-IN')}</span>
                </div>
                <span className="text-xs text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                  Pay After Service
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 space-y-2 border-t border-slate-800">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>100% Satisfaction Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Cancellation Fees</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default BookingPage;
