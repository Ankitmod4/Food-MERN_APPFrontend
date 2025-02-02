import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import { ClearCart } from '../Redux/Slices/Slice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("cart");
    dispatch(ClearCart());
    navigate('/');
    setIsCollapsed(true);
  };

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeNavbar = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success py-2">
      <div className="container-fluid">
        {/* Brand Name */}
        <Link className="navbar-brand fs-2 fst-italic fw-bold px-3" to="/">SPICE CITY</Link>

        {/* Navbar Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={handleToggle} 
          aria-expanded={!isCollapsed} 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
          <ul className="navbar-nav me-auto text-center">
            <li className="nav-item">
              <Link className="nav-link fw-semibold px-3" to="/" onClick={closeNavbar}>Home</Link>
            </li>

            {/* Authenticated User Links */}
            {localStorage.getItem("authToken") && (
              <>
                <li className="nav-item">
                  <Link className="btn btn-light mx-2 my-1 text-dark fw-semibold" to="/myorders" onClick={closeNavbar}>
                    My Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light mx-2 my-1 text-dark fw-semibold" to="/previousorders" onClick={closeNavbar}>
                    Previous Orders
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Authentication Buttons */}
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            {!localStorage.getItem("authToken") ? (
              <>
                <Link className="btn btn-light mx-2 my-1 fw-semibold px-4 py-2" to="/login" onClick={closeNavbar}>
                  Login
                </Link>
                <Link className="btn btn-light mx-2 my-1 fw-semibold px-4 py-2" to="/createuser" onClick={closeNavbar}>
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="btn btn-danger mx-2 my-1 fw-semibold px-4 py-2" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
