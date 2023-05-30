import React from 'react';
import { useParams } from 'react-router-dom';

const Banners = () => {
  const { bannerpath } = useParams();
  return <div>Path: {bannerpath}</div>;
};

export default Banners;
