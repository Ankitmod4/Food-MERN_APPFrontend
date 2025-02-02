import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackendURl } from '../Helper/Helper';
import './Signup.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BackendURl}/api/v1/signupdata`, {
        name,
        email,
        password,
      });

      setName('');
      setEmail('');
      setPassword('');

      if (res.data.success) {
        toast.success('Profile Created Successfully');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error('Profile not created');
      }
    } catch (err) {
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="signup-form-wrapper">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={15}
              minLength={3}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              maxLength={12}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>

          <Link to="/login" className="btn btn-secondary">
            Already a User? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
