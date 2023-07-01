import { UseAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('email');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    window.location.reload();
  };
  return { logout };
};
