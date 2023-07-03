import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import './Wishlist.css';
import FetchImageUrl from '../../BackOps/FetchImageUrl';
import { BiChevronRight } from 'react-icons/bi';
import { FetchMongo } from '../../BackOps/FetchMongo';
import { PostMongo } from '../../BackOps/PostMongo';

const Wishlist = ({ Products }) => {
  const { fetchWishlist, wishlist } = FetchMongo();

  // const { updateWishlist, deleteWishlist } = PostMongo();
  // const [fav, setFav] = useState(false);
  useEffect(() => {
    fetchWishlist();
  }, []);

  const { getImageUrl } = FetchImageUrl();

  // const addFav = () => {
  //   setFav(true);
  //   updateWishlist(Products.productId);
  // };
  // const delFav = () => {
  //   setFav(false);
  //   deleteWishlist(Products.productId);
  // };

  // useEffect(() => {
  //   if (wishlist) {
  //     const valueExists = wishlist.some(
  //       (item) => item.productId === Products.productId
  //     );
  //     setFav(valueExists);
  //   }
  // }, [wishlist]);

  const [WishProducts, setWishProducts] = useState();
  useEffect(() => {
    const wishlistProducts = [];
    if (wishlist) {
      for (let i = 0; i < wishlist.length; i++) {
        if (Products) {
          for (let j = 0; j < Products.length; j++) {
            if (wishlist[i].productId === Products[j].productId) {
              wishlistProducts.push(Products[j]);
            }
          }
        }
      }
    }
    setWishProducts(wishlistProducts);
  }, [wishlist]);
  if (wishlist) {
    return (
      <div className="p-4">
        <div>
          <div>
            <p className="d-flex justify-content-start align-items-center gap-2 small">
              <Link to="/">Home </Link>
              <BiChevronRight /> Wishlist
            </p>
            <div className="cart-header d-flex pt-4 pb-3">
              <h1>My wishlist</h1>
            </div>
            <div className="wishlist-grid">
              {WishProducts
                ? WishProducts.map((item, i) => {
                    return (
                      <div className="Main-Card" key={i}>
                        <Link
                          className="card"
                          to={`/${item.dropdownField}/${item.path.current}`}
                          state={{
                            data: item,
                          }}
                        >
                          <img
                            className="image1"
                            src={getImageUrl(item.images[0])}
                            alt=""
                          />
                        </Link>
                        <div className="Product-Details">
                          <p className="title mb-0">{item.title}</p>
                          <p className="subtitle mb-0">Description</p>
                          <p className="price mb-0">₹ {item.price}</p>
                          <AiOutlineHeart className="favs-icon" />
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Wishlist;
