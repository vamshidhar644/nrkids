import React, { useEffect, useState } from 'react';
import sanityClient from '../../../client';
import { Link } from 'react-router-dom';

import './Collections.css';

const ShopByCategory = () => {
  const [Categories, setCategories] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "shopbycategory"] {title, path, image {asset -> {_id, url}, alt}}`
      )
      .then((HomeData) => setCategories(HomeData))
      .catch(console.error);
  }, []);

  return (
    <div className="Category-Container">
      <div className="title-container">
        <div className="line" />
        <h1 className="title">Shop by Category</h1>
        <div className="line" />
      </div>
      <div className="Cat-Card-Container">
        {Categories &&
          Categories.map((categories, index) => {
            return (
              <div key={index}>
                <Link
                  to={`/shop-by-category/${categories.path.current}`}
                  className="cat-card"
                >
                  <div className="cat-img-container">
                    <div className="cat-img">
                      <img src={categories.image.asset.url} alt="" />
                    </div>
                    <div className="cat-description cat-card">
                      <span className="cat-title">{categories.title}</span>
                    </div>
                  </div>
                </Link>
                <Link
                  to={`/shop-by-category/${categories.path.current}`}
                  className="shop-button"
                >
                  <p>Shop</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShopByCategory;
