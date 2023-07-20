import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BiChevronRight } from 'react-icons/bi';

import { UseAuthContext } from '../../../hooks/useAuthContext';

import ItemDetails from './ItemDetails';
import Checkout from './Checkout';
import './CartSection.css';
import { PostMongo } from '../../../BackOps/PostMongo';

const CartSection = ({ SanityProducts, cartItems }) => {
  const { user } = UseAuthContext();
  const { updateWishlist } = PostMongo();

  const handleDelete = async (index) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/${user._id}/cart/${cartItems[index].productId}`
      );
      window.location.reload();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const [data, setData] = useState('');

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleWishlist = async (index) => {
    console.log(cartItems[index].productId);
    await updateWishlist(cartItems[index].productId);
    handleDelete(index);
  };

  return (
    <div className="cart- p-4">
      <div className="cart__path">
        <p className="d-flex justify-content-start align-items-center gap-2">
          <Link to="/">Home </Link>
          <BiChevronRight /> Shopping cart
        </p>
        <div className="cart-header d-flex justify-content-between align-items-center py-3">
          <h1>Shopping cart</h1>
        </div>
      </div>
      <div className="cart__body d-flex justify-content-between gap-5">
        <div className="d-flex flex-column">
          <div className="cart-sub-header d-flex mb-4">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>
          <div className="cart-item-section d-flex flex-column">
            {SanityProducts &&
              SanityProducts.map((item, index) => {
                return (
                  <div className="cart__item d-flex" key={index}>
                    <div className="cart-box d-flex justify-content-flex-start  position-relative">
                      <ItemDetails
                        items={item}
                        index={index}
                        cartItems={cartItems}
                        onDataChange={handleDataChange}
                      />

                      <div className="cart__buttons d-flex position-absolute">
                        <p onClick={() => handleWishlist(index)}>
                          Move to wishlist
                        </p>
                        <p onClick={() => handleDelete(index)}>Remove</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <Checkout cartItems={cartItems} data={data} />
      </div>
    </div>
  );
};

export default CartSection;
