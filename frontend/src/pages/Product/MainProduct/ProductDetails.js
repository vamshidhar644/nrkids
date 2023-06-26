import React, { useEffect, useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import ChangePriceperSize from '../../../BackOps/ChangePriceperSize';

const ProductDetails = ({ Product }) => {
  const { updatecart } = useCart();
  const { user } = UseAuthContext();

  const { setPriceperSize, itemprice, OoStock } = ChangePriceperSize();

  const [productId, setProdId] = useState();
  const [userId, setUserId] = useState();
  const [size, setSize] = useState('l');
  const [quantity, setQty] = useState(1);

  useEffect(() => {
    setProdId(Product.productId);
    if (user) {
      setUserId(user.id);
    }
    if (Product.prices) {
      setPriceperSize(Product.prices, size);
    }

    console.log(Product);
  }, [Product.productId, user, size]);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQtyChange = (event) => {
    setQty(event.target.value);
  };

  const UpdateCart = async (e) => {
    e.preventDefault();

    if (user) {
      const price = itemprice;
      const itemsData = { userId, quantity, size, price };
      console.log(itemsData);
      await updatecart(productId, itemsData);
    }
  };
  return (
    <div className="product-details">
      <h1 className="product-title">{Product.title}</h1>
      {!OoStock && <p className="product-price">₹ {itemprice}</p>}
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

      <p className="product-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in ex
        sit amet nulla egestas vulputate. Sed vel velit at magna commodo
        convallis.
      </p>
    </div>
  );
};

export default ProductDetails;
