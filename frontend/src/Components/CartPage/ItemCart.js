import React, { useEffect, useState } from 'react';

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import { UseAuthContext } from '../../hooks/useAuthContext';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

import axios from 'axios';

import '../../Styles/CartPage/ItemCart.css'

import { useSavelater } from '../../hooks/useSavelater';
import Checkboxes from '../OtherComponenets/Checkboxes';
const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const builder = imageUrlBuilder(client);

const ItemCart = ({ item, cartData, index }) => {
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };

  const { updatecart } = useCart();
  const { updatesavelater } = useSavelater();

  const { user } = UseAuthContext();

  const [prodId, setProdId] = useState();
  const [userId, setUserId] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQty] = useState();

  const [OoStock, setOoStock] = useState(false);

  const [savelater, setSavelater] = useState(false);

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
        if (item.prices.xs !== 0) {
          setPrice(item.prices.xs);
          setOoStock(false);
        } else {
          setPrice(0);
          setOoStock(true);
        }
        break;
      case 's':
        if (item.prices.s !== 0) {
          setPrice(item.prices.s);
          setOoStock(false);
        } else {
          setPrice(0);
          setOoStock(true);
        }
        break;
      case 'm':
        if (item.prices.m !== 0) {
          setPrice(item.prices.m);
          setOoStock(false);
        } else {
          setPrice(0);
          setOoStock(true);
        }
        break;
      case 'l':
        if (item.prices.l !== 0) {
          setPrice(item.prices.l);
          setOoStock(false);
        } else {
          setPrice(0);
          setOoStock(true);
        }
        break;
      case 'xl':
        if (item.prices.xl !== 0) {
          setPrice(item.prices.xl);
          setOoStock(false);
        } else {
          setPrice(0);
          setOoStock(true);
        }
        break;
      case 'xxl':
        if (item.prices.xxl !== 0) {
          setPrice(item.prices.xxl);
          setOoStock(false);
        } else {
          setPrice(0);
          setOoStock(true);
        }
        break;
      case 'xxxl':
        if (item.prices.xxxl !== 0) {
          setPrice(item.prices.xxxl);
          setOoStock(false);
        } else {
          setPrice(0);
          setOoStock(true);
        }
        break;
      default:
    }
  };

  const setitemTotal = (itemQty) => {
    console.log(price, itemQty);
  };

  useEffect(() => {
    const itemData = { userId, quantity, size, price };

    const updateCart = async () => {
      if (prodId && itemData) {
        // console.log(prodId, itemData);
        await updatecart(prodId, itemData);
      }
    };

    updateCart();
  }, [prodId, userId, quantity, size, price]);

  useEffect(() => {
    const itemData = { userId, quantity, size, price };

    const updateSavelater = async () => {
      if (savelater) {
        // console.log(prodId, itemData);
        await updatesavelater(prodId, itemData);
        handleDelete();
      }
    };

    updateSavelater();
  }, [savelater]);

  const handleQtyChange = (event) => {
    const intValue = parseInt(event.target.value, 10);
    if (!isNaN(intValue)) {
      setQty(intValue);
      setitemTotal(intValue);
    }
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
    setPricing(event.target.value);
  };

  const handleDelete = async (event) => {
    console.log(userId, prodId);

    try {
      await axios.delete(`api/user/${userId}/cart/${prodId}`);
      window.location.reload();
    } catch (error) {
      // Handle error
      console.error('Error deleting item:', error);
    }
  };

  const handleSavelater = async (event) => {
    setSavelater(true);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-box">
        <Checkboxes/>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link
          to={`/new-arrivals/${item.path}`}
          state={{
            data: item,
          }}
          key={index}
        >
          <img src={getImageUrl(item.images[0])} alt="" />
        </Link>
        <div className="item-details">
          <h6>{item.title}</h6>
          {!OoStock && <p className="product-price">₹ {price}</p>}
          {OoStock && <p className="product-price">Out of Stock</p>}
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
          {/* {!OoStock && (
            <div className="total-price">
              <p>Total: ₹ {price * quantity}</p>
            </div>
          )} */}
        </div>
      </div>
      <div className="cart-buttons-box">
        <div className="cart-button" onClick={handleSavelater}>
          Save for later
        </div>
        <div className="cart-button">Buy now</div>
        <div className="cart-button" onClick={handleDelete}>
          Remove
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
