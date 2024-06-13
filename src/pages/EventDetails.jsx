// EventDetails.jsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { AuthContext } from '../Providers/AuthProvider';

const EventDetails = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${eventId}`)
      .then(response => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching event details:', error);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src={event.image || 'https://via.placeholder.com/600'}
          alt={event.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
        <div className="text-gray-600 mb-2">
          <FaCalendarAlt className="inline-block mr-1" />
          {new Date(event.date).toLocaleDateString()}
        </div>
        <div className="text-gray-600 mb-2">
          <FaMapMarkerAlt className="inline-block mr-1" />
          {event.location}
        </div>
        <div className="text-gray-600 mb-4">
          <FaTicketAlt className="inline-block mr-1" />
          {event.price ? `${event.price}` : 'Free'}
        </div>
        <p className="text-gray-700 mb-4">{event.description}</p>

        {/* Book Event Button */}
        {user ? (
          <Link
            to={`/booking/${eventId}`} // Ensure this path matches the route in Routes.jsx
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Book Event
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Login to Book
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
