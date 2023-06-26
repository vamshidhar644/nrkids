import React, { useState } from 'react';
import './MainPage.css';

import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import ProductDetails from './ProductDetails';

const MainProduct = ({ Product }) => {
  const { getImageUrl } = FetchImageUrl();

  const [imageIndex, setImageindex] = useState(0);

  return (
    <div className="product-page">
      <div className="product-image">
        <div className="other-images">
          {Product.images &&
            Product.images.map((image, path) => {
              const url = getImageUrl(image);
              return (
                <div className="other-image" key={path}>
                  <img
                    className="image1"
                    src={url}
                    alt=""
                    onMouseEnter={() => setImageindex(path)}
                  />
                </div>
              );
            })}
        </div>
        <img
          className="image1"
          src={getImageUrl(Product.images[imageIndex])}
          alt=""
        />
      </div>
      {/* <ProductDetails Product={Product} /> */}
    </div>
  );
};

export default MainProduct;
