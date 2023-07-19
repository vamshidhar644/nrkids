import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CategoryHero from './CategoryHero';
import { BiChevronRight } from 'react-icons/bi';

import './Categories.css';
import ProductCard from '../Components/ProductCard/ProductCard';
import { FetchSanity } from '../../BackOps/FetchSanity';
import { SetPaths } from '../../BackOps/SetPaths';
import FetchImageUrl from '../../BackOps/FetchImageUrl';

const Categories = ({ Products }) => {
  const { fetchHero, Hero } = FetchSanity();
  const { getImageUrl } = FetchImageUrl();
  const { setCategoryPath, categorypathh } = SetPaths();
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

  const [image, setImage] = useState();

  useEffect(() => {
    fetchHero();
    setCategoryPath(categorypath);
  }, [categorypath]);

  useEffect(() => {
    if (Hero) {
      Hero.forEach((banner) => {
        if (banner.bannerlocation === categorypath) {
          setImage(banner);
        }
      });
    }
  }, [Hero, categorypath]);

  return (
    <div className="Main-Category-Container">
      <div className="hero-container p-4">
        <p className="d-flex justify-content-start align-items-center gap-2">
          <Link to="/">Home </Link>
          <BiChevronRight /> {categorypathh}
        </p>
        {image && (
          <img
            src={getImageUrl(image.image)}
            alt=""
            style={{ width: '100%' }}
          />
        )}
      </div>
      {/* <CategoryHero className="category-head" params={categorypath} /> */}
      <div className="category-body">
        <div className="products-container pb-4">
          <div className="Product-Grid d-flex justify-content-start">
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
