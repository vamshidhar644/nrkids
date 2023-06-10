import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import '../Styles/CartPage/Cart.css';

import sanityClient from '@sanity/client';
import ItemCard from '../Components/CartPage.js/ItemCard';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const Cart = () => {
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

    const query1 = `*[_type == "banner"]`;
    const query3 = `*[_type == "categories"]`;

    const fetchData = async () => {
      const data1 = await client.fetch(query1);
      const data3 = await client.fetch(query3);

      const mergedData = [...data1, ...data3];

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

  return (
    <div className="cart-page">
      <div className="cart-items">
        {selectSanityCart &&
          selectSanityCart.map((item, index) => {
            return (
              <ItemCard
                key={index}
                item={item}
                cartData={cartData}
                index={index}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Cart;
