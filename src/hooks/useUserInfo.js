import { useContext } from 'react';
import { useState } from 'react';
import { useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { singleUser } from '../services/friends.services';
import useLocalstorage from './useLocalstorage';

const useUserInfo = () => {
  const [user, setUser] = useState(null);
  const { handleGetLocalStorage } = useLocalstorage();
  const { setUserToContext } = useContext(AuthContext);
  const userId = handleGetLocalStorage('userInfo');

  const getUser = useCallback(async () => {
    const userInfo = await singleUser(userId);
    if (userInfo) {
      setUser(userInfo);
      setUserToContext(userInfo);
    }
  }, [setUserToContext, userId]);

  useEffect(() => {
    if (userId && !user) getUser();
  }, [getUser, userId, user]);

  return {
    user,
    userId,
    setUser
  };
};

export default useUserInfo;
