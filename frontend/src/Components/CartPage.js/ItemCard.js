import React, { useEffect, useState } from 'react';

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import { UseAuthContext } from '../../hooks/useAuthContext';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const builder = imageUrlBuilder(client);

const ItemCard = ({ item, cartData, index }) => {
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };

  const { user, dispatch } = UseAuthContext();

  // console.log(item);
  const [cartDatas, setCartdata] = useState();

  const [prodId, setProdId] = useState();
  const [userId, setUserId] = useState();
  const [size, setSize] = useState(cartData[index].size);
  const [price, setPrice] = useState();
  const [quantity, setQty] = useState(cartData[index].quantity);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProdId(item.productId);
    if (cartData) {
      switch (size) {
        case 'xs':
          setPrice(item.prices.xs);
          break;
        case 's':
          setPrice(item.prices.s);
          break;
        case 'm':
          setPrice(item.prices.m);
          break;
        case 'l':
          setPrice(item.prices.l);
          break;
        case 'xl':
          setPrice(item.prices.xl);
          break;
        case 'xxl':
          setPrice(item.prices.xxl);
          break;
        case 'xxxl':
          setPrice(item.prices.xxxl);
          break;
        default:
          setPrice(item.prices.l);
      }
    }
  }, [
    cartData,
    item,
    item.productId,
    user.id,
    size,
    index,
    item.prices.xs,
    item.prices.s,
    item.prices.m,
    item.prices.l,
    item.prices.xl,
    item.prices.xxl,
    item.prices.xxxl,
  ]);

  const handleSizeChange = async (event) => {
    setSize(event.target.value);
    const itemsData = { userId, quantity, size, price };

    console.log(prodId);

    const response = await fetch(`/api/user/cart/${prodId}`, {
      method: 'POST',
      body: JSON.stringify(itemsData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      setIsLoading(false);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_ITEM', payload: json });

      setSize(size);
      setQty(quantity);
    }
  };

  const handleQtyChange = async (event) => {
    setQty(event.target.value);

    const itemsData = { userId, quantity, size, price };

    if (user) {
      const response = await fetch(`/api/user/cart/${prodId}`, {
        method: 'POST',
        body: JSON.stringify(itemsData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
        setIsLoading(false);
      }
      if (response.ok) {
        setError(null);
        setEmptyFields([]);
        dispatch({ type: 'CREATE_ITEM', payload: json });

        setSize(size);
        setQty(quantity);
      }
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-box">
        <img className="image1" src={getImageUrl(item.images[0])} alt="" />
        <div className="item-details">
          <h6>{item.title}</h6>
          <p>₹ {cartData[index].price}</p>
          <div className="item-desc">
            <div className="size-section">
              <h6>Size</h6>
              <select
                name="size"
                id="size"
                className="size-select"
                value={size}
                onChange={handleSizeChange}
              >
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
                <option value="xxxl">XXXL</option>
              </select>
            </div>
            <div className="qty-section">
              <h6>Quantity</h6>
              <select
                name="quantity"
                id="quantity"
                className="qty-select"
                value={quantity}
                onChange={handleQtyChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
          </div>
          <p>Total: ₹ {cartData[index].price * cartData[index].quantity}</p>
        </div>
      </div>
      <div className="cart-buttons-box">
        <div className="cart-button">Save for later</div>
        <div className="cart-button">Buy now</div>
        <div className="cart-button">Remove</div>
      </div>
    </div>
  );
};

export default ItemCard;
