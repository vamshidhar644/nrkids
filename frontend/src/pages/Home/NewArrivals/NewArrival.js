import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import Viewall from '../../../Components/ViewAllButton/Viewall';

import './NewArrivals.css';
import DoubleProduct from '../../../Components/ProductCard/DoubleProduct';

const NewArrival = ({ NewArrivals }) => {
  const containerRef = useRef(null);

  return (
    <div className="newarrivals-container">
      <div className="newarrivals-head d-flex justify-content-between p-4">
        <h3 className="medium">New Arrivals</h3>
        <Link to="/new-arrivals" className="d-flex align-items-center small">
          <Viewall />
        </Link>
      </div>
      <div className="New-Arrivals d-flex flex-column py-0 w-100">
        <div className="Cards-Container home__new_arrival" ref={containerRef}>
          {NewArrivals &&
            NewArrivals.map((item, i) => {
              return <DoubleProduct item={item} key={i} favv={true} />;
            })}
        </div>
        {/* <div className='scrol__arrows'>
          <AiOutlineLeft
            onClick={() => scrollHorizontally(-600)}
            className="scroll-button"
          />
          <AiOutlineRight
            onClick={() => scrollHorizontally(600)}
            className="scroll-button"
          />
        </div> */}
      </div>
    </div>
  );
};

export default NewArrival;
