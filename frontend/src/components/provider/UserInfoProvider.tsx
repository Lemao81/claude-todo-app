import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { isSessionExpired } from '#/api/authApi';
import type { UserInfo } from '#/types/userInfo';
import { useLocalStorage } from '#/hooks/useLocalStorage';
import { USER_INFO_STORAGE_KEY } from '#/utils/constants';

interface UserInfoContextValue {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo | null) => void;
  clearUserInfo: () => void;
}

const UserInfoContext = createContext<UserInfoContextValue | null>(null);

export function useUserInfo(): UserInfoContextValue {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }

  return context;
}

export function UserInfoProvider({ children }: { children: React.ReactNode }) {
  const { getItem, setItem } = useLocalStorage();
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(() =>
    getItem<UserInfo>(USER_INFO_STORAGE_KEY),
  );

  const setUserInfo = useCallback(
    (userInfo: UserInfo | null): void => {
      setItem(USER_INFO_STORAGE_KEY, userInfo);
      setUserInfoState(userInfo);
    },
    [setItem],
  );

  const clearUserInfo = (): void => setUserInfo(null);

  useEffect(() => {
    if (getItem<UserInfo>(USER_INFO_STORAGE_KEY) === null) {
      return;
    }

    isSessionExpired().then((expired): void => {
      if (expired) {
        setUserInfo(null);
      }
    });
  }, [getItem, setUserInfo]);

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo, clearUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}
