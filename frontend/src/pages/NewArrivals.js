import React from 'react';
import { useParams } from 'react-router-dom';

const NewArrivals = () => {
  const { newarrivalpath } = useParams();
  return <div>{newarrivalpath}</div>;
};

export default NewArrivals;
