import { Button } from 'bootstrap'
import React from 'react'
import Browser from '../components/Browser'
import CArd from '../components/CArd'
import Footer from '../components/Footer' 
import Navbar from '../components/Navbar'
import data from '../JSON/foodData2.json'

const Home = () => { 
     
    return (
        <> 
            <div><Navbar /> </div>
            <div><Browser /></div>
            <div> 
                <CArd /> 
                
                
                
              
            </div> 
            <div><Footer /></div>
           
            
            
            
            
          
        </>
    )
}

export default Home