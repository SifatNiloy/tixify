// src/components/Layout/Main.jsx
import React from 'react';
import { BrowserRouter as Router, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> 
      <Footer />
    </div>
  );
};

export default Main;
