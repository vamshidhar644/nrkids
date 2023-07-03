import React from 'react';
import { Link } from 'react-router-dom';
import { BiChevronRight } from 'react-icons/bi';

const Favorites = () => {
  return (
    <div className="p-4">
      <div>
        <div>
          <p className="d-flex justify-content-start align-items-center gap-2 small">
            <Link to="/">Home </Link>
            <BiChevronRight /> Wishlist
          </p>
          <div className="cart-header d-flex justify-content-between align-items-center pt-4 pb-3">
            <h1>My wishlist</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
