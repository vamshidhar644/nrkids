import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import FetchImageUrl from '../../../helpers/FetchImageUrl';
import { PostMongo } from '../../../helpers/PostMongo';
import { FetchMongo } from '../../../helpers/FetchMongo';

import { UseAuthContext } from '../../../hooks/useAuthContext';
const ProductCard = ({ item }) => {
  const { user } = UseAuthContext();
  const { getImageUrl } = FetchImageUrl();

  const { updateWishlist, deleteWishlist } = PostMongo();
  const { fetchWishlist, wishlist } = FetchMongo();

  const [fav, setFav] = useState(false);
  const addFav = (id) => {
    if (user) {
      setFav(true);
      updateWishlist(id);
    } else {
      alert('Please login');
    }
  };
  const delFav = (id) => {
    setFav(false);
    deleteWishlist(id);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  useEffect(() => {
    if (wishlist) {
      const valueExists = wishlist.some(
        (product) => product.productId === item.productId
      );
      setFav(valueExists);
    }
  }, [wishlist]);
  return (
    <>
      <div className="Main-Card" key={item.title}>
        <Link
          className="card"
          to={`/${item.dropdownField}/${item.path.current}`}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <img className="image1" src={getImageUrl(item.images[0])} alt="" />
        </Link>
        <div className="Product-Details">
          <p className="title m-0 p-0">
            {item.title && item.title.length > 16
              ? item.title.substring(0, 13) + '...'
              : item.title}
          </p>
          <p className="subtitle">
            {item.description && item.description.length > 20
              ? item.description.substring(0, 18) + '...'
              : item.description}
          </p>
          {/* <p className="price mb-0">₹ {item.price}</p> */}
          {fav ? (
            <AiFillHeart
              className="fav-icon position-absolute"
              onClick={() => delFav(item.productId)}
            />
          ) : (
            <AiOutlineHeart
              className="fav-icon position-absolute"
              onClick={() => addFav(item.productId)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
