import React, { useEffect, useState } from 'react';

import './Bag.css';
import './Checkout.css';
import FilterSanity from '../../BackOps/FilterSanity';
import { Link } from 'react-router-dom';

import { BiChevronRight } from 'react-icons/bi';
import ItemDetails from './Cart/ItemDetails';

import Checkout from './Cart/Checkout';
import { PostMongo } from '../../BackOps/PostMongo';
import { FetchMongo } from '../../BackOps/FetchMongo';

const Bag = ({ Products }) => {
  const { filtersanity, filteredItems } = FilterSanity();
  const { fetchcartData, cartItems } = FetchMongo();
  const { deleteCartItem } = PostMongo();

  const [data, setData] = useState('');

  useEffect(() => {
    fetchcartData();
  }, []);

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
    <div className="Parent__Cart">
      <div className="shopping__cart w-100 p-4">
        <div className="cart__path">
          <p className="d-flex justify-content-start align-items-center">
            <Link to="/">Home </Link>
            <BiChevronRight /> Shopping cart
          </p>
          <div className="cart-header d-flex align-items-center pt-4 pb-3">
            <h1>Shopping cart</h1>
          </div>
        </div>
        {cartItems ? (
          <>
            {cartItems.length !== 0 ? (
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
            ) : (
              <>
                <div className="no__items w-100">
                  <img src="./Assets/empty.png" alt="" />
                  <h3>No items in the Bag</h3>
                </div>
              </>
            )}
          </>
        ) : (
          <>loading</>
        )}
      </div>
    </div>
  );
};

export default Bag;
