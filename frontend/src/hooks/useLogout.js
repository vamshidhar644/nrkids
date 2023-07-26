import { UseAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('nkuser');

    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out!', {
      position: 'bottom-center',
      autoClose: 2000, // 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return { logout };
};
