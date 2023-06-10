import { createContext, useEffect, useReducer } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        cartitems: action.payload,
      };
    case 'CREATE_ITEM':
      return {
        cartitems: action.payload,
      };
    case 'DELETE_ITEM':
      return {
        cartitems: state.items.filter(
          (cartitem) => cartitem._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, cartdispatch] = useReducer(cartReducer, {
    cartitems: null,
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) { 
      cartdispatch({ type: 'CREATE_ITEM', payload: cart });
    }
  }, []);

  return (
    <CartContext.Provider value={{ ...state, cartdispatch }}>
      {children}
    </CartContext.Provider>
  );
};
