
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Ticket Booking App. All rights reserved.</p>
        <p>
          <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a> | 
          <a href="/terms" className="hover:text-gray-400"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
