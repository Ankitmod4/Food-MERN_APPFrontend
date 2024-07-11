import React, { useState } from 'react';
import data from '../JSON/foodData2.json';
import { useSelector, useDispatch } from 'react-redux'; 
import { AddCart } from '../Redux/Slices/Slice';

const Card = () => {
  const [items, setItems] = useState(data);
  const [filteredItems, setFilteredItems] = useState(data);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

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
    const selectedPrice = item.options[0][size];  
    const itemToAdd = { ...item, price: selectedPrice, size, quantity };

    console.log("Item to add:", itemToAdd); 
    console.log("Current cart:", cart); 

    const isItemInCart = cart.some(cartItem => 
      cartItem.name === itemToAdd.name && cartItem.size === size
    );

    if (!isItemInCart) {
      dispatch(AddCart(itemToAdd));
    } else {
      // alert('Item is already in the cart.');
      dispatch(AddCart(itemToAdd));
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
      <div className='d-flex justify-content-around col-lg-12'>
        {['Biryani/Rice', 'Starter', 'Pizza', 'All'].map(category => (
          <button
            key={category}
            className='p-12 w-50'
            style={{ height: '70px', color: 'black', backgroundColor: 'grey' }}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='container'>
        <div className="row">
          {filteredItems.map((item, index) => {
            const selectedSize = selectedSizes[index] || Object.keys(item.options[0])[0];
            const quantity = quantities[index] || 1;

            return (
              <div className='col-lg-3 col-sm-12 col-md-6 mt-4 d-flex' key={index}>
                <div className='border border-primary border-1 rounded'>
                  <img src={item.img} width={240} height={200} alt={item.name} />
                  <h3>{item.name}</h3>
                  <div className='d-flex justify-content-around'>
                    <select value={selectedSize} onChange={(e) => handleSizeChange(index, e.target.value)}>
                      {getSelectOptions(item.options)}
                    </select>

                    <select value={quantity} className='w-20 h-250' onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}>
                      {generateOptions()}
                    </select>
                  </div>

                  <div className='justify-content-center d-flex'>
                    <button
                      className='bg-success'
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
