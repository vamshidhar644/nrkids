import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { UseAuthContext } from '../../../hooks/useAuthContext';

import { BiChevronRight } from 'react-icons/bi';

import './CartSection.css';
import ItemDetails from './ItemDetails';
import Checkout from './Checkout';

const CartSection = ({ SanityProducts, cartItems }) => {
  const { user } = UseAuthContext();

  const { getImageUrl } = FetchImageUrl();

  const handleDelete = async (index) => {
    console.log(user.id, cartItems[index].productId);

    try {
      await axios.delete(
        `api/user/${user.id}/cart/${cartItems[index].productId}`
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

  return (
    <div className="cart-page d-flex justify-content-between bg-white p-4">
      <div className="cart-items w-100">
        <p className="m-0">
          <Link to="/">Home </Link>
          <BiChevronRight /> Shopping cart
        </p>
        <div className="cart-header d-flex justify-content-between align-items-center pt-4 pb-4">
          <h1>Shopping cart</h1>
        </div>
        <div className="d-flex justify-content-between gap-5">
          <div className="d-flex flex-column w-100">
            <div className="cart-sub-header d-flex justify-content-evenly mb-4">
              <p className="m-0 w-100 d-flex justify-content-center align-items-center text-center">
                Product name
              </p>
              <p className="m-0 w-100 d-flex justify-content-end align-items-center text-center">
                Price
              </p>
              <p className="m-0 w-100 d-flex justify-content-end align-items-center text-center">
                Quantity
              </p>
              <p className="m-0 w-100 d-flex justify-content-center align-items-center text-center">
                Subtotal
              </p>
            </div>
            <div className="cart-item-section d-flex flex-column">
              {SanityProducts &&
                SanityProducts.map((item, index) => {
                  return (
                    <div className="cart-item d-flex" key={index}>
                      <div className="cart-box w-100 d-flex justify-content-flex-start  position-relative">
                        <Link
                          className="cart-image-container overflow-hidden"
                          to={`/${item.dropdownField}/${item.path.current}`}
                          key={index}
                        >
                          <img
                            className="w-100 h-100"
                            src={getImageUrl(item.images[0])}
                            alt=""
                          />
                        </Link>

                        <ItemDetails
                          items={item}
                          index={index}
                          cartItems={cartItems}
                          onDataChange={handleDataChange}
                        />

                        <div className="cart-buttons d-flex position-absolute">
                          <p>Move to wishlist</p>
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
    </div>
  );
};

export default CartSection;
