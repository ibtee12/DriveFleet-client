import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookmarkCheck, Calendar, DollarSign, UserCheck, Trash2, ArrowRight, Car } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    if (!user?.email) return;
    setLoading(true);
    const jwtToken = localStorage.getItem('drivefleet-jwt');

    try {
      const res = await axios.get(`${API_URL}/bookings/user/${user.email}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        withCredentials: true
      });
      setBookings(res.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId, carName) => {
    const result = await Swal.fire({
      title: `Cancel booking for ${carName}?`,
      text: "Are you sure you want to cancel this reservation?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Cancel Reservation'
    });

    if (result.isConfirmed) {
      const jwtToken = localStorage.getItem('drivefleet-jwt');
      try {
        const res = await axios.delete(`${API_URL}/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          },
          withCredentials: true
        });

        if (res.data?.success) {
          toast.success('Reservation cancelled');
          fetchBookings();
        }
      } catch (error) {
        console.error('Cancel Booking Error:', error);
        toast.error('Failed to cancel booking');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Fetching your rental reservations..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>My Active Reservations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          My Bookings ({bookings.length})
        </h1>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <Car className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Active Reservations</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">Explore our fleet to reserve your next ride.</p>
          <Link
            to="/explore"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md"
          >
            Explore Cars
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-4 px-6">Vehicle</th>
                  <th className="py-4 px-6">Total Price</th>
                  <th className="py-4 px-6">Booking Date</th>
                  <th className="py-4 px-6">Driver Option</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Vehicle */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={booking.imageUrl || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80"}
                          alt={booking.carName}
                          className="w-14 h-11 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{booking.carName}</p>
                          <p className="text-xs text-slate-500">{booking.carType || 'Rental'}</p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 font-extrabold text-slate-900 dark:text-white">
                      ${booking.rentalPrice} / day
                    </td>

                    {/* Booking Date formatted via JavaScript Date */}
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-medium">
                      {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>

                    {/* Chauffeur */}
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        booking.driverNeeded === 'Yes'
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {booking.driverNeeded === 'Yes' ? 'Chauffeur Included' : 'Self Drive'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        {booking.status || 'Confirmed'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleCancelBooking(booking._id, booking.carName)}
                        type="button"
                        className="px-3.5 py-2 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-100 transition-colors inline-flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyBookings;
