import { useState } from 'react';

const ChangePriceperSize = () => {
  const [itemprice, setPrice] = useState();
  const [OoStock, setOoStock] = useState(false);

  const setPriceperSize = async (prices, size) => {
    switch (size) {
      case 'xs':
        if (prices.xs !== 0) {
          setPrice(prices.xs);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 's':
        if (prices.s !== 0) {
          setPrice(prices.s);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'm':
        if (prices.m !== 0) {
          setPrice(prices.m);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'l':
        if (prices.l !== 0) {
          setPrice(prices.l);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'xl':
        if (prices.xl !== 0) {
          setPrice(prices.xl);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'xxl':
        if (prices.xxl !== 0) {
          setPrice(prices.xxl);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      case 'xxxl':
        if (prices.xxxl !== 0) {
          setPrice(prices.xxxl);
          setOoStock(false);
        } else {
          setOoStock(true);
        }
        break;
      default:
    }
  };
  return {
    setPriceperSize,
    itemprice,
    OoStock,
  };
};

export default ChangePriceperSize;
