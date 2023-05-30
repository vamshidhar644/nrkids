import React, { useEffect, useState } from 'react';
import '../Styles/ShopByCategory.css';
import sanityClient from '../client';
import { NavLink } from 'react-router-dom';

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
          Categories.map((categories) => {
            return (
              <div key={categories.path}>
                <NavLink
                  to={`/categories/${categories.path}`}
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
                </NavLink>
                <NavLink
                  to={`/categories/${categories.path}`}
                  className="shop-button"
                >
                  <p>Shop</p>
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShopByCategory;
