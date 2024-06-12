import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import notFoundImage from '../assets/images/not-found.png'; 

const Notfound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
      <div className="text-center animate-fade-in">
        <img 
          src={notFoundImage} 
          alt="404 Not Found" 
          className="w-64 md:w-96 mx-auto mb-6"
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl md:text-2xl mb-6">Oops! The page you are looking for does not exist.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-white text-pink-600 font-semibold rounded-md hover:bg-gray-100 transition duration-300 shadow-lg"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
