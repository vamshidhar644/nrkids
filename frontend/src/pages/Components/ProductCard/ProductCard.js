import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const ProductCard = ({ Products }) => {
  const { getImageUrl } = FetchImageUrl();

  return (
    <>
      {Products &&
        Products.map((item, i) => {
          return (
            <div className="Main-Card" key={item.title}>
              <Link
                className="card"
                to={`/${item.dropdownField}/${item.path.current}`}
                state={{
                  data: item,
                }}
              >
                <img
                  className="image1"
                  src={getImageUrl(item.images[0])}
                  alt=""
                />
              </Link>
              <div className="Product-Details">
                <p className="title mb-0">{item.title}</p>
                <p className="subtitle mb-0">Description</p>
                <p className="price mb-0">₹ {item.price}</p>
                <AiOutlineHeart className="favs-icon" />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
