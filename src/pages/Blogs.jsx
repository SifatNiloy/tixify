import React from 'react';
import { Link } from 'react-router-dom';

const placeholderImage = 'https://via.placeholder.com/400x250'; // Placeholder image URL

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Mastering Event Booking: A Comprehensive Guide",
      description: "Dive into the world of event booking with our comprehensive guide. Whether you're planning a concert, conference, or family outing, this post covers everything from choosing the right venue to managing ticket sales effectively. Learn insider tips and industry best practices to make your next event booking a success.",
    },
    {
      id: 2,
      title: "Top 10 Must-Attend Events This Season",
      description: "Discover the hottest events happening this season with our curated list. From music festivals to art exhibitions, we've handpicked the top 10 events you don't want to miss. Explore what makes each event unique, how to secure your tickets early, and tips for maximizing your experience.",
    },
    {
      id: 3,
      title: "Event Ticketing Strategies: How to Sell Out Your Event",
      description: "Unlock the secrets to selling out your event with our expert ticketing strategies. Whether you're an event organizer or marketer, learn proven techniques to boost ticket sales, create compelling promotions, and leverage social media effectively. Stay ahead of the competition and ensure your event is a sell-out success.",
    },
    {
      id: 4,
      title: "Planning a Corporate Retreat: Tips for Seamless Execution",
      description: "Plan a memorable corporate retreat that leaves a lasting impression. This post covers essential steps for organizing a successful corporate getaway, from choosing the ideal location to planning team-building activities. Gain insights into managing logistics, accommodating diverse needs, and fostering team cohesion.",
    },
    {
      id: 5,
      title: "Family-Friendly Events: Where Fun Meets Entertainment",
      description: "Explore family-friendly events that offer fun and entertainment for all ages. Whether you're looking for educational workshops, outdoor adventures, or cultural festivals, discover events that cater to families. Learn how to plan a day out with kids, find kid-friendly amenities, and create lasting memories together.",
    },
    {
      id: 6,
      title: "The Rise of Virtual Events: Navigating the Digital Frontier",
      description: "Delve into the world of virtual events and discover how technology is reshaping the event industry. From virtual conferences to online workshops, explore the benefits of hosting and attending virtual events. Learn how to engage participants, ensure smooth technical execution, and leverage virtual platforms.",
    }
  ];

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover object-center" src='https://www.eventbookings.com/wp-content/uploads/2024/01/eb-logo-1200x675-1.jpg' alt={post.title} />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <Link
                to={`/blog/${post.id}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
