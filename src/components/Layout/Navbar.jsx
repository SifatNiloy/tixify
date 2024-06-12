import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
   
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Ticket Booking App
        </Link>
        <div className="flex items-center">
          <Link to="/dashboard" className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300">
            Dashboard
          </Link>
          <Link to="/" className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300">
            Home
          </Link>
          <Link to="/event" className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300">
            Event Details
          </Link>
          <Link to="/booking" className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300">
            Book Tickets
          </Link>
          <Link to="/payment" className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300">
            Payment
          </Link>
          {isLoggedIn ? (
            <div className="relative ml-4">
              <div className="flex items-center">
                <img src={user.profileImage} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                <span className="text-lg font-medium">{user.username}</span>
              </div>
              {/* Logout button */}
              <button onClick={handleLogout} className="text-lg font-medium hover:text-gray-200 transition duration-300 ml-2">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
