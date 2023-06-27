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
    <div className="Category-Container p-4">
      <div className="title-container">
        <h3 className="title">Handpicked Collections</h3>
      </div>
      <div className="Cat-Card-Container d-grid justify-content-around align-items-center">
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
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ShopByCategory;
