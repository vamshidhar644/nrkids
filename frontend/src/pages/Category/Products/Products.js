import React, { useEffect } from 'react';

import { AiOutlineHeart } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import ChangePriceperSize from '../../../BackOps/ChangePriceperSize';

const ProductGrid = ({ categoryProducts }) => {
  const { getImageUrl } = FetchImageUrl();
  const { setSizes, item } = ChangePriceperSize();

  useEffect(() => {
    if (categoryProducts) {
      // categoryProducts.forEach((element, i) => {
      //   if (element.prices) {
      //     console.log(element);
      //     // setSizes(element);
      //   }
      //   // setSizes(element);
      // });
    }
  });

  return (
    <div className="Product-Grid">
      <div className="Cards-Grid w-100 justify-content-start">
        {categoryProducts &&
          categoryProducts.map((newarrivals) => {
            return (
              <div className="Main-Card" key={newarrivals.title}>
                <Link
                  className="card"
                  to={`/new-arrivals/${newarrivals.path.current}`}
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
