import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import FetchImageUrl from '../../helpers/FetchImageUrl';
import { PostMongo } from '../../helpers/PostMongo';
import { FetchMongo } from '../../helpers/FetchMongo';
import './ProductCard.css';
import { UseAuthContext } from '../../hooks/useAuthContext';

const DoubleProduct = ({ item, favv }) => {
  const { user } = UseAuthContext();
  const { getImageUrl } = FetchImageUrl();

  const { updateWishlist, deleteWishlist } = PostMongo();
  const { fetchWishlist, wishlist } = FetchMongo();

  const addFav = (id) => {
    if (user) {
      updateWishlist(id);
      setFav(true);
    } else {
      alert('please login');
    }
  };
  const delFav = (id) => {
    setFav(false);
    deleteWishlist(id);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const [fav, setFav] = useState(false);
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
      <div className="Main-Card">
        <Link
          className="card"
          to={`/${favv ? 'new-arrivals' : item.dropdownField}/${
            item.path.current
          }`}
          state={{
            data: item,
          }}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <img className="image1" src={getImageUrl(item.images[0])} alt="" />
          {item.images[1] ? (
            <img
              className="image2 position-absolute"
              src={getImageUrl(item.images[1])}
              alt=""
            />
          ) : null}
        </Link>
        <div className="Product-Details">
          {!favv ? (
            <>
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
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DoubleProduct;
