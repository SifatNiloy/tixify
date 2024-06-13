import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentPage = () => {
  const { id } = useParams();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = () => {
    // Basic validation implementing
    if (cardNumber.length !== 16 || cvv.length !== 3 || expiry.length !== 5) {
      setError('Please enter valid card details.');
      return;
    }

    // Handling payment logic
    console.log(`Paid for event ${id} with card ${cardNumber}`);
    setPaymentSuccess(true);
    Swal.fire({
      title: 'Payment Successful!',
      text: `You have successfully paid for event ${id}.`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Payment for Event {id}</h1>
        
        {paymentSuccess ? (
          <p className="text-center text-green-600 font-semibold">Payment Successful!</p>
        ) : (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
            {error && <p className="text-red-500">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number:</label>
              <input 
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date:</label>
                <input 
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="MM/YY"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV:</label>
                <input 
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 transition duration-200"
            >
              Pay Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
