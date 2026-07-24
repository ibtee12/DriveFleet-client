import React, { useState } from 'react';
import { X, Calendar, UserCheck, MessageSquare, CheckCircle, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BookingModal = ({ car, isOpen, onClose, onBookingSuccess }) => {
  const { user } = useAuth();
  const [driverNeeded, setDriverNeeded] = useState('No');
  const [specialNote, setSpecialNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !car) return null;

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const jwtToken = localStorage.getItem('drivefleet-jwt');

    const bookingPayload = {
      carId: car._id,
      carName: car.carModel,
      carType: car.carType,
      imageUrl: car.imageUrl,
      rentalPrice: car.rentalPrice,
      userEmail: user?.email,
      userName: user?.displayName || 'DriveFleet Member',
      driverNeeded,
      specialNote,
      bookingDate: new Date().toISOString(),
      status: 'Confirmed'
    };

    try {
      const res = await axios.post(`${API_URL}/bookings`, bookingPayload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        withCredentials: true
      });

      if (res.data?.success) {
        toast.success(`Booking confirmed for ${car.carModel}!`);
        onClose();
        if (onBookingSuccess) onBookingSuccess();
      } else {
        toast.error('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Booking Error:', error);
      toast.error(error.response?.data?.message || 'Error processing your booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Confirm Rental Booking</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Review vehicle details and options</p>
          </div>
        </div>

        {/* Selected Car Brief */}
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 mb-6">
          <img
            src={car.imageUrl}
            alt={car.carModel}
            className="w-20 h-16 rounded-xl object-cover"
          />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{car.carModel}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">{car.carType} • {car.location}</p>
            <p className="text-sm font-extrabold text-blue-600 dark:text-blue-400 mt-1">${car.rentalPrice} / day</p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmitBooking} className="space-y-5">
          
          {/* Driver Option */}
          <div>
            <label className="flex items-center text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
              <UserCheck className="w-4 h-4 text-blue-500 mr-2" />
              Chauffeur / Professional Driver Needed?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDriverNeeded('No')}
                className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                  driverNeeded === 'No'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                No (Self Drive)
              </button>
              <button
                type="button"
                onClick={() => setDriverNeeded('Yes')}
                className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                  driverNeeded === 'Yes'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                Yes (Add Chauffeur)
              </button>
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label className="flex items-center text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
              <MessageSquare className="w-4 h-4 text-indigo-500 mr-2" />
              Special Notes / Pick-up Instructions
            </label>
            <textarea
              rows={3}
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Flight arrival time, child seat requirement..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            ></textarea>
          </div>

          {/* Guarantee Note */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Instant booking confirmation with zero hidden fees.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming...' : 'Confirm Book Now'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default BookingModal;
