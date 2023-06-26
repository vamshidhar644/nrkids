import React from 'react';
import './Products.css';
import { AiOutlineShoppingCart } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const ProductGrid = ({ categoryProducts }) => {
  const { getImageUrl } = FetchImageUrl();

  return (
    <div className="Product-Grid">
      {categoryProducts &&
        categoryProducts.map((products, index) => {
          return (
            <Link
              className="Productcard"
              to={`/${products.dropdownField}/${products.path.current}`}
              key={index}
            >
              <div>
                <div className="hover-sheet"></div>
                <div className="Productcard-img">
                  <img
                    className="image1"
                    src={getImageUrl(products.images[0])}
                    alt=""
                  />
                </div>
                <div className="Productcard-info">
                  <p className="text-title">{products.title}</p>
                  <p className="text-body">Lorem Ipsum dolor sit amet</p>
                  <div className="Productcard-button">
                    <AiOutlineShoppingCart />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default ProductGrid;
