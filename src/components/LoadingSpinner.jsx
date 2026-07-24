import React from 'react';
import { Car } from 'lucide-react';

const LoadingSpinner = ({ fullScreen = false, message = "Loading DriveFleet..." }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative flex items-center justify-center">
        {/* Glowing aura */}
        <div className="absolute w-16 h-16 rounded-full bg-blue-500/20 dark:bg-blue-400/20 animate-ping"></div>
        {/* Rotating ring */}
        <div className="w-14 h-14 border-4 border-blue-200 dark:border-slate-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        {/* Car icon centered */}
        <Car className="w-6 h-6 text-blue-600 dark:text-blue-400 absolute" />
      </div>
      {message && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;
