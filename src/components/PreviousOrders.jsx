import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackendURl } from '../Helper/Helper';

const PreviousOrders = () => {
  const [data, setData] = useState([]);
  const eml = localStorage.getItem('email');

  const PreviousOrder = async () => {
    try {
      const response = await axios.get('https://food-app-backend-peach.vercel.app/api/v1/previousorder', {
        eml
      });
        setData(response.data); 
        console.log(response);
    } catch (error) {
      console.error('Error fetching previous orders:', error.message);
    }
  };

  useEffect(() => {
    PreviousOrder();
  }, []);

  return (
    <div>
      <h1>Previous Orders</h1>
      {data.length === 0 ? (
        <p>No previous orders found.</p>
      ) : (
        data.map((prev) => (
          <div key={prev._id}>
            <p>Email: {prev.email}</p>
            <p>Order Data:</p>
            <ul>
              {prev.order_data.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PreviousOrders;
