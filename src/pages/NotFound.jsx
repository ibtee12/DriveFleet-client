import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-6">
        
        {/* Animated Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-28 h-28 rounded-3xl bg-blue-100 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 shadow-xl">
            <Car className="w-14 h-14" />
          </div>
          <span className="absolute -top-2 -right-2 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-full shadow-md">
            404
          </span>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Lost Your Way on the Road?
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
            The page or vehicle location you are looking for doesn't exist, was renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
