// src/components/UI/Input.jsx
import React from 'react';

const Input = React.forwardRef(({ type, placeholder, name, value, onChange, className }, ref) => (
  <input
    ref={ref}
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`border rounded-lg p-2 w-full ${className}`}
  />
));

export default Input;
