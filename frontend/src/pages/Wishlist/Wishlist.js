import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { BiChevronRight } from 'react-icons/bi';

import ProductCard from '../Components/ProductCard/ProductCard';
import FilterSanity from '../../BackOps/FilterSanity';

const Wishlist = ({ wishlist, Products }) => {
  const { filtersanity, filteredItems } = FilterSanity();

  useEffect(() => {
    filtersanity(wishlist, Products);
  }, [wishlist, Products]);

  return (
    <div className="Parent__Wishlist p-4">
      <div className='w-100'>
        <p className="wishlist__path d-flex justify-content-start align-items-center">
          <Link to="/">Home </Link>
          <BiChevronRight /> Wishlist
        </p>
        <div className="cart-header d-flex pt-4 pb-3">
          <h1>My wishlist</h1>
        </div>
        {wishlist ? (
          <>
            {wishlist.length !== 0 ? (
              <div className="wishlist-grid">
                {filteredItems &&
                  filteredItems.map((item, i) => {
                    return <ProductCard item={item} key={i} />;
                  })}
              </div>
            ) : (
              <>
                <div className="no__items d-flex flex-column align-items-center w-100">
                  <img src="./Assets/empty.png" alt="" />
                  <h3>No items in the wishlist</h3>
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

export default Wishlist;
