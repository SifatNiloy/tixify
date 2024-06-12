import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt, FaInfoCircle } from 'react-icons/fa';
import hero1 from '../assets/images/hero-1.jpg';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/events.json')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section
        className="hero bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">Welcome to Ticket Booking</h1>
          <p className="text-lg md:text-2xl mb-6 animate-fade-in-up">Book your tickets for the best events near you!</p>
          <Link
            to="/events"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Explore Events
          </Link>
        </div>
      </section>

      {/* Events Section */}
      <section className="events py-12 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <div className="text-gray-600 mb-2">
                  <FaCalendarAlt className="inline-block mr-1" />
                  {event.date}
                </div>
                <div className="text-gray-600 mb-2">
                  <FaMapMarkerAlt className="inline-block mr-1" />
                  {event.location}
                </div>
                <div className="text-gray-600 mb-4">
                  <FaTicketAlt className="inline-block mr-1" />
                  {event.price}
                </div>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <Link
                  to={`/events/${event.id}`}
                  className="inline-flex items-center px-3 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                >
                  <FaInfoCircle className="mr-1" />
                  More Info
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
