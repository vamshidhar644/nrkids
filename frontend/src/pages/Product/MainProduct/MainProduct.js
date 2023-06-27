import React, { useEffect, useState } from 'react';
import './MainPage.css';

import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { SetPaths } from '../../../BackOps/SetPaths';
import ProductDetails from './ProductDetails';
import { Link } from 'react-router-dom';

import { BiChevronRight } from 'react-icons/bi';
import DetailsWithoutData from './DetailsWithoutData';
const MainProduct = ({ Product }) => {
  const { getImageUrl } = FetchImageUrl();
  const { setCategoryPath, categorypath } = SetPaths();

  const [imageIndex, setImageindex] = useState(0);

  useEffect(() => {
    setCategoryPath(Product.dropdownField);
  }, [Product.dropdownField]);

  return (
    <div className="product-page p-4">
      <p className="product-path d-flex flex-start align-items-center">
        <Link to="/">Home </Link>
        <BiChevronRight />
        <Link to={`/${Product.dropdownField}`}>{categorypath}</Link>
        <BiChevronRight />
        {Product.title}
      </p>
      <div className="product-body d-flex">
        <div className="product-image d-flex flex-column w-50">
          <img
            className="image1 w-100 h-100"
            src={getImageUrl(Product.images[imageIndex])}
            alt=""
          />
          <div className="other-images d-flex justify-content-center">
            {Product.images &&
              Product.images.map((image, path) => {
                const url = getImageUrl(image);
                return (
                  <div className="other-image" key={path}>
                    <img
                      className="image1 w-100 h-100"
                      src={url}
                      alt=""
                      onMouseEnter={() => setImageindex(path)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="product-details d-flex flex-column">
          <h2 className="product-title mb-1">{Product.title}</h2>
          <p className="product-subtitle">Description</p>
          {Product.isData && <ProductDetails Product={Product} />}
          {!Product.isData && <DetailsWithoutData Product={Product} />}

          <p className="product-description p-0 py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in
            ex sit amet nulla egestas vulputate. Sed vel velit at magna commodo
            convallis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainProduct;
