import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CategoryHero from './CategoryHero';

import './Categories.css';
import ProductCard from '../Components/ProductCard/ProductCard';

const Categories = ({ Products }) => {
  const { categorypath } = useParams();

  const [categoryProducts, setCatogeryProducts] = useState([]);

  useEffect(() => {
    const CategoryProducts = [];
    if (Products) {
      Products.forEach((product) => {
        if (product.dropdownField === categorypath) {
          CategoryProducts.push(product);
        }
      });
    }
    setCatogeryProducts(CategoryProducts);
  }, [categorypath, Products]);

  return (
    <div className="Main-Category-Container">
      <CategoryHero className="category-head" params={categorypath} />
      <div className="category-body">
        <div className="products-container w-100 pb-4">
          <div className="Product-Grid">
            <div className="Cards-Grid w-100 justify-content-evenly">
              {categoryProducts &&
                categoryProducts.map((item, i) => {
                  return <ProductCard item={item} key={i} />;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
