import React, { useState, useEffect } from 'react';
import { X, Edit3, Image, DollarSign, MapPin, Tag, Users, FileText, Upload, Link as LinkIcon } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const EditCarModal = ({ car, isOpen, onClose, onUpdateSuccess }) => {
  const [imageMode, setImageMode] = useState('url');
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        toast.success('New image loaded from device!');
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (car) {
      setFormData({
        carModel: car.carModel || '',
        rentalPrice: car.rentalPrice || '',
        carType: car.carType || 'SUV',
        imageUrl: car.imageUrl || '',
        seatCapacity: car.seatCapacity || 5,
        location: car.location || '',
        description: car.description || '',
        availability: car.availability || 'Available'
      });
    }
  }, [car]);

  if (!isOpen || !car) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const jwtToken = localStorage.getItem('drivefleet-jwt');

    try {
      const res = await axios.patch(`${API_URL}/cars/${car._id}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        withCredentials: true
      });

      if (res.data?.success) {
        toast.success('Car details updated successfully!');
        onClose();
        if (onUpdateSuccess) onUpdateSuccess();
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      console.error('Update Error:', error);
      toast.error(error.response?.data?.message || 'Error updating car details');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 overflow-y-auto max-h-[90vh]">
        
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
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Update Car Listing</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Modify rental specifications and status</p>
          </div>
        </div>

        <form onSubmit={handleSubmitUpdate} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Model Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Car Model
              </label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Daily Price ($)
              </label>
              <input
                type="number"
                name="rentalPrice"
                value={formData.rentalPrice}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Car Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              >
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>

            {/* Seats */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Seats
              </label>
              <input
                type="number"
                name="seatCapacity"
                value={formData.seatCapacity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Availability
              </label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Pickup Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
            />
          </div>

          {/* Image Input Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Vehicle Image
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
                value={formData.imageUrl}
                onChange={handleChange}
                required={!formData.imageUrl}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
              />
            ) : (
              <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-blue-500 transition-colors bg-slate-50/50 dark:bg-slate-950/50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Click to select new image from device
                </p>
              </div>
            )}

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 mt-2 bg-slate-100 dark:bg-slate-800">
                <img src={formData.imageUrl} alt="Vehicle Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold"
            ></textarea>
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
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default EditCarModal;
