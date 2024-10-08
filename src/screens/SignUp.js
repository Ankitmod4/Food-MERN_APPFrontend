import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BackendURl } from '../Helper/Helper';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState(''); 

  const handlesubmit= async(e) => {
    e.preventDefault();
    try {
      const  res = await axios.post(`${BackendURl}/api/v1/signupdata`, {
        name, email, password,
      });
      setname ('');
      setemail ('');
      setpassword('');
    
      if (res.data.success) {
 
        toast.success("Profile Created Successfully");
        setTimeout(()=>{
          navigate('/login')

        },2000)
      }
      else {
        toast.error('not created');
      }
      
    }
    catch (err) { 
      
      toast.error('Error submitting form:', err);
    }
    
  }
  
    
  return (
      <div  >
      <div className='container'>
        <ToastContainer />
          <form onSubmit={handlesubmit}> 
                  
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => 
              setname(e.target.value)
    } maxLength={15} minLength={3} /> 
     
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email}   onChange={(e) => 
              setemail(e.target.value)
    }/> 
   
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={password} maxLength={12} minLength={8} onChange={(e) => 
              setpassword(e.target.value)
    }/>
  </div>
                       
   
                  <button type="submit" className="btn btn-primary">Submit</button>
                  
                  <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
</form>
    </div>
              </div>
  )
} 

export default SignUp