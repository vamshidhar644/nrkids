import { useState } from 'react';

const FilterSanity = () => {
  const [filteredItems, setFilteredItems] = useState();
  const [cartExist, setCartExist] = useState(null);

  const filtersanity = (mongoItems, sanityItems) => {
    const sanitycart = [];
    if (mongoItems) {
      setCartExist(mongoItems.length);
      for (let i = 0; i < mongoItems.length; i++) {
        if (sanityItems) {
          for (let j = 0; j < sanityItems.length; j++) {
            if (mongoItems[i].productId === sanityItems[j].productId) {
              sanitycart.push(sanityItems[j]);
            }
          }
        }
      }
    }
    if (sanitycart) {
      setFilteredItems(sanitycart);
    }
  };
  return { filtersanity, filteredItems, cartExist };
};

export default FilterSanity;
