import { useEffect, useRef, useState } from 'react';

import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import MainProduct from './MainProduct/MainProduct';
import DoubleProduct from '../Components/DoubleProduct/DoubleProduct';

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

    setRelatedProducts(CategoryProducts);
  }, [data]);

  const containerRef = useRef(null);

  const scrollHorizontally = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };
  if (data.length !== 0) {
    return (
      <div>
        <MainProduct Product={data} />
        <div>
          <div className="newarrivals-head d-flex justify-content-between p-0 py-0 px-5">
            <h3 className="medium">Related items</h3>
            <Link
              to={`/${data.dropdownField}`}
              className="d-flex align-items-center"
            >
              View all <AiOutlineRight />
            </Link>
          </div>
          <div className="New-Arrivals d-flex align-items-center justify-content-center p-0 py-0 px-4 small">
            <AiOutlineLeft
              onClick={() => scrollHorizontally(-600)}
              className="scroll-button d-flex small"
            />
            <div
              className="Cards-Container overflow-x-auto d-flex"
              ref={containerRef}
            >
              {relatedProducts &&
                relatedProducts.map((item, i) => {
                  return <DoubleProduct item={item} key={i} />;
                })}
            </div>
            <AiOutlineRight
              onClick={() => scrollHorizontally(600)}
              className="scroll-button"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
