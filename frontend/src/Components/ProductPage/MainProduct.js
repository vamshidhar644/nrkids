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
  const { updatecart, error, isLoading } = useCart();
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };

  const { user } = UseAuthContext();

  const [prodId, setProdId] = useState();
  const [userId, setUserId] = useState();
  const [size, setSize] = useState('l');
  const [price, setPrice] = useState();
  const [quantity, setQty] = useState(1);

  useEffect(() => {
    setProdId(Product.productId);
    setUserId(user.id);

    switch (size) {
      case 'xs':
        setPrice(Product.prices.xs);
        break;
      case 's':
        setPrice(Product.prices.s);
        break;
      case 'm':
        setPrice(Product.prices.m);
        break;
      case 'l':
        setPrice(Product.prices.l);
        break;
      case 'xl':
        setPrice(Product.prices.xl);
        break;
      case 'xxl':
        setPrice(Product.prices.xxl);
        break;
      case 'xxxl':
        setPrice(Product.prices.xxxl);
        break;
      default:
        setPrice(Product.prices.l);
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
        <img className="image1" src={getImageUrl(Product.images[0])} alt="" />
      </div>
      <div className="product-details">
        <h1 className="product-title">{Product.title}</h1>
        <p className="product-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in ex
          sit amet nulla egestas vulputate. Sed vel velit at magna commodo
          convallis.
        </p>
        <p className="product-price">₹ {price}</p>
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
        <button className="add-to-cart-button" onClick={UpdateCart}>
          Add to Cart
        </button>
        &nbsp;
        <button className="add-to-cart-button">Buy now</button>
      </div>
    </div>
  );
};

export default MainProduct;
