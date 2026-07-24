import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Tag, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Info,
  UserCheck
} from 'lucide-react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingModal from '../components/BookingModal';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fallbackCars = [
  {
    _id: "66901a1b2c3d4e5f6a7b8c01",
    carModel: "Tesla Model S Plaid",
    rentalPrice: 180,
    carType: "Electric",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80",
    seatCapacity: 5,
    location: "Los Angeles, CA",
    description: "Tri-motor all-wheel drive with unmatched acceleration and futuristic tech suite.",
    availability: "Available",
    bookingCount: 14,
    dateAdded: new Date().toISOString(),
    userEmail: "demo@drivefleet.com",
    userName: "DriveFleet Demo"
  },
  {
    _id: "66901a1b2c3d4e5f6a7b8c02",
    carModel: "Porsche 911 Carrera S",
    rentalPrice: 250,
    carType: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
    seatCapacity: 2,
    location: "Miami, FL",
    description: "Iconic sports car performance with precision handling and timeless design aesthetics.",
    availability: "Available",
    bookingCount: 22,
    dateAdded: new Date().toISOString(),
    userEmail: "demo@drivefleet.com",
    userName: "DriveFleet Demo"
  },
  {
    _id: "66901a1b2c3d4e5f6a7b8c03",
    carModel: "Range Rover Autobiography",
    rentalPrice: 210,
    carType: "SUV",
    imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    seatCapacity: 7,
    location: "New York, NY",
    description: "Peerless luxury SUV experience equipped with panoramic roof and massage seats.",
    availability: "Available",
    bookingCount: 9,
    dateAdded: new Date().toISOString(),
    userEmail: "demo@drivefleet.com",
    userName: "DriveFleet Demo"
  },
  {
    _id: "66901a1b2c3d4e5f6a7b8c04",
    carModel: "BMW M5 Competition",
    rentalPrice: 195,
    carType: "Sedan",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    seatCapacity: 5,
    location: "Chicago, IL",
    description: "Executive high-performance sedan offering 617 horsepower and executive comfort.",
    availability: "Available",
    bookingCount: 18,
    dateAdded: new Date().toISOString(),
    userEmail: "demo@drivefleet.com",
    userName: "DriveFleet Demo"
  },
  {
    _id: "66901a1b2c3d4e5f6a7b8c05",
    carModel: "Mercedes-AMG G 63",
    rentalPrice: 290,
    carType: "SUV",
    imageUrl: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=800&q=80",
    seatCapacity: 5,
    location: "Las Vegas, NV",
    description: "The classic G-Wagon styling with twin-turbo V8 rumble and unmatched road prestige.",
    availability: "Available",
    bookingCount: 31,
    dateAdded: new Date().toISOString(),
    userEmail: "demo@drivefleet.com",
    userName: "DriveFleet Demo"
  },
  {
    _id: "66901a1b2c3d4e5f6a7b8c06",
    carModel: "Audi RS e-tron GT",
    rentalPrice: 200,
    carType: "Electric",
    imageUrl: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
    seatCapacity: 4,
    location: "San Francisco, CA",
    description: "Sculpted electric grand tourer featuring lightning-fast charging and dynamic matrix LEDs.",
    availability: "Available",
    bookingCount: 11,
    dateAdded: new Date().toISOString(),
    userEmail: "demo@drivefleet.com",
    userName: "DriveFleet Demo"
  }
];

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const fetchCarDetails = async () => {
    try {
      const res = await axios.get(`${API_URL}/cars/${id}`);
      if (res.data) {
        setCar(res.data);
      } else {
        const found = fallbackCars.find(c => c._id === id || c.carModel.toLowerCase().includes('range'));
        setCar(found || fallbackCars[2]);
      }
    } catch (error) {
      console.warn('Car details fetch fallback engaged:', error.message);
      const found = fallbackCars.find(c => c._id === id || c.carModel.toLowerCase().includes('range'));
      setCar(found || fallbackCars[2]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const handleBookNowClick = () => {
    if (!user) {
      toast.error('Please login to book a car');
      navigate('/login', { state: { from: `/cars/${id}` } });
      return;
    }
    setIsBookingModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading vehicle specifications..." />;
  }

  if (!car) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Car Not Found</h2>
        <p className="text-slate-500">The requested car listing does not exist or has been removed.</p>
        <Link to="/explore" className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-sm">
          Return to Fleet
        </Link>
      </div>
    );
  }

  const isAvailable = car.availability === 'Available' || car.availability === 'available' || car.availability === true;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        type="button"
        className="inline-flex items-center space-x-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to fleet</span>
      </button>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Image & Badges */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 group">
            <img
              src={car.imageUrl}
              alt={car.carModel}
              className="w-full h-[400px] lg:h-[480px] object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80";
              }}
            />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5 text-blue-400" />
                <span>{car.carType}</span>
              </span>
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md ${
                isAvailable ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
              }`}>
                {isAvailable ? 'Available' : 'Booked'}
              </span>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Capacity</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{car.seatCapacity || 5} Seats</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <MapPin className="w-5 h-5 text-amber-500 mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Location</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{car.location}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center">
              <Calendar className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <p className="text-xs text-slate-500 font-medium">Bookings</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{car.bookingCount || 0} Total</p>
            </div>
          </div>
        </div>

        {/* Right Col: Details & Action Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                {car.carType} Vehicle
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {car.carModel}
              </h1>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-white">${car.rentalPrice}</span>
                <span className="text-sm font-semibold text-slate-500"> / day</span>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-full">
                Insurance Included
              </span>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                <Info className="w-4 h-4 text-blue-500 mr-2" />
                Vehicle Overview
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {car.description || "Pristine luxury vehicle available for daily and weekly rentals. Serviced regularly and fully sanitized prior to each booking."}
              </p>
            </div>

            {/* Owner Info */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Listed by: <strong className="text-slate-800 dark:text-slate-200">{car.userName || car.userEmail || 'DriveFleet Owner'}</strong></span>
              <span>Added: {car.dateAdded ? new Date(car.dateAdded).toLocaleDateString() : 'Recent'}</span>
            </div>

            {/* Book CTA */}
            <button
              onClick={handleBookNowClick}
              disabled={!isAvailable}
              type="button"
              className={`w-full py-4 rounded-2xl font-extrabold text-base shadow-xl transition-all ${
                isAvailable
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 hover:-translate-y-0.5'
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isAvailable ? 'Book Now' : 'Currently Unavailable'}
            </button>

            <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Free cancellation up to 24h before pickup</span>
            </div>

          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        car={car}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onBookingSuccess={() => {
          fetchCarDetails();
        }}
      />

    </div>
  );
};

export default CarDetails;
