import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css';
import { BiChevronRight } from 'react-icons/bi';

import ProductCard from '../../Components/ProductCard/ProductCard';
import FilterSanity from '../../helpers/FilterSanity';
import { FetchMongo } from '../../helpers/FetchMongo';
import Loader from '../../Components/Loader/Loader';

const Wishlist = ({ Products }) => {
  const { filtersanity, filteredItems } = FilterSanity();
  const { fetchWishlist, wishlist } = FetchMongo();
  document.title = 'NRKids | Wishlist';
  useEffect(() => {
    fetchWishlist();
    filtersanity(wishlist, Products);
  }, [wishlist, Products]);

  return (
    <div className="Parent__Wishlist p-4">
      <div className="w-100">
        <p className="wishlist__path d-flex justify-content-start align-items-center">
          <Link to="/">Home </Link>
          <BiChevronRight /> Wishlist
        </p>
        <div className="cart-header d-flex pb-3">
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
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Wishlist;
