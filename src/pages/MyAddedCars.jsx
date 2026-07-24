import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Edit, Trash2, PlusCircle, ExternalLink, Calendar, MapPin, Tag } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { useAuth } from '../providers/AuthProvider';
import LoadingSpinner from '../components/LoadingSpinner';
import EditCarModal from '../components/EditCarModal';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const MyAddedCars = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCarToEdit, setSelectedCarToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchUserCars = async () => {
    if (!user?.email) return;
    setLoading(true);
    const jwtToken = localStorage.getItem('drivefleet-jwt');

    try {
      const res = await axios.get(`${API_URL}/cars/user/${user.email}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        },
        withCredentials: true
      });
      setCars(res.data || []);
    } catch (error) {
      console.error('Error fetching user cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCars();
  }, [user]);

  const handleDelete = async (carId, carModel) => {
    const result = await Swal.fire({
      title: `Delete ${carModel}?`,
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete Listing'
    });

    if (result.isConfirmed) {
      const jwtToken = localStorage.getItem('drivefleet-jwt');
      try {
        const res = await axios.delete(`${API_URL}/cars/${carId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`
          },
          withCredentials: true
        });

        if (res.data?.success) {
          toast.success('Car listing deleted');
          fetchUserCars();
        }
      } catch (error) {
        console.error('Delete Error:', error);
        toast.error('Failed to delete car');
      }
    }
  };

  const handleEditClick = (car) => {
    setSelectedCarToEdit(car);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <LoadingSpinner message="Fetching your listed vehicles..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>My Garage Listings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Added Cars ({cars.length})
          </h1>
        </div>

        <Link
          to="/add-car"
          className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
          <FolderKanban className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Listings Found</h3>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">You haven't added any vehicles to DriveFleet yet.</p>
          <Link
            to="/add-car"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car._id}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="relative h-48 bg-slate-100 dark:bg-slate-800">
                <img
                  src={car.imageUrl}
                  alt={car.carModel}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  {car.carType}
                </span>
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ${car.rentalPrice}/day
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{car.carModel}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">{car.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 mb-6 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span className="truncate">{car.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{car.bookingCount || 0} Booked</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Link
                    to={`/cars/${car._id}`}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                    title="View Public Page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditClick(car)}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-100 transition-colors flex items-center space-x-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Update</span>
                    </button>

                    <button
                      onClick={() => handleDelete(car._id, car.carModel)}
                      type="button"
                      className="px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 font-bold text-xs hover:bg-red-100 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <EditCarModal
        car={selectedCarToEdit}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdateSuccess={fetchUserCars}
      />

    </div>
  );
};

export default MyAddedCars;
