import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Image, DollarSign, MapPin, Tag, Users, FileText, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    carModel: '',
    rentalPrice: '',
    carType: 'SUV',
    imageUrl: '',
    seatCapacity: 5,
    location: '',
    description: '',
    availability: 'Available'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const jwtToken = localStorage.getItem('drivefleet-jwt');

    const payload = {
      ...formData,
      rentalPrice: Number(formData.rentalPrice),
      seatCapacity: Number(formData.seatCapacity),
      userEmail: user?.email,
      userName: user?.displayName || 'DriveFleet Owner'
    };

    try {
      const res = await axios.post(`${API_URL}/cars`, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        withCredentials: true
      });

      if (res.data?.success) {
        toast.success('Car listing added successfully!');
        navigate('/my-added-cars');
      } else {
        toast.error('Failed to add car listing');
      }
    } catch (error) {
      console.error('Add Car Error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit car listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-2 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>New Vehicle Listing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          List Your Car on DriveFleet
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Earn passive income by sharing your vehicle with verified renters across the country.
        </p>
      </div>

      {/* Form Container */}
      <div className="p-8 md:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Car Name / Model */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Car Model & Name *
              </label>
              <input
                type="text"
                name="carModel"
                placeholder="e.g. Porsche 911 Carrera S"
                value={formData.carModel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            </div>

            {/* Daily Price */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Daily Rent Price ($) *
              </label>
              <input
                type="number"
                name="rentalPrice"
                placeholder="e.g. 150"
                value={formData.rentalPrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Car Type */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Category *
              </label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold cursor-pointer"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            {/* Seat Capacity */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Seats *
              </label>
              <input
                type="number"
                name="seatCapacity"
                placeholder="e.g. 5"
                value={formData.seatCapacity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                Status *
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold cursor-pointer"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Pickup Location *
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Los Angeles International Airport / Downtown LA"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Car Image URL (Direct / ImgBB / Unsplash) *
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Description & Features *
            </label>
            <textarea
              rows={4}
              name="description"
              placeholder="Highlight special features (e.g., heated seats, panoramic roof, autopilot)..."
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
            ></textarea>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm shadow-xl shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing Listing...' : 'Publish Car Listing'}
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AddCar;
