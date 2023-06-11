import { useState } from 'react';

import { UseCartContext } from './useCartContext';
import { useNavigate } from 'react-router-dom';

export const useSavelater = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { cartdispatch } = UseCartContext();

  const updatesavelater = async (prodId, itemsData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/savelater/${prodId}`, {
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
      // cartdispatch({ type: 'CREATE_ITEM', payload: json });
      setIsLoading(false);
    }
  };

  return { updatesavelater, isLoading, error };
};
