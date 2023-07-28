import React, { useEffect, useRef, useState } from 'react';

import './Bag.css';
import './Checkout.css';
import FilterSanity from '../../helpers/FilterSanity';
import { Link } from 'react-router-dom';

import { BiChevronRight } from 'react-icons/bi';
import ItemDetails from './ItemDetails';

import Checkout from './Checkout';
import { PostMongo } from '../../helpers/PostMongo';
import { FetchMongo } from '../../helpers/FetchMongo';
import Loader from '../../Components/Loader/Loader';

const Bag = ({ Products }) => {
  document.title = 'NRKids | Bag';
  const { filtersanity, filteredItems } = FilterSanity();
  const { fetchcartData, cartItems } = FetchMongo();
  const { deleteCartItem } = PostMongo();
  const renderCountRef = useRef(0);

  const [data, setData] = useState('');
  const [renderCount, setCount] = useState(0);

  useEffect(() => {
    if (renderCount === 2) {
      fetchcartData();
    } else {
      setCount(2);
    }
  }, [renderCount]);

  useEffect(() => {
    filtersanity(cartItems, Products);
  }, [cartItems, Products]);

  const handleDelete = async (index) => {
    await deleteCartItem(cartItems[index].productId);
    fetchcartData();
  };

  const handleDataChange = (newData) => {
    setData(newData);
  };
  return (
    <div className="Parent__Cart" ref={renderCountRef}>
      <div className="shopping__cart w-100 p-4">
        <div>
          <p className="cart__path d-flex justify-content-start align-items-center">
            <Link to="/">Home </Link>
            <BiChevronRight /> Shopping cart
          </p>
          <div className="cart-header d-flex align-items-center pb-3">
            <h1>Shopping cart</h1>
          </div>
        </div>
        {cartItems ? (
          cartItems && filteredItems.length === 0 ? (
            <div className="no__items w-100">
              <img src="./Assets/empty.png" alt="" />
              <h3>No items in the Bag</h3>
            </div>
          ) : (
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
                <div className="cart_item__section d-flex flex-column-reverse">
                  {filteredItems &&
                    filteredItems.map((item, index) => {
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
                              <p
                                onClick={() => handleDelete(index)}
                                className="m-0"
                              >
                                Remove
                              </p>
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
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Bag;
