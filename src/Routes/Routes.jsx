import { createBrowserRouter } from "react-router-dom";
import Main from "../components/Layout/Main";
import Notfound from "../pages/Notfound";
import Home from "../pages/Home";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import EventDetailsPage from "../pages/EventDetails";
import BookingPage from "../pages/BookingPage";
import PaymentPage from "../pages/PaymentPage";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Events from "../pages/Events";
import BookedEvents from "../components/Dashboard/BookedEvents";
import Dashboard from "../components/Layout/Dashboard";
import AllBookings from "../components/Dashboard/AllBookings";
import MyTickets from "../components/Dashboard/MyTickets";
import PaymentHistory from "../components/Dashboard/PaymentHistory";




export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Notfound></Notfound>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/events/:eventId", // Dynamic route for event details
        element: <EventDetailsPage />,
      },
      {
        path: "/booking",
        element: <BookingPage/>,
      },
      {
        path: '/booking/:eventId', // Dynamic route for booking
        element: <BookingPage />,
      },
      {
        path: "/events",
        element: <Events/>,
      },
      {
        path: "/payment",
        element: <PaymentPage/>,
      },
      {
        path: "/bookedevents",
        element: <BookedEvents/>,
      },
      {
        path:"/login", 
        element: <Login/>,
      },
      {
        path:"/register", 
        element: <Register />,
      },
      {
        path:"/dashboard", 
        element: <Dashboard />,
      },
      {
        path: "reservations",
        element: <AllBookings />,
      },
      {
        path: "mytickets",
        element: <MyTickets />,
      },
      {
        path: "paymenthistory",
        element: <PaymentHistory/>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      
      {
        path: "reservations",
        element: <AllBookings />,
      },
      
    ],
  },
]);