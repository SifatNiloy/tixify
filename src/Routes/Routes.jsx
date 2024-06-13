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
        path:"/login", 
        element: <Login/>,
      },
      {
        path:"/register", 
        element: <Register />,
      },

      
      {
        path: "/private",
        element: (
          <PrivateRoutes>

          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        {/* <Events></Events> */}
      </PrivateRoutes>
    ),
    children: [
      {
        path: "userhome",
        
      },
      
    ],
  },
]);