import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';
import '../Styles/CartPage/Cart.css';

import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import ItemCard from '../Components/CartPage.js/ItemCard';

const client = sanityClient({
  projectId: 'dkv2w16f',
  dataset: 'production',
});

const builder = imageUrlBuilder(client);

const Cart = () => {
  const getImageUrl = (image) => {
    return builder.image(image).url();
  };

  const { user } = UseAuthContext();

  const [cartData, setCartdata] = useState(null);

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

      const sanitycart = [];

      if (cartData) {
        for (let i = 0; i < cartData.length; i++) {
          if (mergedData) {
            for (let j = 0; j < mergedData.length; j++) {
              if (cartData[i].productId === mergedData[j].productId) {
                sanitycart.push(mergedData[j]);
              }
            }
          }
        }
      }
      setSelectedSanity(sanitycart);
    };

    fetchData();
  });

  return (
    <div className="cart-page">
      <div className="cart-items">
        {selectSanityCart &&
          selectSanityCart.map((item, index) => {
            return (
              <ItemCard
                key={item.id}
                index={index}
                item={item}
                cartData={cartData}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Cart;
