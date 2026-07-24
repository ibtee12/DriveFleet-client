import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ExploreCars from '../pages/ExploreCars';
import CarDetails from '../pages/CarDetails';
import AddCar from '../pages/AddCar';
import MyAddedCars from '../pages/MyAddedCars';
import MyBookings from '../pages/MyBookings';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'explore',
        element: <ExploreCars />
      },
      {
        path: 'cars/:id',
        element: <CarDetails />
      },
      {
        path: 'add-car',
        element: (
          <PrivateRoute>
            <AddCar />
          </PrivateRoute>
        )
      },
      {
        path: 'my-added-cars',
        element: (
          <PrivateRoute>
            <MyAddedCars />
          </PrivateRoute>
        )
      },
      {
        path: 'my-bookings',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        )
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
