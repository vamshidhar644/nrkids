import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';

import { AiOutlineRight, AiOutlineLeft, AiOutlineHeart } from 'react-icons/ai';
const RelatedProducts = ({ Products, category, productId }) => {
  const { getImageUrl } = FetchImageUrl();
  const [categoryProducts, setCatogeryProducts] = useState([]);

  useEffect(() => {
    const CategoryProducts = [];
    if (Products) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].dropdownField === category) {
          CategoryProducts.push(Products[i]);
        }
      }
    }

    setCatogeryProducts(CategoryProducts);
  }, [category, Products]);

  useEffect(() => {});

  const containerRef = useRef(null);

  const scrollHorizontally = (scrollOffset) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <div>
      <div className="newarrivals-head d-flex justify-content-between p-0 py-0 px-5">
        <h3 className="medium">Related items</h3>
        <Link
          to={`/${category}`}
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
          {categoryProducts &&
            categoryProducts.map((categoryitems) => {
              return (
                <div className="Main-Card" key={categoryitems.title}>
                  <Link
                    className="card"
                    to={`/${category}/${categoryitems.path.current}`}
                    state={{
                      data: categoryitems,
                    }}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      });
                    }}
                  >
                    <img
                      className="image1 w-100 h-100"
                      src={getImageUrl(categoryitems.images[0])}
                      alt=""
                    />
                    {categoryitems.images[1] && (
                      <img
                        className="image2 w-100 h-100 position-absolute"
                        src={getImageUrl(categoryitems.images[1])}
                        alt=""
                      />
                    )}
                  </Link>
                  <div className="Product-Details">
                    <p className="title mb-0 font-weight-normal">
                      {categoryitems.title}
                    </p>
                    <p className="subtitle small">Description</p>
                    <AiOutlineHeart className="fav-icon position-absolute" />
                  </div>
                </div>
              );
            })}
        </div>
        <AiOutlineRight
          onClick={() => scrollHorizontally(600)}
          className="scroll-button"
        />
      </div>
    </div>
  );
};

export default RelatedProducts;
