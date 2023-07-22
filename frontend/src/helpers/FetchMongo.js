import { useState } from 'react';
import { UseAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

export const FetchMongo = () => {
  const { user } = UseAuthContext();
  const [cartItems, setCartitems] = useState();
  const [userData, setUserdata] = useState();
  const [address, setAddress] = useState();
  const [wishlist, setWishlist] = useState();
  const [orders, setOrders] = useState();

  //  U S E R  D A T A . . . . . . . . .
  const fetchUserData = async () => {
    if (user) {
      const id = user._id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/${id}`)
        .then((response) => {
          setUserdata(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  };

  // C A R T  D A T A . . . . . . . . .
  const fetchcartData = async () => {
    if (user) {
      const id = user._id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/cart/${id}`)
        .then((response) => {
          setCartitems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  };

  // A D D R E S S  D A T A . . . . . . .
  const fetchAddressData = async () => {
    if (user) {
      const id = user._id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/address/${id}`)
        .then((response) => {
          setAddress(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  };

  // W I S H L I S T  D A T A . . . . . . .
  const fetchWishlist = async () => {
    if (user) {
      const id = user._id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/wishlist/${id}`)
        .then((response) => {
          setWishlist(response.data);
        })
        .catch((error) => {
          console.error('Error fetching document:', error);
        });
    }
  };

  // O R D E R S  D A T A . . . . . . .
  const fetchOrders = async () => {
    if (user) {
      const id = user._id;
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/user/order/${id}`)
        .then((response) => {
          setOrders(response.data);
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
    fetchWishlist,
    wishlist,
    fetchOrders,
    orders,
  };
};
