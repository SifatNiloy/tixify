// src/pages/EventDetailsPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetailsPage = () => {
  const { id } = useParams();
  // Dummy event details
  const event = {
    id,
    name: "Concert",
    date: "2024-07-15",
    location: "New York",
    description: "A thrilling concert featuring the best artists.",
    ticketsAvailable: 120,
    price: 50 // Assume price in USD
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{event.name}</h1>
      <p className="text-gray-600 mb-4">Date: {event.date}</p>
      <p className="text-gray-600 mb-4">Location: {event.location}</p>
      <p className="text-gray-600 mb-4">Tickets Available: {event.ticketsAvailable}</p>
      <p className="text-gray-600 mb-4">Price: ${event.price}</p>
      <p className="mb-6">{event.description}</p>
      <Link to={`/book/${event.id}`} className="btn btn-primary">
        Book Tickets
      </Link>
    </div>
  );
};

export default EventDetailsPage;
