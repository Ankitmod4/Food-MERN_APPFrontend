import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RemoveCart, ClearCart } from "../Redux/Slices/Slice";
import axios from "axios";
import { Link } from "react-router-dom";
import { BackendURl } from "../Helper/Helper";
const MyOrders = () => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch({ type: "SET_CART", payload: savedCart });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleRemoveFromCart = (item) => {
    dispatch(RemoveCart(item));
  };

  const getCurrentDateTime = () => {
    const date = new Date();
    return date.toISOString();
  };

  const handleClick = async () => {
    try {
      const orderData = cart.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity,
        date: getCurrentDateTime(),
      }));

      localStorage.setItem(email, JSON.stringify(orderData));

      const res = await axios.post(`${BackendURl}/api/v1/ordercart`, {
        email, 
        order_data: orderData,
      });

      dispatch(ClearCart());
      console.log("Order successfully posted:", res.data);
      alert("Congratulations Your Order is Placed");
    } catch (error) {
      console.error("Error while posting order:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  return (
    <div>
      <h1>My Orders</h1>
      {cart && cart.length > 0 ? (
        <div className="container">
          <ul
            style={{ listStyle: "none", padding: "30px", marginRight: "50px" }}
            className="d-flex flex-column align-items-center"
          >
            {cart.map((order, index) => (
              <li key={index} className="order-item d-flex align-items-center mb-4">
                <img src={order.img} alt={order.name} width={100} height={100} className="me-3" />
                <div>
                  <h3>{order.name}</h3>
                  <p>Quantity: {order.quantity}</p>
                  <p>Price: ₹{order.price * order.quantity}</p>
                  <button onClick={() => handleRemoveFromCart(order)} className="btn btn-danger">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Total Price: ₹{totalPrice.toFixed(2)}</h2>
          <button onClick={handleClick} className="mx-3 btn btn-primary">
            CHECKOUT
          </button>
          <Link to="/"><button className="btn btn-primary">GO TO HOME PAGE</button></Link>
        </div>
      ) : (
        <div className="text-center">
          <p>No orders found.</p>
          <Link to="/"><button className="btn btn-danger">SHOP NOW</button></Link>
        </div>
      )}
    </div>
  );
};

export default MyOrders;