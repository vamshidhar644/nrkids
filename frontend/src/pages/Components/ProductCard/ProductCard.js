import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import FetchImageUrl from '../../../BackOps/FetchImageUrl';
import { PostMongo } from '../../../BackOps/PostMongo';
import { FetchMongo } from '../../../BackOps/FetchMongo';
import './ProductCard.css';
const ProductCard = ({ item }) => {
  const { getImageUrl } = FetchImageUrl();

  const { updateWishlist, deleteWishlist } = PostMongo();
  const { fetchWishlist, wishlist } = FetchMongo();

  const [fav, setFav] = useState(false);
  const addFav = (id) => {
    setFav(true);
    updateWishlist(id);
  };
  const delFav = (id) => {
    setFav(false);
    deleteWishlist(id);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  console.log(item);

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
          state={{
            data: item,
          }}
        >
          <img className="image1" src={getImageUrl(item.images[0])} alt="" />
        </Link>
        <div className="Product-Details">
          <p className="title mb-0">{item.title}</p>
          <p className="subtitle mb-0">Description</p>
          <p className="price mb-0">₹ {item.price}</p>
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
