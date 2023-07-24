import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');
    localStorage.removeItem('nkuser');
    navigate('/');
    dispatch({ type: 'LOGOUT' });
  };
  return { logout };
};
