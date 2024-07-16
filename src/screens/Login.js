import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { BackendURl } from '../Helper/Helper';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [ email, setemail ]= useState('');
  const [ password, setpassword ] = useState('');
  async function handleclick(e) {
    e.preventDefault();
    try {
      const  res =await  axios.post(`${BackendURl}/api/v1/logindata`, {
        email,password
      });
     
      setemail('');
      setpassword('');
      
      if (!res.data.success) {
        alert("Enter Valid Credentials");
      } else { 
        localStorage.setItem("authToken", res.authToken);
        // console.log(res.accessToken);
        localStorage.setItem("email", email);
        console.log(email);
        alert("Login Successfully");
        
        navigate('/');
      }
    }
    catch (err) {
      console.error('Error submitting form:', err);
    }
  }
  return (
    <div>
      
      <form className='m-3 ' onSubmit={handleclick}>
      <div className='container'>
  <div  className="form-group mb-3 ">
    <label for="Email" className='mb-3'>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => {
              setemail(e.target.value);
    }}/>
    
  </div>
  <div className="form-group mb-3">
    <label for="Password" className='mb-3'>Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} placeholder="Password" onChange={(e) => {
              setpassword(e.target.value)
            }} minLength={8} maxLength={12} />
  </div>  
 
          <button type="submit mb-3" className="btn btn-primary">Submit</button>
          <Link to='/createuser' className='m-3 btn btn-danger'>Not A User</Link>
        </div>
      </form>
      
    </div>
  )
}

export default Login