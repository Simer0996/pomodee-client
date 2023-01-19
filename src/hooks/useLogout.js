import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useUserInfo from './useUserInfo';

const useLogout = () => {
  const { setUser } = useUserInfo();
  const { setUserToContext, setIsSignedIn } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setUserToContext(null);
    setIsSignedIn(false);
    window.location.href = '/home';
  };
  return {
    logout
  };
};

export default useLogout;
