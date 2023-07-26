import React from 'react';
import './ViewAll.css';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Viewall = () => {
  return (
    <div className="view-all">
      <button className="cta">
        <span className="hover-underline-animation"> Shop now </span>
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};

export default Viewall;
