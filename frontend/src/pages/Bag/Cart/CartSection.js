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
    <div className="shopping__cart p-4">
      <div className="cart__path">
        <p className="d-flex justify-content-start align-items-center m-0">
          <Link to="/">Home </Link>
          <BiChevronRight /> Shopping cart
        </p>
        <div className="cart-header d-flex align-items-center py-3">
          <h1>Shopping cart</h1>
        </div>
      </div>
      <div className="cart__body d-flex justify-content-between">
        <div className="w-100 gap-3">
          <div className="cart_item__header mb-3 d-flex justify-content-between">
            <div className="child child1">
              <p>Product</p>
            </div>
            <div className="child child2 d-flex justify-content-between">
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>
          </div>
          <div className="cart_item__section d-flex flex-column">
            {SanityProducts &&
              SanityProducts.map((item, index) => {
                return (
                  <div className="cart__item" key={index}>
                    <div className="cart_box position-relative">
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
                    <hr />
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
