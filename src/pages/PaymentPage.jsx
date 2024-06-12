// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { id } = useParams();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = () => {
    // Handle payment logic
    console.log(`Paid for event ${id} with card ${cardNumber}`);
    setPaymentSuccess(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Payment for Event {id}</h1>
      {paymentSuccess ? (
        <p className="text-green-600 font-semibold">Payment Successful!</p>
      ) : (
        <>
          <div className="mb-6">
            <label className="block mb-2">Card Number:</label>
            <input 
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Expiry Date:</label>
            <input 
              type="text"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">CVV:</label>
            <input 
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button onClick={handlePayment} className="btn btn-primary">
            Pay Now
          </button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
