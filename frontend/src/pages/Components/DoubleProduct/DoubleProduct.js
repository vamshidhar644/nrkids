import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const DoubleProduct = ({ Products }) => {
  const { getImageUrl } = FetchImageUrl();
  return (
    <>
      {Products &&
        Products.map((newarrivals) => {
          return (
            <div className="Main-Card" key={newarrivals.title}>
              <Link
                className="card"
                to={`/new-arrivals/${newarrivals.path.current}`}
                state={{
                  data: newarrivals,
                }}
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }
              >
                <img
                  className="image1 w-100 h-100"
                  src={getImageUrl(newarrivals.images[0])}
                  alt=""
                />
                {newarrivals.images[1] ? (
                  <img
                    className="image2 w-100 h-100 position-absolute"
                    src={getImageUrl(newarrivals.images[1])}
                    alt=""
                  />
                ) : null}
              </Link>
              <div className="Product-Details">
                <p className="title mb-0 font-weight-normal">
                  {newarrivals.title}
                </p>
                <p className="subtitle small">Description</p>
                <AiOutlineHeart className="fav-icon position-absolute" />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default DoubleProduct;
