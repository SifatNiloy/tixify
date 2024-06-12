import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Ticket Booking App
        </Link>
        <div className="flex items-center">
          <Link
            to="/dashboard"
            className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            to="/"
            className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/event"
            className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300"
          >
            Event Details
          </Link>
          <Link
            to="/booking"
            className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300"
          >
            Book Tickets
          </Link>
          <Link
            to="/payment"
            className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300"
          >
            Payment
          </Link>

          {user ? (
            <div className="relative ml-4">
              <button
                onClick={toggleDropdown}
                className="text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                <div className="relative ml-4 flex items-center">
                  <img
                    className="rounded-full md:w-2/3 lg:w-1/4 pr-2"
                    src={user.photoURL}
                    alt=""
                  />
                  <span className="text-lg font-medium">
                    {user.displayName}
                  </span>
                </div>
              </button>
              {dropdownOpen && (
                <ul className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <li>
                    <Link
                      to="/userProfile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200"
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="mx-4 text-lg font-medium hover:text-gray-200 transition duration-300"
              >
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
