import React, { useState } from 'react';
import './CartSection.css';

import Checkout from './Checkout';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { UseAuthContext } from '../../../hooks/useAuthContext';

const CartSection = ({ SanityProducts, cartItems }) => {
  const [data, setData] = useState('');
  const { user } = UseAuthContext();

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const { getImageUrl } = FetchImageUrl();

  const handleDelete = async (index) => {
    console.log(user.id, cartItems[index].productId);

    try {
      await axios.delete(
        `api/user/${user.id}/cart/${cartItems[index].productId}`
      );
      window.location.reload();
    } catch (error) {
      // Handle error
      console.error('Error deleting item:', error);
    }
  };

  // console.log(cartItems);

  return (
    <div className="cart-page">
      <div className="cart-items">
        <div className="cart-header">
          <h1>
            Shopping cart <span>deselect all items</span>
          </h1>
          <h2>Price</h2>
        </div>
        <div>
          {SanityProducts &&
            SanityProducts.map((item, index) => {
              return (
                <div className="cart-item" key={index}>
                  <div className="cart-item-box">
                    <Link
                      to={`/new-arrivals/${item.path.current}`}
                      state={{
                        data: item,
                      }}
                      key={index}
                    >
                      <img src={getImageUrl(item.images[0])} alt="" />
                    </Link>
                    {/* <ItemCart
                      index={index}
                      item={item}
                      cartItems={cartItems}
                      sendData={handleDataChange}
                    /> */}
                  </div>

                  <div className="cart-buttons-box">
                    <div className="cart-button">Save for later</div>
                    <div className="cart-button">Buy now</div>
                    <div
                      className="cart-button"
                      onClick={() => handleDelete(index)}
                    >
                      Remove
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Checkout data={data} cartItems={cartItems} />
    </div>
  );
};

export default CartSection;
