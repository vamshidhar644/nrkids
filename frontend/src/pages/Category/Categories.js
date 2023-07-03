import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Filters from './Filtering/Filters';
import ProductGrid from './Products/Products';
import CategoryHero from './Hero/CategoryHero';

import './Categories.css';

const Categories = ({ Products }) => {
  const { categorypath } = useParams();

  const [categoryProducts, setCatogeryProducts] = useState([]);

  useEffect(() => {
    const CategoryProducts = [];
    if (Products) {
      for (let i = 0; i < Products.length; i++) {
        if (Products[i].dropdownField === categorypath) {
          CategoryProducts.push(Products[i]);
        }
      }
    }
    setCatogeryProducts(CategoryProducts);
  }, [categorypath, Products]);

  return (
    <div className="Main-Category-Container">
      <CategoryHero className="category-head" params={categorypath} />
      <div className="category-body d-flex">
        <div className="filter-container">
          <Filters />
        </div>
        <div className="products-container w-100 pb-4">
          <ProductGrid categoryProducts={categoryProducts} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
