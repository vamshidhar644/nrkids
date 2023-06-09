import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';

import Viewall from '../../Components/ViewAll/Viewall';

import './NewArrivals.css';
import DoubleProduct from '../../Components/DoubleProduct/DoubleProduct';

const NewArrival = ({ NewArrivals }) => {
  const containerRef = useRef(null);

  const scrollHorizontally = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div className="newarrivals-container">
      <div className="newarrivals-head d-flex justify-content-between p-4">
        <h3 className="medium">New Arrivals</h3>
        <Link to="/new-arrivals" className="d-flex align-items-center small">
          <Viewall />
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
            NewArrivals.map((item, i) => {
              return <DoubleProduct item={item} key={i} favv={true} />;
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
