import { useState } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

export const FetchMongo = () => {
  const { user } = UseAuthContext();

  const [cartItems, setCartitems] = useState();

  const fetchcartData = async () => {
    if (user) {
      const id = user.id;
      axios
        .get(`/api/user/cart/${id}`)
        .then((response) => {
          setCartitems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  };

  return { fetchcartData, cartItems };
};
