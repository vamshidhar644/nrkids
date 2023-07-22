import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { SetPaths } from '../../../BackOps/SetPaths';
import ProductDetails from './ProductWithDetails';
import { Link } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';

import FetchImageUrl from '../../../BackOps/FetchImageUrl';

import { BiChevronRight } from 'react-icons/bi';
import DetailsWithoutData from './ProductWithoutData';
import { PostMongo } from '../../../BackOps/PostMongo';
import { FetchMongo } from '../../../BackOps/FetchMongo';

const MainProduct = ({ Product }) => {
  const { getImageUrl } = FetchImageUrl();
  const { updateWishlist, deleteWishlist } = PostMongo();
  const { fetchWishlist, wishlist } = FetchMongo();

  const [imageIndex, setImageindex] = useState(0);
  const [fav, setFav] = useState(false);
  const changeImage = (path) => {
    setImageindex(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const { setCategoryPath, categorypathh } = SetPaths();

  useEffect(() => {
    fetchWishlist();
    setCategoryPath(Product.dropdownField);
  }, [Product.dropdownField]);

  const addFav = () => {
    setFav(true);
    updateWishlist(Product.productId);
  };
  const delFav = () => {
    setFav(false);
    deleteWishlist(Product.productId);
  };

  useEffect(() => {
    if (wishlist) {
      const valueExists = wishlist.some(
        (item) => item.productId === Product.productId
      );
      setFav(valueExists);
    }
  }, [wishlist]);
  const watchImg = getImageUrl(Product.images[imageIndex]);

  return (
    <div className="product-page p-4">
      <p className="product-path d-flex flex-start align-items-center">
        <Link to="/">Home </Link>
        <BiChevronRight />
        <Link to={`/${Product.dropdownField}`}>{categorypathh}</Link>
        <BiChevronRight />
        {Product.title}
      </p>
      <div className="product-body d-flex gap-5">
        <div className="product__image d-flex flex-column">
          <ReactImageMagnify
            className="magnify__image"
            {...{
              smallImage: {
                alt: '',
                isFluidWidth: true,
                src: watchImg,
              },
              largeImage: {
                src: watchImg,
                width: 1500,
                height: 1800,
              },
            }}
          />
          <img src={watchImg} alt="" className="normal__image" />

          <div className="other-images d-flex justify-content-start">
            {Product.images &&
              Product.images.map((image, path) => {
                const url = getImageUrl(image);
                return (
                  <div className="other-image" key={path}>
                    <img
                      className="image1 w-100 h-100"
                      src={url}
                      alt=""
                      onClick={() => changeImage(path)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="product-details d-flex flex-column">
          <h2 className="product-title mb-1">
            {Product.title}{' '}
            <span>
              {fav ? (
                <AiFillHeart className="product-icon" onClick={delFav} />
              ) : (
                <AiOutlineHeart className="product-icon" onClick={addFav} />
              )}
            </span>
          </h2>
          <p className="product-subtitle">Description</p>
          {Product.isData && <ProductDetails Product={Product} />}
          {!Product.isData && <DetailsWithoutData Product={Product} />}
        </div>
      </div>
    </div>
  );
};

export default MainProduct;
