import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const ProductGrid = ({ categoryProducts }) => {
  const { getImageUrl } = FetchImageUrl();

  return (
    <div className="Product-Grid">
      <div className="Cards-Grid w-100 justify-content-start">
        {categoryProducts &&
          categoryProducts.map((newarrivals) => {
            return (
              <div className="Main-Card" key={newarrivals.title}>
                <Link
                  className="card"
                  to={`/${newarrivals.dropdownField}/${newarrivals.path.current}`}
                  state={{
                    data: newarrivals,
                  }}
                >
                  <img
                    className="image1"
                    src={getImageUrl(newarrivals.images[0])}
                    alt=""
                  />
                </Link>
                <div className="Product-Details">
                  <p className="title mb-0">{newarrivals.title}</p>
                  <p className="subtitle mb-0">Description</p>
                  <p className="price mb-0">₹ {newarrivals.price}</p>
                  <AiOutlineHeart className="favs-icon" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductGrid;
