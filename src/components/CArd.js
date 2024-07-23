import React, { useState,useEffect } from 'react';
import data from '../JSON/foodData2.json';
import { useSelector, useDispatch } from 'react-redux'; 
import { AddCart } from '../Redux/Slices/Slice';
import AOS from 'aos';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'aos/dist/aos.css';
import { Toast } from 'bootstrap';
const Card = () => {
  const [items, setItems] = useState(data);
  const [filteredItems, setFilteredItems] = useState(data);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    AOS.refresh(); 
  });

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item => item.CategoryName === category);
      setFilteredItems(filtered);
    }
  };

  const generateOptions = () => {
    return Array.from({ length: 10 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>);
  };

  const getSelectOptions = (options) => {
    return Object.entries(options[0]).map(([key, value]) => (
      <option key={key} value={key}>
        {key.toUpperCase()}-₹{value}
      </option>
    ));
  };
 
  const handleAddToCart = (item, size, quantity) => {
    // Check if token is present
    const email = localStorage.getItem('email'); 
    if (!email) {
      toast.error('You need to be logged in to add items to the cart.');
      
      return;
    } 
   
    const selectedPrice = item.options[0][size];  
    const itemToAdd = { ...item, price: selectedPrice, size, quantity };
   
    const isItemInCart = cart.some(cartItem => 
      cartItem.name === itemToAdd.name && cartItem.size === size
    );
  
    if (!isItemInCart) {
      dispatch(AddCart(itemToAdd));
      toast.success('Item added to cart!');
    } else {
      dispatch(AddCart(itemToAdd));
      toast.success('Item is already in the cart. Adding the quantity of that item.');
    }
  };
  

  const handleSizeChange = (index, size) => {
    setSelectedSizes(prevSizes => ({
      ...prevSizes,
      [index]: size,
    }));
  };

  const handleQuantityChange = (index, quantity) => {
    setQuantities(prevQuantities => ({ 
      ...prevQuantities,
      [index]: quantity,
    }));
  };

  return ( 
    <div className='p-3'>
      <ToastContainer />
      <div className="container">
        <div className="row">
          {['Biryani/Rice', 'Starter', 'Pizza', 'All'].map(category => (
            <div className="col-md-6 col-sm-6 col-lg-3 col-6 d-flex"  key={category}>
              <button
                className="btn w-100 p-3 mx-3 mb-3  "
                style={{ backgroundColor: 'grey' }}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='container'>
        <div className="row justify-content-center">
          {filteredItems.map((item, index) => {
            const selectedSize = selectedSizes[index] || Object.keys(item.options[0])[0];
            const quantity = quantities[index] || 1;

            return (
              <div className='col-lg-3 col-sm-12 col-md-6 mt-4 d-flex justify-content-center ' key={index} data-aos='fade-up' >
                <div className='border border-black border-3 rounded p-2 text-center'  >
                  <img src={item.img} width={240} height={200} alt={item.name} />
                  <h3>{item.name}</h3>
                  <div className='d-flex justify-content-around'>
                    <select value={selectedSize} onChange={(e) => handleSizeChange(index, e.target.value)} className='border border-primary border-3 rounded'>
                      {getSelectOptions(item.options)}
                    </select>

                    <select  className='border border-primary border-3 rounded w-20 h-250' value={quantity}  onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))} >
                      {generateOptions()}
                    </select>
                  </div>

                  <div className='d-flex justify-content-center mt-2'>
                    <button
                      className='bg-success text-white p-2 btn btn-primary' 
                      onClick={() => handleAddToCart(item, selectedSize, quantity)}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
