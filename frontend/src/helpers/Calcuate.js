import { useState } from 'react';

export const Calcuate = () => {
  const [totalPrice, setTotalPrice] = useState();
  const [itemCount, setItemCount] = useState();

  const [cartData, setCartdata] = useState();

  const totalPricing = (cartItems) => {
    let price = 0;
    let Arrayel = [];
    if (cartItems) {
      Arrayel = cartItems.filter((item) => item.price !== 0);
    }
    setCartdata(Arrayel);
    if (Arrayel) {
      Arrayel.forEach((element) => {
        price += element.price * element.quantity;
      });

      setTotalPrice(price);

      const ArrayLength = Arrayel.length;

      if (ArrayLength === 1) {
        setItemCount(ArrayLength + ' item');
      } else {
        setItemCount(ArrayLength + ' items');
      }
    }
  };

  return { totalPricing, totalPrice, itemCount, cartData };
};
