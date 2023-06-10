import React, { useEffect, useState } from 'react';

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import { UseAuthContext } from '../../hooks/useAuthContext';
import { useCart } from '../../hooks/useCart';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const builder = imageUrlBuilder(client);

const ItemCard = ({ item, cartData, index }) => {
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };

  const { updatecart, error, isLoading } = useCart();

  const { user } = UseAuthContext();

  const [prodId, setProdId] = useState();
  const [userId, setUserId] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQty] = useState();

  useEffect(() => {
    setUserId(user.id);
    setProdId(cartData[index].productId);
    setQty(cartData[index].quantity);
    setSize(cartData[index].size);

    setPricing(cartData[index].size);
  }, []);

  const setPricing = (size) => {
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
  };

  useEffect(() => {
    const itemData = { userId, quantity, size, price };
    const updateFun = async () => {
      if (prodId && itemData) {
        console.log(prodId, itemData);
        await updatecart(prodId, itemData);
      }
    };

    updateFun();
  }, [prodId, userId, quantity, size, price]);

  const handleQtyChange = (event) => {
    const intValue = parseInt(event.target.value, 10);
    if (!isNaN(intValue)) {
      setQty(intValue);
    }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setPricing(event.target.value);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-box">
        <img className="image1" src={getImageUrl(item.images[0])} alt="" />
        <div className="item-details">
          <h6>{item.title}</h6>
          <p>₹ {price}</p>
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
