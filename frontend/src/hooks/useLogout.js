import { Navigate, useNavigate } from 'react-router-dom';
import { UseAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const { navigate } = useNavigate();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('email');

    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};
