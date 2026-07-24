import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Tag, ArrowRight, Star, Calendar } from 'lucide-react';

const CarCard = ({ car }) => {
  const {
    _id,
    carModel,
    rentalPrice,
    carType,
    imageUrl,
    seatCapacity,
    location,
    availability,
    bookingCount
  } = car;

  const isAvailable = availability === 'Available' || availability === 'available' || availability === true;

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
      
      {/* Image Container with Fixed Height */}
      <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={imageUrl || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"}
          alt={carModel}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-md">
          <Tag className="w-3 h-3 text-blue-400" />
          <span>{carType || 'Luxury'}</span>
        </div>

        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-md ${
          isAvailable 
            ? 'bg-emerald-500/90 text-white' 
            : 'bg-rose-500/90 text-white'
        }`}>
          {isAvailable ? 'Available' : 'Booked'}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-6">
        
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {carModel}
          </h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 mb-4 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
          <div className="flex items-center space-x-1.5">
            <Users className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{seatCapacity || 5} Seats</span>
          </div>
          <div className="flex items-center space-x-1.5 truncate">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="truncate">{location || 'Los Angeles, CA'}</span>
          </div>
          <div className="flex items-center space-x-1.5 col-span-2 mt-1">
            <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{bookingCount || 0} Total Bookings</span>
          </div>
        </div>

        {/* Price & CTA Push to bottom */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white">${rentalPrice}</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400"> / day</span>
          </div>

          <Link
            to={`/cars/${_id}`}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all duration-200 group-hover:px-5"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default CarCard;
