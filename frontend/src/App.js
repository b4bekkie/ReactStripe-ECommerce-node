import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './App.css'; // Make sure to create an App.css file for the styles

const App = () => {
  const [product, setProduct] = useState({
    name: 'Black T-Shirt',
    price: 1, 
    productBy: 'Fb',
    description: 'This stylish black shirt is perfect for any occasion.',
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      'Content-Type': 'application/json',
    };
    return fetch('http://localhost:8282/payment', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  };

  return (
    <div className="container">
      <div className="product-card">
        <img
          src="./assest/black.jpeg" 
          alt={product.name}
          className="product-image"
        />
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
        </div>
      </div>

      <StripeCheckout
        stripeKey="pk_test_51NVcW6B203ZwmhDSyoaSkCpHnfZpE82HUdSRaMFE6Nnp5a5BI75sLpXnpA7d4n2Tmz9OjWMGmqeAKgGCgSpfeiMs00vpSyBSVz"
        token={makePayment}
        name={product.name}
        amount={product.price * 100}
        shippingAddress
        billingAddress
      >
        <button className="buy-button">Buy Now</button>
      </StripeCheckout>
    </div>
  );
};

export default App;
