// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const event = {
    id,
    name: "Concert",
    price: 50 // Price per ticket in USD
  };

  const handleBooking = () => {
    // Handle booking logic
    console.log(`Booked ${quantity} tickets for event ${id}`);
    // Redirect to payment page or confirmation
    navigate(`/payment/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Book Tickets for {event.name}</h1>
      <p className="text-gray-600 mb-4">Price per Ticket: ${event.price}</p>
      <div className="mb-6">
        <label className="block mb-2">Number of Tickets:</label>
        <input 
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button onClick={handleBooking} className="btn btn-primary">
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
