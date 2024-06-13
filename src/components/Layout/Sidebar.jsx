
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white h-screen w-64 flex-shrink-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <ul className="text-lg">
          <li><Link to="/dashboard/userhome" className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300">User Home</Link></li>
          <li><Link to="/dashboard/adminhome" className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300">Admin Home</Link></li>
          <li><Link to="/dashboard/myorders" className="block py-2 px-4 text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300">My Orders</Link></li>
          {/* Add more links for dashboard sections */}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
