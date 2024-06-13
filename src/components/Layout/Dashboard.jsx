import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaRegCalendarAlt, FaWallet } from "react-icons/fa";
import { MdEventSeat } from "react-icons/md"; 
import { FaTicket } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth"; 

const Dashboard = () => {
  const { user } = useAuth(); 

  const isAdmin = false; 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="bg-gray-800 w-64 py-4 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Logo */}
          <NavLink to="/" className="text-white text-2xl font-bold">
            Tixify
          </NavLink>

          {/* Dashboard Links */}
          <nav className="mt-6 w-full">
            <ul className="space-y-2">
              {isAdmin ? (
                <>
                  <li>
                    <NavLink
                      to="/admin/home"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <AiFillHome className="mr-2" />
                      Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/addEvent"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <FaRegCalendarAlt className="mr-2" />
                      Add Event
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/manageEvents"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <MdEventSeat className="mr-2" />
                      Manage Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/manageUsers"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <FaUsers className="mr-2" />
                      Manage Users
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <AiFillHome className="mr-2" />
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/reservations"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <FaRegCalendarAlt className="mr-2" />
                      Reservations
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/myTickets"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <FaTicket className="mr-2"/>
                      My Tickets
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/paymentHistory"
                      activeClassName="bg-gray-700"
                      className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                    >
                      <FaWallet className="mr-2" />
                      Payment History
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>

        {/* Bottom Links */}
        <div className="pb-4">
          <div className="border-t border-gray-600 mt-4"></div>
          <NavLink
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2 mt-4"
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-4 py-2"
          >
            Events
          </NavLink>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
