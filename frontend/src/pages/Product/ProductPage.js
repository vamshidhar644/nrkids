import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import MainProduct from './MainProduct/MainProduct';
import DoubleProduct from '../Components/ProductCard/DoubleProduct';

import './ProductPage.css';

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
  }, [product, Products]);

  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const CategoryProducts = [];
    if (Products) {
      Products.forEach((product) => {
        if (product.dropdownField === data.dropdownField) {
          if (product.productId !== data.productId) {
            CategoryProducts.push(product);
          }
        }
      });
    }

    setRelatedProducts(CategoryProducts.slice(0, 4));
  }, [data]);

  if (data.length !== 0) {
    return (
      <div className="d-flex flex-column gap-5 p-4">
        <MainProduct Product={data} />
        <div className="New-Arrivals may_like">
          <h3>You may also like</h3>
          <div className="Cards-Container overflow-x-auto">
            {relatedProducts &&
              relatedProducts.map((item, i) => {
                return <DoubleProduct item={item} key={i} />;
              })}
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
