import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import MainProduct from './MainProduct/MainProduct';
import RelatedProducts from './RelatedProducts/RelatedProducts';

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
        <RelatedProducts
          category={data.dropdownField}
          Products={Products}
          productId={data.productId}
        />
      </div>
    );
  }
};

export default ProductPage;
