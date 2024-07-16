import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'
import { RemoveCart, ClearCart, AddCart } from '../Redux/Slices/Slice';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
   
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/');
    setIsCollapsed(true);  
    dispatch(ClearCart()); 
    localStorage.removeItem('email'); 
    localStorage.removeItem('cart'); 
  
  };
  

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  }

  const closeNavbar = () => {
    setIsCollapsed(true); 
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic mx-3" to="/">SPICE CITY</Link>
        <button className="navbar-toggler" type="button" onClick={handleToggle} aria-controls="navbarNav" aria-expanded={!isCollapsed} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link className="nav-link mx-3" to="/" onClick={closeNavbar}>Home</Link>
            </li>
            {localStorage.getItem("authToken") ? (
              <li className="nav-item">
                <Link className="btn bg-white mx-3" to="/myorders" onClick={closeNavbar}>My Orders</Link>
                <Link className="btn bg-white mx-3" to="/previousorders" >Previous Orders</Link>
                
              </li>
            ) : " "}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white m-3" to="/login" onClick={closeNavbar}>Login</Link>
              <Link className="btn bg-white m-3" to="/createuser" onClick={closeNavbar}>SignUp</Link>
            </div>
          ) : (
            <div>
              <button className="m-3 btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
