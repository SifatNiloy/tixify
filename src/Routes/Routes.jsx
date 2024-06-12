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
        path: "/event",
        element: <EventDetailsPage/>,
      },
      {
        path: "/booking",
        element: <BookingPage/>,
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
        {/* <Dashboard /> */}
      </PrivateRoutes>
    ),
    children: [
      {
        path: "userhome",
        // element: <UserHome />,
      },
      {
        path: "adminhome",
        element: (
          <AdminRoutes>
            {/* <AdminHome /> */}
          </AdminRoutes>
        ),
      },
      {
        path: "myorders",
        // element: <MyOrders />,
      },
      {
        path: "reservation",
        // element: <Reservation />,
      },
      {
        path: "payment",
        // element: <Payment />,
      },
      {
        path: "allusers",
        // element: <AllUsers />,
      },
      {
        path: "addItem",
        element: (
          <AdminRoutes>
            {/* <AddItem /> */}
          </AdminRoutes>
        ),
      },
      {
        path: "manageproducts",
        element: (
          <AdminRoutes>
            {/* <ManageProducts /> */}
          </AdminRoutes>
        ),
      },
    ],
  },
]);