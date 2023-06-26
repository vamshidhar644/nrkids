import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import './Collections.css';

const ShopByCategory = ({ Collections }) => {
  const { getImageUrl } = FetchImageUrl();

  // useEffect(() => {
  //   if (Collections) {
  //     console.log(Collections);
  //   }
  // });

  return (
    <div className="Category-Container">
      <div className="title-container">
        <h3 className="title">Handpicked Collections</h3>
      </div>
      <div className="Cat-Card-Container">
        {Collections &&
          Collections.map((categories, index) => {
            return (
              <div key={index}>
                <Link to={`/${categories.path.current}`} className="cat-card">
                  <div className="cat-img-container">
                    <div className="cat-img">
                      <img src={getImageUrl(categories.image)} alt="" />
                    </div>
                    <div className="cat-description cat-card">
                      <span className="cat-title">{categories.title}</span>
                    </div>
                  </div>
                </Link>
                {/* <Link
                  to={`/shop-by-category/${categories.path.current}`}
                  className="shop-button"
                >
                  <p>Shop</p>
                </Link> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShopByCategory;
