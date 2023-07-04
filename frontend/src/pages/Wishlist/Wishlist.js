import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { BiChevronRight } from 'react-icons/bi';

import ProductCard from '../Components/ProductCard/ProductCard';
import FilterSanity from '../../BackOps/FilterSanity';

const Wishlist = ({ wishlist, Products }) => {
  const { filtersanity, filteredItems } = FilterSanity();

  useEffect(() => {
    filtersanity(wishlist, Products);
  });
 
  return (
    <div className="p-4">
      <div>
        <div>
          <p className="d-flex justify-content-start align-items-center gap-2 small">
            <Link to="/">Home </Link>
            <BiChevronRight /> Wishlist
          </p>
          <div className="cart-header d-flex pt-4 pb-3">
            <h1>My wishlist</h1>
          </div>
          <div className="wishlist-grid">
            {filteredItems &&
              filteredItems.map((item, i) => {
                return <ProductCard item={item} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
