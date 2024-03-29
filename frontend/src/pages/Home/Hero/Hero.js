import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import FetchImageUrl from '../../../helpers/FetchImageUrl';

const Hero = ({ Hero }) => {
  const { getImageUrl } = FetchImageUrl();

  const [image, setImage] = useState();
  useEffect(() => {
    const data = [];
    if (Hero) {
      Hero.forEach((banner) => {
        if (banner.bannerlocation === 'home-top') {
          data.push(banner);
        }
      });
    }
    setImage(data);
  }, [Hero]);

  return (
    <div className="Hero">
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
