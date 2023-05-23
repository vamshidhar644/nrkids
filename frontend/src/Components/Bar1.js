import React from 'react';
import '../Styles/Bar1.css';

const Bar1 = () => {
  return (
    <div className="bar1-container">
      <div className="bar1-content">
        <div className="bar-box1">
          <h3>MADE TO FIT PERFECTLY</h3>
          <p>
            We want to make sure your garment fits perfeclty. Just select
            "Custom size" while adding the items. <a href="">More details</a>
          </p>
        </div>
        <p className='mid-line'></p>
        <div className="bar-box2">
          <h3>SEAMLESS VIDEO SHOPPING</h3>
          <p>Whats app</p>
          <p>+91 9875423545</p>
        </div>
      </div>
    </div>
  );
};

export default Bar1;
