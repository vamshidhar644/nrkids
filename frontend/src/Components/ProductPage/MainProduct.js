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
const MainProduct = ({ Product }) => {
  const { updatecart } = useCart();
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };



  const { user } = UseAuthContext();

  const [prodId, setProdId] = useState();
  const [userId, setUserId] = useState();
  const [size, setSize] = useState('l');
  const [price, setPrice] = useState();
  const [quantity, setQty] = useState(1);

  const [imageIndex, setImageindex] = useState(0);

  const [OoStock, setOoStock] = useState(false);

  useEffect(() => {
    setProdId(Product.productId);
    setUserId(user.id);

    switch (size) {
      case 'xs':
        if (Product.prices.xs !== 0) {
          setPrice(Product.prices.xs);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 's':
        if (Product.prices.s !== 0) {
          setPrice(Product.prices.s);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'm':
        if (Product.prices.m !== 0) {
          setPrice(Product.prices.m);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'l':
        if (Product.prices.l !== 0) {
          setPrice(Product.prices.l);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'xl':
        if (Product.prices.xl !== 0) {
          setPrice(Product.prices.xl);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'xxl':
        if (Product.prices.xxl !== 0) {
          setPrice(Product.prices.xxl);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'xxxl':
        if (Product.prices.xxxl !== 0) {
          setPrice(Product.prices.xxxl);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      default:
    }
  }, [
    Product.productId,
    user.id,
    size,
    Product.prices.xs,
    Product.prices.s,
    Product.prices.m,
    Product.prices.l,
    Product.prices.xl,
    Product.prices.xxl,
    Product.prices.xxxl,
    OoStock,
  ]);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const UpdateCart = async (e) => {
    e.preventDefault();

    const itemsData = { userId, quantity, size, price };

    await updatecart(prodId, itemsData);
  };

  return (
    <div className="product-page">
      <div className="product-image">
        <div className="other-images">
          {Product.images &&
            Product.images.map((image, path) => {
              return (
                <div className="other-image" key={path}>
                  <img
                    className="image1"
                    src={getImageUrl(Product.images[path])}
                    alt=""
                    onMouseEnter={() => setImageindex(path)}
                  />
                </div>
              );
            })}
        </div>
        <img
          className="image1"
          src={getImageUrl(Product.images[imageIndex])}
          alt=""
        />
      </div>
      <div className="product-details">
        <h1 className="product-title">{Product.title}</h1>
        <p className="product-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in ex
          sit amet nulla egestas vulputate. Sed vel velit at magna commodo
          convallis.
        </p>
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
        {!OoStock ? (
          <div>
            <button className="add-to-cart-button" onClick={UpdateCart}>
              Add to Cart
            </button>
            &nbsp;
            <button className="add-to-cart-button">Buy now</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MainProduct;
