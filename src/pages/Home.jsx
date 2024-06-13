import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaInfoCircle } from 'react-icons/fa';
import hero1 from '../assets/images/hero-1-cropped.jpg';
import axios from 'axios'; // Using axios for HTTP requests
import Events from './Events';
import Testimonials from './Testimonials';
import Blogs from './Blogs';
import Newsletter from './Newsletter';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetching data from the backend
    axios.get('http://localhost:5000/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section
        className="hero bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down drop-shadow-2xl" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
            Welcome to Ticket Booking
          </h1>
          <p className="text-lg md:text-2xl mb-6 animate-fade-in-up">Book your tickets for the best events near you!</p>
          <Link
            to="/events"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Explore Events
          </Link>
        </div>
      </section>

      <Events/>
      <Testimonials/>
      <Blogs />
      <Newsletter/>
    </div>
  );
};

export default Home;
