import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

const Hero = ({ Hero }) => {
  const { getImageUrl } = FetchImageUrl();

  const [image, setImage] = useState();
  useEffect(() => {
    const data = [];
    if (Hero) {
      for (let i = 0; i < Hero.length; i++) {
        if (Hero[i].bannerlocation === 'home-top') {
          data.push(Hero[i]);
        }
      }
    }
    setImage(data);
  }, [Hero]);

  return (
    <div
      className="Hero"
      style={{
        margin: '14px',
        borderRadius: '16px',
        overflow: 'hidden',
        marginTop: '0px',
      }}
    >
      <Carousel className="Carousel-Container">
        {image &&
          image.map((homedata, i) => (
            <Carousel.Item className="Carousel-Item" key={i}>
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
