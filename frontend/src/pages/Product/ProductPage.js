import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import MainProduct from './MainProduct/MainProduct';

const ProductPage = ({ Products }) => {
  const { product } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (Products) {
        for (let i = 0; i < Products.length; i++) {
          if (Products[i].path.current === product) {
            setData(Products[i]);
          }
        }
      }
    };

    fetchData();
  });
  if (data.length !== 0) {
    return (
      <div>
        <MainProduct Product={data} />
        <div>
          <h2>You may also like</h2>
        </div>
      </div>
    );
  }
};

export default ProductPage;
