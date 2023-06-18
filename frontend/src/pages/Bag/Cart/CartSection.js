import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';
import './CartSection.css';

import sanityClient from '@sanity/client';
import ItemCard from './ItemCart';
import Checkout from './Checkout';
import EmptyCart from '../Empty/EmptyCart';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const CartSection = () => {
  const { user } = UseAuthContext();

  const [cartData, setCartdata] = useState();
  const [sanityData, setSanityData] = useState();

  const [selectSanityCart, setSelectedSanity] = useState();

  useEffect(() => {
    if (user) {
      const id = user.id;
      axios
        .get(`/api/user/cart/${id}`)
        .then((response) => {
          setCartdata(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
    const query3 = `*[_type == "categories"]`;

    const fetchData = async () => {
      const data3 = await client.fetch(query3);

      const mergedData = [...data3];

      setSanityData(mergedData);
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    const sanitycart = [];
    if (cartData) {
      for (let i = 0; i < cartData.length; i++) {
        if (sanityData) {
          for (let j = 0; j < sanityData.length; j++) {
            if (cartData[i].productId === sanityData[j].productId) {
              sanitycart.push(sanityData[j]);
            }
          }
        }
      }
    }
    if (sanitycart) {
      setSelectedSanity(sanitycart);
    }
  }, [cartData, sanityData]);

  const [revSanity, setRevSanity] = useState();
  const [revCart, setRevCart] = useState();

  useEffect(() => {
    const sanityRev = [];
    const cartRev = [];
    if (selectSanityCart) {
      for (let i = selectSanityCart.length - 1; i >= 0; i--) {
        sanityRev.push(selectSanityCart[i]);
        cartRev.push(cartData[i]);
      }
      setRevSanity(sanityRev);
      setRevCart(cartRev);
    }
  }, [selectSanityCart, cartData]);

  const [data, setData] = useState('');

  const handleDataChange = (newData) => {
    setData(newData);
  };

  if (cartData) {
    if (cartData.length !== 0) {
      return (
        <div className="cart-page">
          <div className="cart-items">
            <div className="cart-header">
              <h1>
                Shopping cart <span>deselect all items</span>
              </h1>
              <h2>Price</h2>
            </div>
            <div>
              {selectSanityCart &&
                revSanity.map((item, index) => {
                  return (
                    <ItemCard
                      key={index}
                      item={item}
                      cartData={revCart}
                      index={index}
                      sendData={handleDataChange}
                    />
                  );
                })}
            </div>
          </div>
          <Checkout data={data} />
        </div>
      );
    }
    if (cartData.length === 0) {
      return <EmptyCart />;
    }
  }
};

export default CartSection;
