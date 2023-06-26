import React, { useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import './Hero.css';

const Hero = ({ Hero }) => {
  const { getImageUrl } = FetchImageUrl();

  // useEffect(() => {
  //   if (Hero) {
  //     console.log(Hero);
  //   }
  // });

  return (
    <div className='Hero'>
      <Carousel className="Carousel-Container">
        {Hero &&
          Hero.map((homedata) => (
            <Carousel.Item className="Carousel-Item" key={homedata.title}>
              <img
                src={getImageUrl(homedata.image)}
                alt=""
                style={{ width: '100%' }}
              />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

export default Hero;
