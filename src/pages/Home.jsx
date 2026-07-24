import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Award, Clock, Star, Sparkles, Car } from 'lucide-react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const res = await axios.get(`${API_URL}/cars/featured`);
        setFeaturedCars(res.data || []);
      } catch (error) {
        console.error('Error fetching featured cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedCars();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Banner Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-blue-50/50 via-slate-50 to-transparent dark:from-blue-950/20 dark:via-slate-950 dark:to-slate-950">
        
        {/* Decorative Light Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Next-Gen Mobility Experience</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                Drive Your Ambition with <span className="text-gradient">DriveFleet</span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience freedom with our curated collection of luxury sedans, electric supercars, and rugged SUVs. Transparent pricing, zero hidden fees, and instant online reservations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/explore"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-xl shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3 group transform hover:-translate-y-0.5"
                >
                  <span>Explore Cars</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/explore?category=Electric"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-base hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Zap className="w-5 h-5 text-amber-500" />
                  <span>Electric Fleet</span>
                </Link>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-md mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">100%</p>
                  <p className="text-xs font-semibold text-slate-500">Verified Vehicles</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">24/7</p>
                  <p className="text-xs font-semibold text-slate-500">Roadside Support</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">4.9★</p>
                  <p className="text-xs font-semibold text-slate-500">Client Rating</p>
                </div>
              </div>

            </motion.div>

            {/* Right Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-30 dark:opacity-40 animate-pulse"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
                    alt="DriveFleet Hero Car"
                    className="w-full h-[400px] lg:h-[480px] object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-effect border border-white/20 shadow-xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Featured Vehicle</p>
                        <p className="text-sm font-extrabold text-slate-900 dark:text-white">Tesla Model S Plaid</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800">
                      $180/day
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

      </section>

      {/* Dynamic Available Cars Section (Required >= 6 Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Available Fleet</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Explore Our Top Available Cars
            </h2>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center space-x-2 font-bold text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors group"
          >
            <span>View All Cars</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching available fleet database..." />
        ) : featuredCars.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500">No cars currently listed. Add a car to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Extra Static Section 1: Why Choose DriveFleet */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-14 relative overflow-hidden border border-slate-800 shadow-2xl">
          
          <div className="relative z-10 max-w-3xl space-y-4 mb-12">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              The DriveFleet Distinction
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Why Discerning Drivers Choose Us
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We combine seamless online technology with pristine vehicle maintenance to ensure every journey is smooth and memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            
            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">100% Verified Fleet</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every vehicle undergoes a 150-point safety and cleanliness inspection prior to handing over keys.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Instant Online Booking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                No phone calls required. Reserve your car in under 60 seconds with instant digital confirmation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Chauffeur Service</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Need a driver? Request a licensed executive chauffeur for your business meetings or events.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/60 space-y-3 hover:border-blue-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold">Zero Hidden Charges</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear daily rates with included collision coverage and transparent fuel policy options.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Extra Static Section 2: Fleet Testimonials & Experience */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Trusted By Travelers & Executives
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Read authentic reviews from customers who rented with DriveFleet this season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "Rented the Tesla Model S for a weekend trip down the coast. Car was spotless, keyless pickup was super smooth!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="Marcus Vance"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Marcus Vance</h4>
                <p className="text-xs text-slate-500">Tech Entrepreneur</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "The Range Rover Autobiography made our family road trip so comfortable. DriveFleet's booking process took 2 minutes."
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                alt="Elena Rostova"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Elena Rostova</h4>
                <p className="text-xs text-slate-500">Corporate Director</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              "Listing my Porsche on DriveFleet when I'm out of town has been seamless. The rental income is great!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                alt="David Chen"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">David Chen</h4>
                <p className="text-xs text-slate-500">Fleet Owner</p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
