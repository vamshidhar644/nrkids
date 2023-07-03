import { useState } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

export const FetchMongo = () => {
  const { user } = UseAuthContext();
  const [cartItems, setCartitems] = useState();
  const [userData, setUserdata] = useState();
  const [address, setAddress] = useState();

  const fetchUserData = async () => {
    if (user) {
      const id = user._id;
      axios
        .get(`/api/user/${id}`)
        .then((response) => {
          setUserdata(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  };

  const fetchcartData = async () => {
    if (user) {
      const id = user._id;
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

  const fetchAddressData = async () => {
    if (user) {
      const id = user._id;
      axios
        .get(`/api/user/address/${id}`)
        .then((response) => {
          setAddress(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  };

  return {
    fetchcartData,
    cartItems,
    fetchUserData,
    userData,
    fetchAddressData,
    address,
  };
};
