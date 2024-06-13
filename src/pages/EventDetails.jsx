// EventDetails.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";

const EventDetails = () => {
  const { eventId } = useParams(); // Get eventId from the URL
  const { user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use navigate for redirect

  useEffect(() => {
    axios
      .get(`https://tixify-api.sifatniloy.top/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  const handleBookEvent = () => {
    if (user) {
      navigate(`/booking/${eventId}`);
    } else {
      navigate("/login", { state: { from: `/booking/${eventId}` } });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img
          src={event.image || "https://via.placeholder.com/600"}
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
          {event.price ? `${event.price}` : "Free"}
        </div>
        <p className="text-gray-700 mb-4">{event.description}</p>

        {/* Book Event Button */}
        <button
          onClick={handleBookEvent}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
        >
          {user ? "Book Event" : "Login to Book"}
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
