import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './screens/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'; 
import Login from './screens/Login';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './screens/SignUp';
import Myorders from './screens/Myorders'; 
import PreviousOrders from './components/PreviousOrders';



 
function App() {
 let token =localStorage.getItem('Token')
  return (
    
      <Router>
        
        <Routes> 
          <Route path="/" element={<Home />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/createuser" element={<SignUp />} />
        <Route path="/myorders" element={<Myorders />} />
       <Route path='/previousorders' element={<PreviousOrders />}/>
        </Routes>
      </Router>
    
  );
}

export default App;
