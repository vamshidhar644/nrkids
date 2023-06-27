import { useState } from 'react';

export const SetPaths = () => {
  const [categorypath, setCategory] = useState('');

  const setCategoryPath = (category) => {
    switch (category) {
      case 'birthday':
        setCategory('Birthday');
        break;
      case 'new-arrivals':
        setCategory('New Arrivals');
        break;
      case 'ethnic-wear':
        setCategory('Ethnic wear');
        break;
      case 'party-wear':
        setCategory('Party wear');
        break;
      case 'casual-wear':
        setCategory('Casual wear');
        break;
      case 'mom-and-me':
        setCategory('Mom & me');
        break;
      case 'siblings-set':
        setCategory('Siblings set');
        break;
      default:
    }
  };

  return {
    setCategoryPath,
    categorypath,
  };
};
