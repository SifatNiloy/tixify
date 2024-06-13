import React from 'react';
import Rating from 'react-rating-stars-component';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    rating: 4,
    review: 'Great service and easy to use!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 5,
    review: 'Awesome experience. Will definitely use again!',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    rating: 3,
    review: 'Good service, but could be better.',
  },
  {
    id: 4,
    name: 'Emily Davis',
    rating: 5,
    review: 'Absolutely fantastic! Highly recommended.',
  },
  {
    id: 5,
    name: 'Sophia Brown',
    rating: 4.5,
    review: 'Very pleased with the overall experience.',
  },
  
];

const Testimonials = () => {
  return (
    <div className="testimonials container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            <Rating
              count={5}
              value={testimonial.rating}
              size={24}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="text-gray-700 mt-2">{testimonial.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
