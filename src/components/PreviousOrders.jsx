import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PreviousOrders = () => { 
  const [data, setData] = useState([]);
  const eml = localStorage.getItem('email');
    
  const PreviousOrder = async () => {
    try {
      const response = await axios.post('https://food-app-backend-peach.vercel.app/api/v1/previousorder', {
        email: eml
      });
      setData(response.data.data); 
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching previous orders:', error.message);
    }
  };

  useEffect(() => { 
    PreviousOrder();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Previous Orders</h1>
      {data.length === 0 ? (
        <p className="text-center">No previous orders found.</p>
      ) : (
        data.map((prev) => (
          <div className="card mb-3" key={prev._id}>
            <div className="card-header">
              <h5>{prev.email}</h5>
            </div>
            <div className="card-body">
                    {prev.order_data.map((item, index) => {
                    const formattedDate = new Date(item.date).toLocaleDateString();

                       return <div className="row mb-2" key={index}>
                            <div className="col-sm-4"><strong>Name:</strong> {item.name}</div>
                            <div className="col-sm-4"><strong>Quantity:</strong> {item.quantity}</div>
                            <div className="col-sm-4"><strong>Price:</strong> {item.price}</div>
                            <div className='col-sm-4'><strong>Date:</strong>{formattedDate}</div>
                        </div>
                    })}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PreviousOrders;
