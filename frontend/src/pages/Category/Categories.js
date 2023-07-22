import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BiChevronRight } from 'react-icons/bi';

import './Categories.css';
import ProductCard from '../Components/ProductCard/ProductCard';
import { FetchSanity } from '../../helpers/FetchSanity';
import { SetPaths } from '../../helpers/SetPaths';
import FetchImageUrl from '../../helpers/FetchImageUrl';

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
      <div className="hero-container">
        <p className="category__path d-flex justify-content-start align-items-center">
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
        <h4
          style={{
            marginBlockStart: '1em',
            textAlign: 'center',
            fontWeight: '700',
          }}
        >
          {categorypathh}
        </h4>
      </div>
      {/* <CategoryHero className="category-head" params={categorypath} /> */}
      <div className="category-body">
        <div className="products-container pb-4">
          <hr />
          {categoryProducts && categoryProducts.length > 0 ? (
            <div className="Product-Grid d-flex justify-content-center">
              <div className="Cards-Grid justify-content-evenly">
                {categoryProducts &&
                  categoryProducts.map((item, i) => {
                    return <ProductCard item={item} key={i} />;
                  })}
              </div>
            </div>
          ) : (
            <div className="no__items">
              <img src="./Assets/no_cat.png" alt="" />
              <h3>No items in this category yet!</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
