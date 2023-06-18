import React from 'react';
import './Products.css';

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const builder = imageUrlBuilder(client);

const Products = ({ categoryProducts }) => {
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };
  return (
    <div className="Product-Grid">
      {categoryProducts &&
        categoryProducts.map((products, index) => {
          return (
            <Link
              className="Productcard"
              to={`/new-arrivals/${products.path.current}`}
              state={{
                data: products,
              }}
              key={index}
            >
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
            </Link>
          );
        })}
    </div>
  );
};

export default Products;
