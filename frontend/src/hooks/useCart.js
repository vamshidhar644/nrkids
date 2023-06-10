import { useState } from 'react';

import { UseCartContext } from './useCartContext';
import { useNavigate } from 'react-router-dom';

export const useCart = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { cartdispatch } = UseCartContext();

  const navigate = useNavigate();

  const updatecart = async (prodId, itemsData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/cart/${prodId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemsData }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('cart', JSON.stringify(json));
      // update the auth context
      cartdispatch({ type: 'CREATE_ITEM', payload: json });
      navigate('/your-bag');
      setIsLoading(false);
    }
  };
  return { updatecart, isLoading, error };
};
