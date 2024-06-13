import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from "react-icons/fa";
import { useAuth } from "../../Providers/AuthProvider"; // Importing useAuth hook to access user and token
import Swal from "sweetalert2";

const BookingForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: user ? user.displayName : "",
    email: user ? user.email : "",
    tickets: 1,
    termsAccepted: false,
  });
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "termsAccepted") {
      setConfirmDisabled(!checked);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      setFormError("Please accept the terms and conditions.");
      return;
    }

    setIsSubmitting(true);

    if (event.price && event.price.toLowerCase() !== "free") {
      // If the event is not free, prompt for payment
      Swal.fire({
        title: "Paid Event",
        text: "It is a paid event. To confirm the booking, you have to pay first. Please proceed to the payment page.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Go to Payment Page",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirecting to the payment page
          navigate(`/payment?eventId=${eventId}&amount=${event.price}`);
        } else {
          setIsSubmitting(false);
        }
      });
    } else {
      // If the event is free, proceed with booking
      try {
        const response = await axios.post(
          "https://tixify-api.sifatniloy.top/bookings",
          {
            eventId,
            eventName: event.title,
            eventDate: event.date,
            eventImage: event.image,
            eventLocation: event.location,
            eventPrice: event.price,
            displayName: formData.name,
            email: formData.email,
            tickets: parseInt(formData.tickets),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Sending the JWT token in the Authorization header
            },
          }
        );
        console.log("Booking successful:", response.data);

        if (response.data.acknowledged === true) {
          Swal.fire({
            title: "Success!",
            text: "Your booking has been successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      } catch (error) {
        console.error("Error booking event:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an issue with your booking. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
          {event.price
            ? event.price.toLowerCase() === "free"
              ? "Free"
              : `$${event.price}`
            : "Free"}
        </div>
        <p className="text-gray-700 mb-4">{event.description}</p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {formError && <p className="text-red-500 mb-4">{formError}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user ? user.displayName : formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user ? user.email : formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tickets"
            >
              Number of Tickets
            </label>
            <input
              type="number"
              id="tickets"
              name="tickets"
              min="1"
              value={formData.tickets}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">
                I agree to the terms and conditions
              </span>
            </label>
          </div>
          <button
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300 ${
              confirmDisabled || isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              !formData.termsAccepted || confirmDisabled || isSubmitting
            }
          >
            {isSubmitting ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
