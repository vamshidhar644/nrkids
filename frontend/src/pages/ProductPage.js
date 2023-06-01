import React, { useEffect, useState } from 'react';
import SanityClient from '../client';
import '../Styles/ProductPage/MainPage.css';
import { useLocation, useParams } from 'react-router-dom';
import MainProduct from '../Components/ProductPage/MainProduct';

const ProductPage = () => {
  const { product } = useParams();
  // const [data, setData] = useState([]);

  const location = useLocation();

  const { data } = location.state;

  if (data) {
    return (
      <div>
        <MainProduct Product={data} />
      </div>
    );
  }
};

export default ProductPage;
