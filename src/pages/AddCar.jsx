import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Image as ImageIcon, DollarSign, MapPin, Tag, Users, FileText, Upload, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AddCar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'file'

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
        toast.success('Image loaded from device!');
      };
      reader.readAsDataURL(file);
    }
  };

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

          {/* Image Input Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Vehicle Image *
              </label>
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    imageMode === 'url' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>Paste URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('file')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    imageMode === 'file' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Device</span>
                </button>
              </div>
            </div>

            {imageMode === 'url' ? (
              <input
                type="url"
                name="imageUrl"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.imageUrl}
                onChange={handleChange}
                required={!formData.imageUrl}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            ) : (
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50/50 dark:bg-slate-950/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Click or drag image file from your device
                </p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
              </div>
            )}

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mt-2 bg-slate-100 dark:bg-slate-800">
                <img src={formData.imageUrl} alt="Vehicle Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  Image Ready
                </span>
              </div>
            )}
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
