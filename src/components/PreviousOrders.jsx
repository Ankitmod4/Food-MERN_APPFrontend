import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Previous.css'; 

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

  const flattenOrderData = (orderData) => {
    return orderData.reduce((acc, item) => {
      if (Array.isArray(item)) {
        return acc.concat(flattenOrderData(item));
      } else {
        return acc.concat(item);
      }
    }, []);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Previous Orders</h1>
      {data.length === 0 ? (
        <>
        <p className="text-center">No previous orders found.</p>
         <button className='btn btn-primary'> <Link to='/myorders'>ORDER NOW</Link></button>
          </>
      ) : (
        data.map((order, orderIndex) => {
          const flattenedOrderData = flattenOrderData(order.order_data);

          return (
            <div className="card mb-3 card-hover" key={orderIndex}>
              <div className="card-header bg-danger text-white">
                Orders
              </div>
              <div className="card-body card-hover-body" style={{ cursor: 'pointer' }}>
                {flattenedOrderData.length > 0 ? (
                  flattenedOrderData.map((item, itemIndex) => {
                    const formattedDate = new Date(item.date).toLocaleDateString();
                    return (
                      <div className="row mb-2" key={itemIndex}>
                        <div className="col-sm-3"><strong>Name:</strong> {item.name}</div>
                        <div className="col-sm-3"><strong>Quantity:</strong> {item.quantity}</div>
                        <div className="col-sm-3"><strong>Price:</strong> {item.price}</div>
                        <div className="col-sm-3"><strong>Date:</strong> {formattedDate}</div>
                        <hr className='border border-black border-3' />
                        <br />
                      </div>
                    );
                  })
                ) : (
                  <p>No items found for this order.</p>
                )}
              </div>
              <div className="card-footer bg-light">
                <Link className="btn btn-primary" to='/'>Order Again</Link>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PreviousOrders;
