import React from 'react';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Link } from 'react-router-dom';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const builder = imageUrlBuilder(client);
const MainProduct = ({ Product }) => {
  const getImageUrl = (image) => {
    return builder.image(image).url(); 
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <img className="image1" src={getImageUrl(Product.images[0])} alt="" />
      </div>
      <div className="product-details">
        <h1 className="product-title">{Product.title}</h1>
        <p className="product-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in ex
          sit amet nulla egestas vulputate. Sed vel velit at magna commodo
          convallis.
        </p>
        <p className="product-price">Rs. {Product.price}</p>
        <Link to="/your-bag" className="add-to-cart-button">
          Add to Cart
        </Link>
        &nbsp;
        <button className="add-to-cart-button">Buy now</button>
      </div>
    </div>
  );
};

export default MainProduct;
