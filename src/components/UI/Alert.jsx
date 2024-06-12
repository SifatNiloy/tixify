// src/components/UI/Alert.jsx
import React from 'react';

const Alert = ({ type, message }) => {
  const alertType = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  return (
    <div className={`${alertType} text-white p-2 rounded-lg mb-4 text-center`}>
      {message}
    </div>
  );
};

export default Alert;
