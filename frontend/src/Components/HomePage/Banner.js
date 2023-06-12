import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import sanityClient from '../../client';
import { Link } from 'react-router-dom';

const Banner = () => {
  const [Banner, setBanner] = useState('');

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "banner"] {title, path, image {asset -> {_id, url}, alt}, images}`
      )
      .then((HomeData) => setBanner(HomeData))
      .catch(console.error);
  });

  return (
    <Carousel className="Carousel-Container">
      {Banner &&
        Banner.map((homedata) => (
          <Carousel.Item className="Carousel-Item" key={homedata.path.current}>
            <Link to={`/sale/${homedata.path.current}`}>
              <img src={homedata.image.asset.url} alt="" />
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Banner;
