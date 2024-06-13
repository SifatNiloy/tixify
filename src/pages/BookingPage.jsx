import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/Dashboard/BookingForm';

const BookingPage = () => {
  const { eventId } = useParams();

  return (
    <div className="container mx-auto px-6 py-12">
      <BookingForm eventId={eventId} />
    </div>
  );
};

export default BookingPage;
