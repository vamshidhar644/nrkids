import { useState } from 'react';

export const useSavelater = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const updatesavelater = async (productId, itemsData) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/user/savelater/${productId}`, {
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
