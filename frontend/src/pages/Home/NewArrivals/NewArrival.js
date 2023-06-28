import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { AiOutlineRight, AiOutlineLeft, AiOutlineHeart } from 'react-icons/ai';
import './NewArrivals.css';

const NewArrival = ({ NewArrivals }) => {
  const { getImageUrl } = FetchImageUrl();

  const containerRef = useRef(null);

  const scrollHorizontally = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div>
      <div className="newarrivals-head d-flex justify-content-between p-0 py-0 px-5">
        <h3 className="medium">New Arrivals</h3>
        <Link
          to="/new-arrivals"
          className="d-flex align-items-center small text-decoration-none"
        >
          View all <AiOutlineRight />
        </Link>
      </div>
      <div className="New-Arrivals d-flex align-items-center justify-content-center p-0 py-0 px-4">
        <AiOutlineLeft
          onClick={() => scrollHorizontally(-600)}
          className="scroll-button"
        />
        <div
          className="Cards-Container overflow-x-auto d-flex"
          ref={containerRef}
        >
          {NewArrivals &&
            NewArrivals.map((newarrivals) => {
              return (
                <div className="Main-Card" key={newarrivals.title}>
                  <Link
                    className="card"
                    to={`/new-arrivals/${newarrivals.path.current}`}
                    state={{
                      data: newarrivals,
                    }}
                  >
                    <img
                      className="image1 w-100 h-100"
                      src={getImageUrl(newarrivals.images[0])}
                      alt=""
                    />
                    <img
                      className="image2 w-100 h-100 position-absolute"
                      src={getImageUrl(newarrivals.images[1])}
                      alt=""
                    />
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
        </div>
        <AiOutlineRight
          onClick={() => scrollHorizontally(600)}
          className="scroll-button"
        />
      </div>
    </div>
  );
};

export default NewArrival;
