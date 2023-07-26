import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  // const navigate = useNavigate();
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');
    localStorage.removeItem('nkuser');
    // navigate('/');
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
