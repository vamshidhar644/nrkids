import { createContext, useReducer } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ITEMS':
      return {
        cartitems: action.payload,
      };
    case 'CREATE_ITEM':
      return {
        cartitems: [action.payload, ...state.cartitems],
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
    items: null,
  });

  return (
    <CartContext.Provider value={{ ...state, cartdispatch }}>
      {children}
    </CartContext.Provider>
  );
};
