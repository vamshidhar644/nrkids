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

  // useEffect(() => {
  //   console.log(data);
  // });

  if (data.length !== 0) {
    return (
      <div>
        <MainProduct Product={data} />
      </div>
    );
  }
};

export default ProductPage;
