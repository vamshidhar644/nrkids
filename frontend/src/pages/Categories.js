import React from 'react';
import { useParams } from 'react-router-dom';

const Categories = () => {
  const { categorypath } = useParams();
  return <div>{categorypath}</div>;
};

export default Categories;
