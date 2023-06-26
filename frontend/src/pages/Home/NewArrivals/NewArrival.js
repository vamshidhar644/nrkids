import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import './NewArrivals.css';

const NewArrival = ({ NewArrivals }) => {
  const { getImageUrl } = FetchImageUrl();

  const containerRef = useRef(null);

  const scrollHorizontally = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  // useEffect(() => {
  //   if (NewArrivals) {
  //     console.log(NewArrivals);
  //   }
  // });

  return (
    <div className="New-Arrivals">
      <AiOutlineLeft
        onClick={() => scrollHorizontally(-500)}
        className="scroll-button"
      />
      <div className="Cards-Container" ref={containerRef}>
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
                    className="image1"
                    src={getImageUrl(newarrivals.images[0])}
                    alt=""
                  />
                  <img
                    className="image2"
                    src={getImageUrl(newarrivals.images[1])}
                    alt=""
                  />
                </Link>
                <div className="Product-Details">
                  <p className="title">{newarrivals.title}</p>
                  <p className="subtitle">Description</p>
                  <p className="price">From ₹ {newarrivals.price}</p>
                </div>
              </div>
            );
          })}
      </div>
      <AiOutlineRight
        onClick={() => scrollHorizontally(500)}
        className="scroll-button"
      />
    </div>
  );
};

export default NewArrival;
