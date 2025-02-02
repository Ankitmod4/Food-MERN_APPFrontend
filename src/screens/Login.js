import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { BackendURl } from '../Helper/Helper';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading,setloading]=useState(false);
    async function handleClick(e) {
    e.preventDefault();
    setError('');
   setloading(true);
    try {
      const res = await axios.post(`${BackendURl}/api/v1/logindata`, {
        email,
        password, 
      });

      setEmail('');
      setPassword('');

      if (!res.data.success) {
        setError(res.data.error || 'Enter Valid Credentials');
        toast.error('ENTER VALID CREDENTIALS');
      } else {
        localStorage.setItem('authToken', res.data.authToken);
        localStorage.setItem('email', email);
        toast.success('LOGIN SUCCESSFULLY');

        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Email and Password are incorrect');
      toast.error('ERROR IN LOGGING IN');
    }
    finally{
      setloading(false);
    }
  }

  return (
    <div className="login-container">
      <ToastContainer />
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form className="login-form" onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            className="form-control" 
            id="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            placeholder="Enter password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            minLength={8} 
            maxLength={12} 
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
  {loading ? <span className="spinner-border spinner-border-sm"></span> : "Login"}
</button>
        <Link to="/createuser" className="btn btn-secondary">Not a User? Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
