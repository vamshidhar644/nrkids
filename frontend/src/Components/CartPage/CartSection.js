import React, { useEffect, useState } from 'react';
import { UseAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import '../../Styles/CartPage/CartSection.css';

import sanityClient from '@sanity/client';
import ItemCard from './ItemCart';
import Checkout from './Checkout';

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
    const id = user.id;
    axios
      .get(`/api/user/cart/${id}`)
      .then((response) => {
        setCartdata(response.data);
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
      });

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

  const [revSanity, setRevSanity] = useState();

  useEffect(() => {
    const sanityRev = [];
    if (selectSanityCart) {
      for (let i = selectSanityCart.length - 1; i >= 0; i--) {
        sanityRev.push(selectSanityCart[i]);
      }
      setRevSanity(sanityRev);
    }
  }, [selectSanityCart]);

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
          {revSanity &&
            revSanity.map((item, index) => {
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
      <Checkout itemCart={cartData} />
    </div>
  );
};

export default CartSection;
