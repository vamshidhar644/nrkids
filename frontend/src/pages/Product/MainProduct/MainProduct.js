import React, { useEffect, useState } from 'react';
import './MainPage.css';

import { SetPaths } from '../../../BackOps/SetPaths';
import ProductDetails from './ProductDetails';
import { Link } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';

import FetchImageUrl from '../../../BackOps/FetchImageUrl';

import { BiChevronRight } from 'react-icons/bi';
import DetailsWithoutData from './DetailsWithoutData';

const MainProduct = ({ Product }) => {
  const { getImageUrl } = FetchImageUrl();

  const [imageIndex, setImageindex] = useState(0);
  const changeImage = (path) => {
    setImageindex(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const { setCategoryPath, categorypath } = SetPaths();

  useEffect(() => {
    setCategoryPath(Product.dropdownField);
  }, [Product.dropdownField]);

  const watchImg = getImageUrl(Product.images[imageIndex]);

  return (
    <div className="product-page p-4">
      <p className="product-path d-flex flex-start align-items-center small">
        <Link to="/">Home </Link>
        <BiChevronRight />
        <Link to={`/${Product.dropdownField}`}>{categorypath}</Link>
        <BiChevronRight />
        {Product.title}
      </p>
      <div className="product-body d-flex gap-5">
        <div className="product-image d-flex flex-column w-50">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: '',
                isFluidWidth: true,
                src: watchImg,
              },
              largeImage: {
                src: watchImg,
                width: 1500,
                height: 1800,
              },
            }}
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
                      onClick={() => changeImage(path)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
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
