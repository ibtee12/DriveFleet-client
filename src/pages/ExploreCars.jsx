import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import axios from 'axios';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const categories = ['All', 'SUV', 'Sedan', 'Luxury', 'Electric', 'Hatchback'];

const ExploreCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('date-desc');

  const fetchCars = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      if (sortOption) params.append('sort', sortOption);

      const res = await axios.get(`${API_URL}/cars?${params.toString()}`);
      setCars(res.data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCars();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortOption('date-desc');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Explore Our Fleet
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl">
          Search and filter through our full lineup of premium vehicles. Find your perfect ride for business, travel, or weekend luxury.
        </p>
      </div>

      {/* Search & Filter Control Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="relative md:col-span-6">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by car name, location, or features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <div className="relative">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="date-desc">Sort: Newest Added</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Category Pills & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {(searchTerm || selectedCategory !== 'All' || sortOption !== 'date-desc') && (
            <button
              onClick={handleResetFilters}
              type="button"
              className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

      </div>

      {/* Results Grid */}
      {loading ? (
        <LoadingSpinner message="Searching DriveFleet database..." />
      ) : cars.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200">No matching vehicles found</p>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">Try adjusting your search terms or category filter.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}

    </div>
  );
};

export default ExploreCars;
