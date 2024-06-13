
import React from 'react';

const Button = ({ type, onClick, children, className, disabled }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors duration-300 ${className}`}
  >
    {children}
  </button>
);

export default Button;
