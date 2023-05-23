import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import sanityClient from '../client';

const Banner = () => {
  const [Banner, setBanner] = useState('');

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "banner"] {title, path, image {asset -> {_id, url}, alt}}`
      )
      .then((HomeData) => setBanner(HomeData))
      .catch(console.error);
  });

  return (
    <Carousel className="Carousel-Container">
      {Banner &&
        Banner.map((homedata) => (
          <Carousel.Item className="Carousel-Item" key={homedata.path}>
            <img src={homedata.image.asset.url} alt="" />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Banner;
