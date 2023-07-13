import { useState } from 'react';

const FilterSanity = () => {
  const [filteredItems, setFilteredItems] = useState();
  const [cartExist, setCartExist] = useState(null);

  const filtersanity = (mongoItems, sanityItems) => {
    const sanitycart = [];
    if (mongoItems) {
      setCartExist(mongoItems.length);
      mongoItems.forEach((Mitem) => {
        if (sanityItems) {
          sanityItems.forEach((Sitem) => {
            if (Mitem.productId === Sitem.productId) {
              sanitycart.push(Sitem);
            }
          });
        }
      });
    }
    if (sanitycart) {
      setFilteredItems(sanitycart);
    }
  };
  return { filtersanity, filteredItems, cartExist };
};

export default FilterSanity;
